import { Link } from 'react-router-dom';
import { openCookieModal } from '../components/CookieModal';
import { ArrowUpRight, Check, Mail, Phone } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';

export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Integritet & GDPR | Penselverket AB"
        description="Läs om hur Penselverket AB hanterar personuppgifter och GDPR i samband med måleriuppdrag och offertförfrågningar."
      />

      <section className="legal-hero">
        <div className="container">
          <div className="legal-meta-bar">
            <span>INTEGRITET</span>
            <span className="legal-meta-bar__sep">·</span>
            <span>GDPR</span>
            <span className="legal-meta-bar__sep">·</span>
            <span>SENAST UPPDATERAD 2026</span>
          </div>

          <Reveal>
            <p className="eyebrow">INTEGRITET & GDPR</p>
            <h1 className="legal-hero__title">Era uppgifter, i trygga händer.</h1>
            <p className="legal-hero__lead">
              Vi tror på transparens — även när det gäller personuppgifter. Här förklarar vi vad vi samlar in,
              varför, och vilka rättigheter du som kund eller besökare har.
            </p>
          </Reveal>

          {/* 4 Summary Cards */}
          <div className="legal-summary-grid">
            <Reveal delay={50}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">ANSVARIG</span>
                <strong>{company.legalName}</strong>
                <p>Org.nr {company.organisationNumber}</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">LAGLIG GRUND</span>
                <strong>Berättigat intresse & avtal</strong>
                <p>För offerter, dialog och avtal</p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">LAGRINGSTID</span>
                <strong>Upp till 24 månader</strong>
                <p>Eller enligt bokföringslagen</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="legal-summary-card">
                <span className="legal-summary-card__label">KONTAKT</span>
                <strong>{company.email}</strong>
                <p>{company.phoneDisplay}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section: Vilka uppgifter vi samlar in */}
      <section className="legal-details-section section--sand">
        <div className="container">
          <Reveal>
            <p className="eyebrow">VILKA UPPGIFTER VI SAMLAR IN</p>
            <h2 className="legal-section-title">Aldrig mer än vad som behövs för att svara dig</h2>
          </Reveal>

          <div className="legal-cards-grid">
            <Reveal delay={50}>
              <div className="legal-info-card">
                <h3>Namn & eventuellt företagsnamn</h3>
                <p>För att veta vem vi pratar med och kunna återkoppla personligt och korrekt.</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="legal-info-card">
                <h3>E-postadress</h3>
                <p>För att besvara din förfrågan, skriva detaljerad offert och skicka specifikationer.</p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="legal-info-card">
                <h3>Telefonnummer</h3>
                <p>Endast när du ber oss ringa upp dig eller för att stämma av tid för kostnadsfritt hembesök.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="legal-info-card">
                <h3>Adress / Ort & projektbeskrivning</h3>
                <p>För att kunna göra en korrekt bedömning av måleriarbetets omfattning och eventuellt ROT-avdrag.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section: Rättigheter och cookies */}
      <section className="legal-rights-section">
        <div className="container">
          <div className="legal-two-col">
            <Reveal>
              <div>
                <p className="eyebrow">DINA RÄTTIGHETER</p>
                <h2>Full kontroll över dina personuppgifter</h2>
                <p className="lead-copy">
                  Enligt Dataskyddsförordningen (GDPR) har du ett flertal rättigheter gällande de uppgifter vi lagrar om dig.
                </p>
                <ul className="check-list" style={{ marginTop: '24px' }}>
                  <li><Check /> <strong>Rätt till tillgång:</strong> Få en kopia av de personuppgifter vi behandlar.</li>
                  <li><Check /> <strong>Rätt till rättelse:</strong> Få felaktiga uppgifter korrigerade utan dröjsmål.</li>
                  <li><Check /> <strong>Rätt till radering:</strong> Begära att vi tar bort uppgifter som inte längre behövs.</li>
                  <li><Check /> <strong>Rätt att invända:</strong> Återkalla samtycke för framtida kommunikation.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="legal-cookie-box">
                <p className="eyebrow">COOKIES & INSTÄLLNINGAR</p>
                <h3>Hantera dina cookies</h3>
                <p>
                  Vi värnar om din integritet på nätet. Du kan när som helst justera vilka cookies och spårare som är aktiva.
                </p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="button button--secondary"
                    onClick={openCookieModal}
                  >
                    Öppna cookie-inställningar
                  </button>
                  <Link to="/kontakt" className="button button--accent">
                    Kontakta oss <ArrowUpRight />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
