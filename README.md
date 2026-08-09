# Penselverket AB – webbplats

En färdig, responsiv webbplatsprototyp för Penselverket AB med ett modernt, bilddrivet tema inspirerat av premiumwebbplatser inom bygg och hantverk. Designen är en egen tolkning och använder endast uppladdat Penselverket-material.

## Öppna resultatet direkt

### Alternativ 1 – öppna utan installation

Dubbelklicka på:

`OPEN_WEBSITE.html`

Det är en fristående, inbäddad förhandsvisning med alla bilder och stilar i samma fil. Du kan klicka mellan sidorna direkt. Kontaktformuläret finns med, men slutlig leverans bör testas i den webserver-körda versionen.

### Alternativ 2 – kör med den lokala Pythonservern

Den färdigbyggda webbplatsen finns i `frontend/dist`.

**Windows:** dubbelklicka på `START_WINDOWS.bat`.

**macOS eller Linux:** dubbelklicka på `START_MAC_LINUX.command`, eller kör:

```bash
python3 start_preview.py
```

Python-scriptet använder bara standardbiblioteket, startar en lokal webbserver och öppnar webbläsaren automatiskt. Avsluta med `Ctrl+C` i terminalfönstret.

> Kontaktformuläret använder nu Web3Forms i frontend. FastAPI-backenden kan fortfarande användas separat, men krävs inte för formulärets e-postflöde.

## Teknikstack

- **React 18** för gränssnitt och komponenter
- **TypeScript / TSX** för frontendkoden
- **JavaScript** för Vite-konfiguration, byggkontroll och den portabla offlineförhandsvisningen
- **Python** för lokal previewserver och produktions-API
- **FastAPI** som valfri produktionsbackend
- **CSS** utan tungt UI-ramverk
- **Vite** för utveckling och build

## Två frontendlägen

- `frontend/src` är den redigerbara huvudkoden i **React + TypeScript**.
- `frontend/dist` är den medföljande lokala förhandsvisningen som kan köras direkt utan npm-installation.
- `OPEN_WEBSITE.html` skapas av `scripts/build_standalone_preview.py` och fungerar som en enda portabel HTML-fil.

## Utveckla frontend

```bash
cd frontend
npm install
npm run dev
```

Öppna sedan adressen som Vite visar, normalt `http://localhost:5173`.

Produktionsbuild:

```bash
npm run build
npm run check
```

## Kör fullstack med FastAPI

FastAPI-backenden är nu valfri och används inte längre för kontaktformulärets standardflöde. Den kan fortfarande köras om du vill använda egen backend eller vidareutveckla API-delen.

1. Bygg frontend:

```bash
cd frontend
npm install
npm run build
cd ..
```

2. Skapa Pythonmiljö och installera backend:

```bash
python3 -m venv backend/.venv
```

Windows:

```bash
backend\.venv\Scripts\activate
pip install -r backend/requirements.txt
```

macOS/Linux:

```bash
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
```

3. Om du ska använda backendens API-funktioner i egen drift: kopiera variablerna från `backend/.env.example` till din driftmiljö. FastAPI läser vanliga miljövariabler; hemligheter ska aldrig läggas i frontendkoden.

4. Starta:

```bash
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Öppna `http://127.0.0.1:8000`.

## Kontaktformulär via Web3Forms

Kontaktformuläret skickas just nu direkt från frontend till Web3Forms.

Nuvarande integration använder bland annat:

```text
access_key
subject
from_name
replyto
```

Det innebär att backendens SMTP-variabler inte behövs för formuläret så länge Web3Forms används.

Se formulärlogiken här:

- `frontend/src/components/ContactForm.tsx`

Om du senare vill gå tillbaka till egen backend-skickning via SMTP kan `backend/app/main.py` och `backend/.env.example` användas som utgångspunkt.

## Innehåll som är lätt att ändra

- Företags- och kontaktuppgifter: `frontend/src/content/siteContent.ts`
- Projekt: `frontend/src/data/projects.ts`
- Sidkomponenter: `frontend/src/pages/`
- Design och responsivitet: `frontend/src/styles/global.css`
- Kontaktformulär: `frontend/src/components/ContactForm.tsx`
- Valfritt kontakt-API: `backend/app/main.py`

## Före publicering

Bekräfta eller byt följande:

1. Telefonnumret `070-660 40 49`.
2. Slutlig domän i `robots.txt`, `sitemap.xml` och eventuell canonical-konfiguration.
3. Web3Forms-konfigurationen för kontaktformuläret och att mottagande e-post fungerar som tänkt.
4. Originalfil av logotypen, helst SVG eller transparent PNG, när den finns.
5. Fler originalbilder av färdiga projekt och ett godkänt porträtt av Oliver.
6. Verifierade kundomdömen med uttryckligt publiceringsgodkännande.
7. ROT-text och övriga företagsuppgifter mot aktuella regler och officiella register vid lansering.

## Bildmaterial

Instagram-gränssnitt, kommentarer och statusfält har inte lagts in på webbplatsen. Användbara delar av de uppladdade arbetsbilderna har beskärts till separata webbformat. Bilderna visar pågående arbete och märks därför som pågående, inte som färdiga slutresultat.
