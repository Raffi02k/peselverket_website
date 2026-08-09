#!/usr/bin/env python3
"""Build a single-file, offline Penselverket preview.

The production/editable frontend remains React + TypeScript. This helper packs the
prebuilt preview, CSS and local images into OPEN_WEBSITE.html so the file can be
opened directly without installing dependencies or starting a server.
"""

from __future__ import annotations

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "frontend" / "dist"
OUTPUT = ROOT / "OPEN_WEBSITE.html"


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{encoded}"


def build() -> None:
    html = (DIST / "index.html").read_text(encoding="utf-8")
    
    css_path = DIST / "assets" / "site.css"
    if not css_path.exists():
        css_files = list((DIST / "assets").glob("*.css"))
        if css_files:
            css_path = css_files[0]

    js_path = DIST / "assets" / "app.js"
    if not js_path.exists():
        js_files = list((DIST / "assets").glob("*.js"))
        if js_files:
            js_path = js_files[0]

    css = css_path.read_text(encoding="utf-8")
    js = js_path.read_text(encoding="utf-8")

    for asset in (DIST / "assets").iterdir():
        if asset.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp", ".svg"}:
            continue
        uri = data_uri(asset)
        public_path = f"/assets/{asset.name}"
        html = html.replace(public_path, uri)
        js = js.replace(public_path, uri)

    favicon = DIST / "favicon.svg"
    if favicon.exists():
        html = html.replace("/favicon.svg", data_uri(favicon))

    html = re.sub(
        r'<link rel="stylesheet"[^>]*href="/assets/[^"]+\.css"[^>]*>',
        f"<style>\n{css}\n</style>",
        html,
        count=1,
    )
    html = re.sub(r'<link rel="manifest"[^>]*>', "", html, count=1)
    html = re.sub(r'<script[^>]*src="/assets/[^"]+\.js"[^>]*></script>', "", html, count=1)

    script_block = f"""
<script>
  window.__STANDALONE_PREVIEW__ = true;
</script>
<script>
{js}
</script>
"""
    html = html.replace("</body>", script_block + "\n</body>", 1)

    OUTPUT.write_text(html, encoding="utf-8")
    print(f"Skapad: {OUTPUT} ({OUTPUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    build()
