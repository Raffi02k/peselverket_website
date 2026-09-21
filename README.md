# Penselverket AB – webbplats

En färdig, responsiv webbplatsprototyp för Penselverket AB med ett modernt, bilddrivet tema inspirerat av premiumwebbplatser inom bygg och hantverk. Designen är en egen tolkning och använder endast uppladdat Penselverket-material.

<img width="2880" height="1551" alt="image" src="https://github.com/user-attachments/assets/adede509-6b34-43be-87d9-5794f60bfe95" />


## Kom igång lokalt

```bash
cd frontend
npm install
npm run dev
```

Webbplatsen startar på `http://localhost:5173` med Hot Module Replacement (HMR) och automatisk proxy till API-backend.

## Produktion & Deployment (Vercel)

Webbplatsen är produktionsklar och driftsätts direkt på Vercel:
- **Frontend:** Byggs som en optimerad statisk SPA i `frontend/dist`.
- **Backend:** Körs som en Zero-Dependency Python Serverless Function via `api/contact.py` och `api/health.py`.
- **Formulär & Leads:** Säkert dirigerat bakom servern till **Web3Forms** (eller framtida **MediaMagnet CRM**) utan exponerade nycklar i klienten.

### Miljövariabler i Vercel
- `FORM_PROVIDER=web3forms`
- `WEB3FORMS_ACCESS_KEY=d3b5efa0-71db-4377-adae-a614eb39b371`

## Teknikstack

- **React 18** & **TypeScript** för modernt komponentbaserat gränssnitt
- **Vite** för blixtsnabb utveckling och optimerat produktionsbygge
- **Python (Serverless)** med standardbibliotek för säker rate-limiting, honeypot och formdispatching
- **CSS** strukturerad modulärt utan tunga externa ramverk

## Utveckla frontend

```bash
cd frontend
npm install
npm run dev
```

Öppna sedan adressen som Vite visar, normalt `http://localhost:5173`.

## Starta med Docker Compose

Om du vill starta frontend och backend tillsammans utan lokal Python- eller Node-installation kan du köra:

```bash
docker compose up --build
```

Det startar:

- frontend på `http://localhost:5173`
- backend på `http://localhost:8000`

Stoppa allt med:

```bash
docker compose down
```

Docker-upplägget är främst tänkt för snabb lokal utveckling. Frontend kör Vite i dev-läge och backend kör FastAPI med reload.

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
