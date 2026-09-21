from __future__ import annotations

import os
from dataclasses import dataclass, field


@dataclass
class Settings:
    form_provider: str = field(
        default_factory=lambda: os.getenv("FORM_PROVIDER", "").strip().lower()
    )
    web3forms_access_key: str = field(
        default_factory=lambda: os.getenv("WEB3FORMS_ACCESS_KEY", "").strip()
    )
    crm_api_url: str = field(
        default_factory=lambda: os.getenv("CRM_API_URL", "").strip()
    )
    crm_api_key: str = field(
        default_factory=lambda: os.getenv("CRM_API_KEY", "").strip()
    )
    project_id: str = field(
        default_factory=lambda: os.getenv("PROJECT_ID", "penselverket").strip()
    )
    contact_to_email: str = field(
        default_factory=lambda: os.getenv("CONTACT_TO_EMAIL", "penselverket@hotmail.com").strip()
    )
    smtp_host: str = field(
        default_factory=lambda: os.getenv("SMTP_HOST", "").strip()
    )
    smtp_port: int = field(
        default_factory=lambda: int(os.getenv("SMTP_PORT", "587"))
    )
    smtp_username: str = field(
        default_factory=lambda: os.getenv("SMTP_USERNAME", "").strip()
    )
    smtp_password: str = field(
        default_factory=lambda: os.getenv("SMTP_PASSWORD", "").strip()
    )
    smtp_from_email: str = field(
        default_factory=lambda: os.getenv("SMTP_FROM_EMAIL", "").strip()
    )
    smtp_use_tls: bool = field(
        default_factory=lambda: os.getenv("SMTP_USE_TLS", "true").lower() in {"1", "true", "yes"}
    )
    allowed_hosts: str = field(
        default_factory=lambda: os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").strip()
    )

    @property
    def smtp_is_configured(self) -> bool:
        return bool(self.smtp_host and self.smtp_from_email and self.contact_to_email)

    @property
    def effective_provider(self) -> str:
        if self.form_provider:
            return self.form_provider
        if self.web3forms_access_key:
            return "web3forms"
        if self.crm_api_url and self.crm_api_key:
            return "crm"
        if self.smtp_is_configured:
            return "smtp"
        return "preview"


settings = Settings()
