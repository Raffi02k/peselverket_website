from __future__ import annotations

import re
from dataclasses import dataclass
from pydantic import BaseModel, Field, field_validator


class LeadPayload(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=40)
    email: str = Field(min_length=5, max_length=160)
    location: str = Field(default="", max_length=160)
    projectType: str = Field(default="", max_length=120)
    preferredStart: str = Field(default="", max_length=120)
    message: str = Field(min_length=20, max_length=5000)
    consent: bool = Field(default=True)
    website: str = Field(default="", max_length=200)
    budget: str = Field(default="", max_length=120)
    timeline: str = Field(default="", max_length=120)
    source: str = Field(default="Penselverket webbplats", max_length=200)

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
        digits = re.sub(r"\D", "", cleaned)
        if len(digits) < 7:
            raise ValueError("Ogiltigt telefonnummer")
        return cleaned

    @field_validator(
        "name",
        "location",
        "projectType",
        "preferredStart",
        "message",
        "website",
        "budget",
        "timeline",
        "source",
    )
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()


@dataclass
class SubmissionResult:
    status: str
    message: str
    detail: str = ""
