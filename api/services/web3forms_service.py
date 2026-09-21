from __future__ import annotations

import json
import urllib.error
import urllib.request

try:
    from api.schemas import LeadPayload, SubmissionResult
except ImportError:
    from schemas import LeadPayload, SubmissionResult


class Web3FormsService:
    ENDPOINT = "https://api.web3forms.com/submit"

    def __init__(self, access_key: str) -> None:
        self.access_key = access_key

    def submit(self, payload: LeadPayload) -> SubmissionResult:
        if not self.access_key:
            return SubmissionResult(
                status="preview",
                message="Formuläret är validerat men WEB3FORMS_ACCESS_KEY saknas i miljövariablerna.",
            )

        subject = f"Ny offertförfrågan: {payload.projectType or 'Allmänt'} – {payload.name}"
        if payload.location:
            subject += f" ({payload.location})"

        body = {
            "access_key": self.access_key,
            "subject": subject,
            "from_name": f"Penselverket ({payload.name})",
            "replyto": payload.email,
            "name": payload.name,
            "email": payload.email,
            "phone": payload.phone or "-",
            "location": payload.location or "Ej angivet",
            "project_type": payload.projectType or "Ej angivet",
            "preferred_start": payload.preferredStart or "Ej angivet",
            "message": payload.message,
            "source": payload.source,
        }
        if payload.budget:
            body["budget"] = payload.budget
        if payload.timeline:
            body["timeline"] = payload.timeline

        req = urllib.request.Request(
            self.ENDPOINT,
            data=json.dumps(body).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "Penselverket-Backend/1.0",
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                if not res_data.get("success"):
                    return SubmissionResult(
                        status="error",
                        message=res_data.get("message", "Web3Forms returnerade ett fel."),
                    )
                return SubmissionResult(
                    status="sent",
                    message="Tack! Din offertförfrågan har skickats till Penselverket.",
                )
        except urllib.error.HTTPError as exc:
            err_body = exc.read().decode("utf-8", errors="ignore")
            return SubmissionResult(
                status="error",
                message="Ett fel uppstod vid kontakt med Web3Forms.",
                detail=f"HTTP {exc.code}: {err_body}",
            )
        except urllib.error.URLError as exc:
            return SubmissionResult(
                status="error",
                message="Kunde inte ansluta till Web3Forms. Kontrollera nätverket.",
                detail=str(exc.reason),
            )
        except Exception as exc:
            return SubmissionResult(
                status="error",
                message="Ett oväntat fel inträffade.",
                detail=str(exc),
            )
