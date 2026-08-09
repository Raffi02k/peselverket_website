#!/usr/bin/env python3
"""One-click local preview server for the prebuilt Penselverket website.

Uses only Python's standard library, serves the React build with SPA fallback,
and provides an honest preview response for the contact form.
"""

from __future__ import annotations

import json
import mimetypes
import os
import socket
import sys
import threading
import time
import webbrowser
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "frontend" / "dist"
RATE_WINDOW_SECONDS = 15 * 60
RATE_LIMIT = 5
RATE_LOG: dict[str, list[float]] = {}

mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("application/manifest+json", ".webmanifest")


def find_available_port(start: int = 4178, attempts: int = 20) -> int:
    for port in range(start, start + attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.bind(("127.0.0.1", port))
            except OSError:
                continue
            return port
    raise RuntimeError("Kunde inte hitta en ledig lokal port.")


class PreviewHandler(SimpleHTTPRequestHandler):
    server_version = "PenselverketPreview/1.0"

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(DIST), **kwargs)

    def log_message(self, fmt: str, *args: Any) -> None:
        sys.stdout.write("[preview] " + (fmt % args) + "\n")

    def _send_json(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _client_key(self) -> str:
        return self.client_address[0] if self.client_address else "unknown"

    def _rate_limited(self) -> bool:
        now = time.time()
        key = self._client_key()
        recent = [stamp for stamp in RATE_LOG.get(key, []) if now - stamp < RATE_WINDOW_SECONDS]
        if len(recent) >= RATE_LIMIT:
            RATE_LOG[key] = recent
            return True
        recent.append(now)
        RATE_LOG[key] = recent
        return False

    def do_POST(self) -> None:  # noqa: N802
        if urlparse(self.path).path != "/api/contact":
            self._send_json(HTTPStatus.NOT_FOUND, {"message": "Endpointen finns inte."})
            return

        if self._rate_limited():
            self._send_json(
                HTTPStatus.TOO_MANY_REQUESTS,
                {"message": "För många försök. Vänta en stund och prova igen."},
            )
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 100_000:
                raise ValueError("Ogiltig storlek på förfrågan.")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except (ValueError, json.JSONDecodeError, UnicodeDecodeError) as exc:
            self._send_json(HTTPStatus.BAD_REQUEST, {"message": str(exc)})
            return

        if payload.get("website"):
            self._send_json(HTTPStatus.ACCEPTED, {"status": "preview", "message": "Förhandsvisningsläge."})
            return

        required = {
            "name": 2,
            "phone": 7,
            "email": 5,
            "projectType": 2,
            "message": 20,
        }
        missing = [
            field
            for field, minimum in required.items()
            if len(str(payload.get(field, "")).strip()) < minimum
        ]
        if missing or payload.get("consent") is not True:
            self._send_json(
                HTTPStatus.UNPROCESSABLE_ENTITY,
                {"message": "Kontrollera de obligatoriska fälten och försök igen."},
            )
            return

        self._send_json(
            HTTPStatus.ACCEPTED,
            {
                "status": "preview",
                "message": (
                    "Formuläret och valideringen fungerar, men ingen e-post har skickats i "
                    "den lokala förhandsvisningen. Produktionsservern kan kopplas till SMTP "
                    "med miljövariablerna som beskrivs i README.md."
                ),
            },
        )

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        request_path = unquote(parsed.path).lstrip("/")

        if request_path:
            candidate = (DIST / request_path).resolve()
            try:
                candidate.relative_to(DIST.resolve())
            except ValueError:
                self.send_error(HTTPStatus.FORBIDDEN)
                return

            if candidate.is_file():
                super().do_GET()
                return

        # BrowserRouter SPA fallback.
        self.path = "/index.html"
        super().do_GET()


def main() -> None:
    if not DIST.joinpath("index.html").exists():
        print("Den färdigbyggda webbplatsen saknas.")
        print("Kör först: cd frontend && npm install && npm run build")
        raise SystemExit(1)

    port = find_available_port(int(os.environ.get("PORT", "4178")))
    address = f"http://127.0.0.1:{port}"
    server = ThreadingHTTPServer(("127.0.0.1", port), PreviewHandler)

    print("\nPenselverket – lokal förhandsvisning")
    print(f"Öppnar {address}")
    print("Tryck Ctrl+C i terminalen för att stänga servern.\n")

    threading.Timer(0.7, lambda: webbrowser.open(address)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nFörhandsvisningen stängdes.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
