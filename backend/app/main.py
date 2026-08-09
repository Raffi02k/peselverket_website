from __future__ import annotations

import asyncio
import os
import re
import smtplib
import time
from collections import defaultdict, deque
from email.message import EmailMessage
from pathlib import Path
from typing import Deque

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field, field_validator

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / "frontend" / "dist"
RATE_WINDOW_SECONDS = 15 * 60
RATE_LIMIT = 5
REQUESTS: dict[str, Deque[float]] = defaultdict(deque)

app = FastAPI(
    title="Penselverket webb-API",
    version="1.0.0",
    docs_url="/api/docs" if os.getenv("ENVIRONMENT", "development") != "production" else None,
    redoc_url=None,
)


class ContactPayload(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=40)
    email: str = Field(min_length=5, max_length=160)
    location: str = Field(default="", max_length=160)
    projectType: str = Field(min_length=2, max_length=120)
    preferredStart: str = Field(default="", max_length=120)
    message: str = Field(min_length=20, max_length=5000)
    consent: bool
    website: str = Field(default="", max_length=200)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        cleaned = value.strip()
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", cleaned):
            raise ValueError("Ogiltig e-postadress")
        return cleaned

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        cleaned = value.strip()
        if len(re.sub(r"\D", "", cleaned)) < 7:
            raise ValueError("Ogiltigt telefonnummer")
        return cleaned

    @field_validator("name", "location", "projectType", "preferredStart", "message", "website")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()



def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"



def enforce_rate_limit(key: str) -> None:
    now = time.time()
    queue = REQUESTS[key]
    while queue and now - queue[0] > RATE_WINDOW_SECONDS:
        queue.popleft()
    if len(queue) >= RATE_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="För många försök. Vänta en stund och prova igen.",
        )
    queue.append(now)



def smtp_is_configured() -> bool:
    required = ["CONTACT_TO_EMAIL", "SMTP_HOST", "SMTP_FROM_EMAIL"]
    return all(os.getenv(key, "").strip() for key in required)



def send_email(payload: ContactPayload) -> None:
    recipient = os.environ["CONTACT_TO_EMAIL"]
    host = os.environ["SMTP_HOST"]
    port = int(os.getenv("SMTP_PORT", "587"))
    username = os.getenv("SMTP_USERNAME", "")
    password = os.getenv("SMTP_PASSWORD", "")
    sender = os.environ["SMTP_FROM_EMAIL"]
    use_tls = os.getenv("SMTP_USE_TLS", "true").lower() in {"1", "true", "yes"}

    message = EmailMessage()
    message["Subject"] = f"Ny offertförfrågan – {payload.projectType} – {payload.name}"
    message["From"] = sender
    message["To"] = recipient
    message["Reply-To"] = payload.email
    message.set_content(
        "\n".join(
            [
                "Ny offertförfrågan från webbplatsen",
                "",
                f"Namn: {payload.name}",
                f"Telefon: {payload.phone}",
                f"E-post: {payload.email}",
                f"Ort/postnummer: {payload.location or '-'}",
                f"Projekttyp: {payload.projectType}",
                f"Önskad start: {payload.preferredStart or '-'}",
                "",
                "Projektbeskrivning:",
                payload.message,
            ]
        )
    )

    with smtplib.SMTP(host, port, timeout=20) as smtp:
        if use_tls:
            smtp.starttls()
        if username:
            smtp.login(username, password)
        smtp.send_message(message)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "email": "configured" if smtp_is_configured() else "preview"}


@app.post("/api/contact")
async def contact(payload: ContactPayload, request: Request) -> JSONResponse:
    enforce_rate_limit(client_ip(request))

    if payload.website:
        return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content={"status": "accepted"})

    if not payload.consent:
        raise HTTPException(status_code=422, detail="Samtycke krävs.")

    if not smtp_is_configured():
        return JSONResponse(
            status_code=status.HTTP_202_ACCEPTED,
            content={
                "status": "preview",
                "message": (
                    "Formuläret är validerat men ingen e-post har skickats eftersom SMTP inte "
                    "är konfigurerat. Se backend/.env.example och README.md."
                ),
            },
        )

    try:
        await asyncio.to_thread(send_email, payload)
    except (OSError, smtplib.SMTPException) as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="E-posttjänsten kunde inte ta emot meddelandet just nu.",
        ) from exc

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"status": "sent", "message": "Tack! Din offertförfrågan har skickats."},
    )


@app.get("/{full_path:path}")
def spa(full_path: str):
    if not DIST.exists():
        raise HTTPException(status_code=503, detail="Frontend är inte byggd. Kör npm run build i frontend-mappen.")

    requested = (DIST / full_path).resolve()
    try:
        requested.relative_to(DIST.resolve())
    except ValueError as exc:
        raise HTTPException(status_code=403, detail="Otillåten sökväg.") from exc

    if full_path and requested.is_file():
        return FileResponse(requested)

    return FileResponse(DIST / "index.html")
