from __future__ import annotations

import asyncio

try:
    from api.config import Settings, settings
    from api.schemas import LeadPayload, SubmissionResult
    from api.services.crm_service import CRMService
    from api.services.email_service import EmailService
    from api.services.web3forms_service import Web3FormsService
except ImportError:
    from config import Settings, settings
    from schemas import LeadPayload, SubmissionResult
    from services.crm_service import CRMService
    from services.email_service import EmailService
    from services.web3forms_service import Web3FormsService


class LeadDispatcher:
    def __init__(self, current_settings: Settings = settings) -> None:
        self.settings = current_settings
        self.web3forms = Web3FormsService(self.settings.web3forms_access_key)
        self.crm = CRMService(
            self.settings.crm_api_url,
            self.settings.crm_api_key,
            self.settings.project_id,
        )
        self.email = EmailService(self.settings)

    async def dispatch(self, payload: LeadPayload) -> SubmissionResult:
        provider = self.settings.effective_provider

        if provider == "web3forms":
            return await asyncio.to_thread(self.web3forms.submit, payload)

        if provider == "crm":
            return await asyncio.to_thread(self.crm.submit, payload)

        if provider == "smtp":
            return await asyncio.to_thread(self.email.submit, payload)

        return SubmissionResult(
            status="preview",
            message=(
                "Formuläret är validerat men ingen leverantör är aktiv. "
                "Konfigurera WEB3FORMS_ACCESS_KEY eller CRM_API_KEY i dina miljövariabler."
            ),
        )


lead_dispatcher = LeadDispatcher()
