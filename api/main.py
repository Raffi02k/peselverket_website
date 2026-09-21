from __future__ import annotations

import os
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse

try:
    from api.config import settings
    from api.rate_limiter import rate_limiter
    from api.schemas import LeadPayload
    from api.services.lead_dispatcher import lead_dispatcher
except ImportError:
    from config import settings
    from rate_limiter import rate_limiter
    from schemas import LeadPayload
    from services.lead_dispatcher import lead_dispatcher

app = FastAPI(
    title="Penselverket API",
    version="2.0.0",
    docs_url="/api/docs" if os.getenv("ENVIRONMENT", "development") != "production" else None,
    redoc_url=None,
)


@app.get("/api/health")
@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "provider": settings.effective_provider,
        "smtp": "configured" if settings.smtp_is_configured else "unconfigured",
    }


@app.post("/api/contact")
@app.post("/contact")
async def contact(payload: LeadPayload, request: Request) -> JSONResponse:
    rate_limiter.check(request)

    # Honeypot check - silently accept bot submissions
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
