from __future__ import annotations

import json
import urllib.error
import urllib.request
from backend.app.schemas import LeadPayload, SubmissionResult


class CRMService:
    def __init__(self, api_url: str, api_key: str, project_id: str = "penselverket") -> None:
        self.api_url = api_url
        self.api_key = api_key
        self.project_id = project_id

    def submit(self, payload: LeadPayload) -> SubmissionResult:
        if not self.api_url or not self.api_key:
            return SubmissionResult(
                status="preview",
                message="Formuläret är validerat men CRM_API_URL eller CRM_API_KEY saknas.",
            )

        lead_data = {
            "project_id": self.project_id,
            "name": payload.name,
            "email": payload.email,
            "phone": payload.phone,
            "location": payload.location,
            "project_type": payload.projectType,
            "preferred_start": payload.preferredStart,
            "message": payload.message,
            "budget": payload.budget,
            "timeline": payload.timeline,
            "source": payload.source,
        }

        req = urllib.request.Request(
            self.api_url,
            data=json.dumps(lead_data).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {self.api_key}",
                "User-Agent": "Penselverket-Backend/1.0",
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                if 200 <= response.status < 300:
                    return SubmissionResult(
                        status="sent",
                        message="Tack! Din offertförfrågan har mottagits.",
                    )
                return SubmissionResult(
                    status="error",
                    message="CRM-tjänsten kunde inte registrera förfrågan just nu.",
                )
        except urllib.error.HTTPError as exc:
            err_body = exc.read().decode("utf-8", errors="ignore")
            return SubmissionResult(
                status="error",
                message="Ett fel uppstod vid registrering i CRM.",
                detail=f"HTTP {exc.code}: {err_body}",
            )
        except urllib.error.URLError as exc:
            return SubmissionResult(
                status="error",
                message="Kunde inte ansluta till CRM-tjänsten.",
                detail=str(exc.reason),
            )
        except Exception as exc:
            return SubmissionResult(
                status="error",
                message="Ett oväntat fel inträffade vid CRM-anropet.",
                detail=str(exc),
            )
