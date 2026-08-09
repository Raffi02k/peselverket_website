#!/usr/bin/env python3
"""Build a single-file, offline Penselverket preview.

The production/editable frontend remains React + TypeScript. This helper packs the
prebuilt preview, CSS and local images into OPEN_WEBSITE.html and switches the
small preview runtime to hash routing so the file can be opened directly without
installing dependencies or starting a server.
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


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Kunde inte hitta sektionen: {label}")
    return text.replace(old, new, 1)


def build() -> None:
    html = (DIST / "index.html").read_text(encoding="utf-8")
    css = (DIST / "assets" / "site.css").read_text(encoding="utf-8")
    js = (DIST / "assets" / "app.js").read_text(encoding="utf-8")

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
        r'<link rel="stylesheet" href="/assets/site\.css"\s*/>',
        f"<style>\n{css}\n</style>",
        html,
        count=1,
    )
    html = re.sub(r'<link rel="manifest"[^>]*>', "", html, count=1)
    html = re.sub(r'<script src="/assets/app\.js" defer></script>', "", html, count=1)
    html = html.replace('<main id="main-content">', '<main id="main-content" tabindex="-1">', 1)

    route_helper = """
  const getStandaloneRoute = () => {
    const raw = window.location.hash.slice(1) || '/';
    const [route, anchor = ''] = raw.split('::');
    return {
      path: route.replace(/\\/$/, '') || '/',
      anchor
    };
  };
"""
    js = replace_once(js, "  'use strict';\n", "  'use strict';\n" + route_helper, "routing helper")
    js = replace_once(
        js,
        "    const path = window.location.pathname.replace(/\\/$/, '') || '/';",
        "    const { path, anchor: routeAnchor } = getStandaloneRoute();",
        "render route",
    )
    js = replace_once(
        js,
        """    if (window.location.hash) {
      window.setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
""",
        """    if (routeAnchor) {
      window.setTimeout(() => {
        const target = document.getElementById(routeAnchor);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
""",
        "route anchor",
    )
    js = replace_once(
        js,
        "    const currentPath = window.location.pathname.replace(/\\/$/, '') || '/';",
        "    const { path: currentPath } = getStandaloneRoute();",
        "mobile route",
    )

    fetch_block = """        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
"""
    preview_response = """        const response = {
          ok: true,
          json: async () => ({
            status: 'preview',
            message: 'Formuläret och valideringen fungerar i den fristående förhandsvisningen. Ingen e-post har skickats.'
          })
        };
"""
    js = replace_once(js, fetch_block, preview_response, "contact preview")

    old_click = """      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      closeMenu();
      history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
      render();
"""
    new_click = """      event.preventDefault();
      closeMenu();
      const rawHref = link.getAttribute('href') || '/';
      const [routePath, anchor = ''] = rawHref.split('#');
      const nextHash = `#${routePath || '/'}${anchor ? `::${anchor}` : ''}`;
      if (window.location.hash === nextHash) render();
      else window.location.hash = nextHash;
"""
    js = replace_once(js, old_click, new_click, "navigation click")
    js = replace_once(
        js,
        "    window.addEventListener('popstate', render);",
        """    window.addEventListener('hashchange', render);

    const skipLink = document.querySelector('.skip-link');
    skipLink?.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('main-content')?.focus();
    });""",
        "hash listener",
    )

    standalone_note = """
    <div class="standalone-preview-note" role="note">
      Fristående förhandsvisning · formuläret skickar ingen e-post
    </div>
"""
    html = html.replace("</body>", standalone_note + f"\n<script>\n{js}\n</script>\n</body>", 1)

    note_css = """
.standalone-preview-note {
  position: fixed;
  z-index: 120;
  right: 16px;
  bottom: 16px;
  max-width: 280px;
  padding: 9px 13px;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 999px;
  color: rgba(255,255,255,.75);
  background: rgba(12,21,24,.92);
  font: 600 11px/1.25 Inter, system-ui, sans-serif;
  letter-spacing: .02em;
  box-shadow: 0 8px 30px rgba(12,21,24,.18);
  pointer-events: none;
}
@media (max-width: 760px) {
  .standalone-preview-note {
    right: 16px;
    bottom: 86px;
    left: 16px;
    max-width: none;
    text-align: center;
    transition: opacity 180ms ease;
  }
  .mobile-contact-bar.is-visible ~ .standalone-preview-note {
    opacity: .65;
  }
}
"""
    html = html.replace("</style>", note_css + "\n</style>", 1)

    OUTPUT.write_text(html, encoding="utf-8")
    print(f"Skapad: {OUTPUT} ({OUTPUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    build()
