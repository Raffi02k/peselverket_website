import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Mail } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';

export function AccessibilityPage() {
  return (
    <>
      <PageMeta
        title="Tillgänglighet | Penselverket AB"
        description="Läs om Penselverket AB:s arbete med digital tillgänglighet enligt WCAG 2.1 AA och hur vi säkerställer en inkluderande webbplats."
      />

      <section className="legal-hero">
        <div className="container">
          <div className="legal-meta-bar">
            <span>TILLGÄNGLIGHET</span>
            <span className="legal-meta-bar__sep">·</span>
            <span>WCAG 2.1 AA</span>
            <span className="legal-meta-bar__sep">·</span>
            <span>SENAST UPPDATERAD 2026</span>
          </div>

          <Reveal>
            <p className="eyebrow">TILLGÄNGLIGHETSREDOGÖRELSE</p>
            <h1 className="legal-hero__title">En webbplats tillgänglig för alla.</h1>
            <p className="legal-hero__lead">
              Penselverket strävar efter att webbplatsen ska kunna uppfattas, hanteras och förstås av alla besökare,
              oavsett funktionsförmåga, digitala hjälpmedel eller skärmstorlek.
            </p>
          </Reveal>

          {/* 4 Summary Cards */}
          <div className="legal-summary-grid">
            <Reveal delay={50}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">STANDARD</span>
                <strong>WCAG 2.1 Nivå AA</strong>
                <p>Riktlinjer för tillgänglighet</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">NAVIGERING</span>
                <strong>Tangentbordsstöd</strong>
                <p>Logisk tabbordning & fokus</p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">TYDLIGHET</span>
                <strong>Hög kontrast</strong>
                <p>Lättläst typografi & färger</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">FEEDBACK</span>
                <strong>{company.email}</strong>
                <p>Kontakta oss vid brister</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section: Vad vi gör för tillgänglighet */}
      <section className="legal-details-section section--sand">
        <div className="container">
          <Reveal>
            <p className="eyebrow">HUR VI BYGGT SAJTEN</p>
            <h2 className="legal-section-title">Konkreta åtgärder för ökad tillgänglighet</h2>
          </Reveal>

          <div className="legal-cards-grid">
            <Reveal delay={50}>
              <div className="legal-info-card">
                <h3>Semantisk HTML & ARIA</h3>
                <p>Vi använder korrekta HTML5-element och ARIA-attribut så att skärmläsare tolkar strukturen och rubrikerna rätt.</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="legal-info-card">
                <h3>Tangentbordsnavigering</h3>
                <p>Alla länkar, knappar och formulärfält kan nås och användas smidigt utan mus, med tydliga visuella fokusmarkeringar.</p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="legal-info-card">
                <h3>Skärmanpassning & responsivitet</h3>
                <p>Webbplatsen anpassar sig flexibelt till mobiler, surfplattor och stora bildskärmar samt tillåter textförstoring upp till 200%.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="legal-info-card">
                <h3>Tydliga formulär & felmeddelanden</h3>
                <p>Våra offertformulär har tydliga etiketter, beskrivningar och direkt återkoppling om något fält fyllts i felaktigt.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Feedback section */}
      <section className="legal-rights-section">
        <div className="container">
          <div className="legal-two-col">
            <Reveal>
              <div>
                <p className="eyebrow">RAPPORTERA BRISTER</p>
                <h2>Hjälp oss bli ännu bättre</h2>
                <p className="lead-copy">
                  Vi arbetar ständigt med att förbättra webbplatsens tillgänglighet. Om du upptäcker problem eller
                  behöver innehåll i något annat format är du varmt välkommen att höra av dig.
                </p>
                <div style={{ marginTop: '24px' }}>
                  <a href={`mailto:${company.email}?subject=Tillgänglighet på webbplatsen`} className="button button--accent">
                    Skicka tillgänglighetsfeedback <Mail />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="legal-cookie-box">
                <p className="eyebrow">BEHÖVER DU HJÄLP?</p>
                <h3>Ring oss direkt</h3>
                <p>
                  Vill du hellre beskriva ditt måleriprojekt över telefon eller boka tid för rådgivning? Vi svarar gärna personligen.
                </p>
                <div style={{ marginTop: '24px' }}>
                  <a href={`tel:${company.phoneHref}`} className="button button--secondary">
                    Ring {company.phoneDisplay} <ArrowUpRight />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
