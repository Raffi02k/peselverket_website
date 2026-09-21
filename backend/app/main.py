from __future__ import annotations

import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import FileResponse, JSONResponse
from backend.app.config import settings
from backend.app.rate_limiter import rate_limiter
from backend.app.schemas import LeadPayload
from backend.app.services.lead_dispatcher import lead_dispatcher

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / "frontend" / "dist"

app = FastAPI(
    title="Penselverket API",
    version="2.0.0",
    docs_url="/api/docs" if os.getenv("ENVIRONMENT", "development") != "production" else None,
    redoc_url=None,
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "provider": settings.effective_provider,
        "smtp": "configured" if settings.smtp_is_configured else "unconfigured",
    }


@app.post("/api/contact")
async def contact(payload: LeadPayload, request: Request) -> JSONResponse:
    rate_limiter.check(request)

    # Honeypot: silent success if bot filled hidden website field
    if payload.website:
        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content={"status": "accepted"})

    if not payload.consent:
        raise HTTPException(status_code=422, detail="Samtycke krävs.")

    result = await lead_dispatcher.dispatch(payload)

    if result.status == "error":
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=result.message,
        )

    http_status = status.HTTP_200_OK if result.status == "sent" else status.HTTP_202_ACCEPTED
    return JSONResponse(
        status_code=http_status,
        content={"status": result.status, "message": result.message},
    )


@app.get("/{full_path:path}")
def serve_frontend(full_path: str):
    if not DIST.exists():
        raise HTTPException(status_code=503, detail="Frontend är inte byggd. Kör npm run build i frontend-mappen.")

    candidate = (DIST / (full_path or "index.html")).resolve()
    try:
        candidate.relative_to(DIST.resolve())
    except ValueError as exc:
        raise HTTPException(status_code=403, detail="Otillåten sökväg.") from exc

    if candidate.is_file():
        return FileResponse(candidate)

    index_file = DIST / "index.html"
    if index_file.is_file():
        return FileResponse(index_file)

    raise HTTPException(status_code=404, detail="Sidan finns inte.")
