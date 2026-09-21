from __future__ import annotations

import json
import os
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        provider = os.getenv("FORM_PROVIDER", "").strip().lower()
        if not provider:
            if os.getenv("WEB3FORMS_ACCESS_KEY", "").strip():
                provider = "web3forms"
            elif os.getenv("CRM_API_URL", "").strip() and os.getenv("CRM_API_KEY", "").strip():
                provider = "crm"
            else:
                provider = "preview"

        payload = {
            "status": "ok",
            "provider": provider,
            "runtime": "python-standard-library",
            "service": "Penselverket API",
        }
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
