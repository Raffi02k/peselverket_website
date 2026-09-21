from __future__ import annotations

import smtplib
from email.message import EmailMessage
from backend.app.config import Settings
from backend.app.schemas import LeadPayload, SubmissionResult


class EmailService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def submit(self, payload: LeadPayload) -> SubmissionResult:
        if not self.settings.smtp_is_configured:
            return SubmissionResult(
                status="preview",
                message=(
                    "Formuläret är validerat men SMTP är inte konfigurerat. "
                    "Se backend/.env.example för instruktioner."
                ),
            )

        message = EmailMessage()
        message["Subject"] = f"Ny offertförfrågan: {payload.projectType or 'Allmänt'} – {payload.name}"
        message["From"] = self.settings.smtp_from_email
        message["To"] = self.settings.contact_to_email
        message["Reply-To"] = payload.email

        content_lines = [
            "Ny offertförfrågan från webbplatsen",
            "",
            f"Namn: {payload.name}",
            f"Telefon: {payload.phone}",
            f"E-post: {payload.email}",
            f"Ort/postnummer: {payload.location or '-'}",
            f"Projekttyp: {payload.projectType or '-'}",
            f"Önskad start: {payload.preferredStart or '-'}",
        ]
        if payload.budget:
            content_lines.append(f"Budget: {payload.budget}")
        if payload.timeline:
            content_lines.append(f"Tidsram: {payload.timeline}")

        content_lines.extend(["", "Meddelande:", payload.message])
        message.set_content("\n".join(content_lines))

        try:
            with smtplib.SMTP(self.settings.smtp_host, self.settings.smtp_port, timeout=20) as smtp:
                if self.settings.smtp_use_tls:
                    smtp.starttls()
                if self.settings.smtp_username:
                    smtp.login(self.settings.smtp_username, self.settings.smtp_password)
                smtp.send_message(message)

            return SubmissionResult(
                status="sent",
                message="Tack! Din offertförfrågan har skickats till Penselverket.",
            )
        except (OSError, smtplib.SMTPException) as exc:
            return SubmissionResult(
                status="error",
                message="E-posttjänsten kunde inte ta emot meddelandet just nu.",
                detail=str(exc),
            )
