from __future__ import annotations

import json
import os
import re
import smtplib
import time
import urllib.error
import urllib.request
from collections import defaultdict, deque
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler
from typing import Any, Deque

RATE_WINDOW_SECONDS = 15 * 60
RATE_LIMIT = 5
IP_REQUESTS: dict[str, Deque[float]] = defaultdict(deque)


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code: int, data: dict[str, Any]) -> None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def _client_ip(self) -> str:
        forwarded = self.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return self.client_address[0] if self.client_address else "unknown"

    def _check_rate_limit(self, ip: str) -> bool:
        now = time.time()
        queue = IP_REQUESTS[ip]
        while queue and now - queue[0] > RATE_WINDOW_SECONDS:
            queue.popleft()
        if len(queue) >= RATE_LIMIT:
            return False
        queue.append(now)
        return True

    def do_POST(self) -> None:
        client_ip = self._client_ip()
        if not self._check_rate_limit(client_ip):
            self._send_json(
                429,
                {"status": "error", "message": "För många förfrågningar. Vänta en stund och prova igen."},
            )
            return

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length <= 0 or content_length > 100_000:
                self._send_json(400, {"status": "error", "message": "Ogiltig storlek på förfrågan."})
                return
            body = self.rfile.read(content_length).decode("utf-8")
            payload = json.loads(body)
        except Exception:
            self._send_json(400, {"status": "error", "message": "Kunde inte tolka JSON-datan."})
            return

        # Honeypot: Silent acceptance for bots
        if payload.get("website"):
            self._send_json(202, {"status": "accepted"})
            return

        # Validation
        name = str(payload.get("name", "")).strip()
        phone = str(payload.get("phone", "")).strip()
        email = str(payload.get("email", "")).strip()
        location = str(payload.get("location", "")).strip()
        project_type = str(payload.get("projectType", "")).strip()
        preferred_start = str(payload.get("preferredStart", "")).strip()
        message = str(payload.get("message", "")).strip()
        consent = payload.get("consent") is True

        digits_phone = re.sub(r"\D", "", phone)
        if len(name) < 2:
            self._send_json(422, {"status": "error", "message": "Ange ditt namn (minst 2 tecken)."})
            return
        if len(digits_phone) < 7:
            self._send_json(422, {"status": "error", "message": "Ange ett giltigt telefonnummer."})
            return
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
            self._send_json(422, {"status": "error", "message": "Ange en giltig e-postadress."})
            return
        if len(message) < 20:
            self._send_json(422, {"status": "error", "message": "Beskriv projektet med minst 20 tecken."})
            return
        if not consent:
            self._send_json(422, {"status": "error", "message": "Samtycke krävs för att behandla förfrågan."})
            return

        # Provider determination
        configured_provider = os.getenv("FORM_PROVIDER", "").strip().lower()
        web3forms_key = os.getenv("WEB3FORMS_ACCESS_KEY", "").strip()
        crm_url = os.getenv("CRM_API_URL", "").strip()
        crm_key = os.getenv("CRM_API_KEY", "").strip()
        project_id = os.getenv("PROJECT_ID", "penselverket").strip()
        smtp_host = os.getenv("SMTP_HOST", "").strip()
        smtp_from = os.getenv("SMTP_FROM_EMAIL", "").strip()
        to_email = os.getenv("CONTACT_TO_EMAIL", "penselverket@hotmail.com").strip()

        provider = configured_provider
        if not provider:
            if web3forms_key:
                provider = "web3forms"
            elif crm_url and crm_key:
                provider = "crm"
            elif smtp_host and smtp_from:
                provider = "smtp"
            else:
                provider = "preview"

        # Dispatch
        if provider == "web3forms":
            if not web3forms_key:
                self._send_json(
                    202,
                    {
                        "status": "preview",
                        "message": "Formuläret är validerat men WEB3FORMS_ACCESS_KEY saknas i Vercel.",
                    },
                )
                return

            subject = f"Ny offertförfrågan: {project_type or 'Allmänt'} – {name}"
            if location:
                subject += f" ({location})"

            w3_body = {
                "access_key": web3forms_key,
                "subject": subject,
                "from_name": f"Penselverket ({name})",
                "replyto": email,
                "name": name,
                "email": email,
                "phone": phone,
                "location": location or "Ej angivet",
                "project_type": project_type or "Ej angivet",
                "preferred_start": preferred_start or "Ej angivet",
                "message": message,
                "source": "Penselverket webbplats",
            }

            req = urllib.request.Request(
                "https://api.web3forms.com/submit",
                data=json.dumps(w3_body).encode("utf-8"),
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "User-Agent": "Penselverket-Vercel/1.0",
                },
                method="POST",
            )
            try:
                with urllib.request.urlopen(req, timeout=15) as res:
                    res_json = json.loads(res.read().decode("utf-8"))
                    if res_json.get("success"):
                        self._send_json(
                            200,
                            {
                                "status": "sent",
                                "message": "Tack! Din offertförfrågan har skickats till Penselverket.",
                            },
                        )
                        return
                    self._send_json(
                        502,
                        {"status": "error", "message": res_json.get("message", "Web3Forms returnerade ett fel.")},
                    )
                    return
            except Exception as exc:
                self._send_json(502, {"status": "error", "message": f"Kunde inte skicka till Web3Forms: {exc}"})
                return

        elif provider == "crm":
            if not crm_url or not crm_key:
                self._send_json(
                    202,
                    {"status": "preview", "message": "CRM_API_URL eller CRM_API_KEY saknas i miljövariablerna."},
                )
                return

            crm_data = {
                "project_id": project_id,
                "name": name,
                "email": email,
                "phone": phone,
                "location": location,
                "project_type": project_type,
                "preferred_start": preferred_start,
                "message": message,
                "source": "Penselverket webbplats",
            }
            req = urllib.request.Request(
                crm_url,
                data=json.dumps(crm_data).encode("utf-8"),
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": f"Bearer {crm_key}",
                    "User-Agent": "Penselverket-Vercel/1.0",
                },
                method="POST",
            )
            try:
                with urllib.request.urlopen(req, timeout=15) as res:
                    if 200 <= res.status < 300:
                        self._send_json(200, {"status": "sent", "message": "Tack! Din offertförfrågan har mottagits."})
                        return
                    self._send_json(502, {"status": "error", "message": "CRM kunde inte ta emot förfrågan."})
                    return
            except Exception as exc:
                self._send_json(502, {"status": "error", "message": f"Kunde inte skicka till CRM: {exc}"})
                return

        elif provider == "smtp":
            email_msg = EmailMessage()
            email_msg["Subject"] = f"Ny offertförfrågan: {project_type or 'Allmänt'} – {name}"
            email_msg["From"] = smtp_from
            email_msg["To"] = to_email
            email_msg["Reply-To"] = email

            body_lines = [
                "Ny offertförfrågan från webbplatsen",
                "",
                f"Namn: {name}",
                f"Telefon: {phone}",
                f"E-post: {email}",
                f"Ort/postnummer: {location or '-'}",
                f"Projekttyp: {project_type or '-'}",
                f"Önskad start: {preferred_start or '-'}",
                "",
                "Meddelande:",
                message,
            ]
            email_msg.set_content("\n".join(body_lines))

            try:
                port = int(os.getenv("SMTP_PORT", "587"))
                use_tls = os.getenv("SMTP_USE_TLS", "true").lower() in {"1", "true", "yes"}
                with smtplib.SMTP(smtp_host, port, timeout=20) as smtp:
                    if use_tls:
                        smtp.starttls()
                    user = os.getenv("SMTP_USERNAME", "")
                    if user:
                        smtp.login(user, os.getenv("SMTP_PASSWORD", ""))
                    smtp.send_message(email_msg)
                self._send_json(200, {"status": "sent", "message": "Tack! Din offertförfrågan har skickats till Penselverket."})
                return
            except Exception as exc:
                self._send_json(502, {"status": "error", "message": f"E-posttjänsten misslyckades: {exc}"})
                return

        # Default preview fallback
        self._send_json(
            202,
            {
                "status": "preview",
                "message": (
                    "Formuläret är validerat. Varken Web3Forms eller CRM är konfigurerat ännu. "
                    "Lägg till WEB3FORMS_ACCESS_KEY i Vercel Settings -> Environment Variables."
                ),
            },
        )
