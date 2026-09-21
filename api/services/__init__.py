try:
    from api.services.crm_service import CRMService
    from api.services.email_service import EmailService
    from api.services.lead_dispatcher import LeadDispatcher, lead_dispatcher
    from api.services.web3forms_service import Web3FormsService
except ImportError:
    from services.crm_service import CRMService
    from services.email_service import EmailService
    from services.lead_dispatcher import LeadDispatcher, lead_dispatcher
    from services.web3forms_service import Web3FormsService

__all__ = [
    "CRMService",
    "EmailService",
    "LeadDispatcher",
    "Web3FormsService",
    "lead_dispatcher",
]
