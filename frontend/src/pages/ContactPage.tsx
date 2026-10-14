import { ContactForm } from '../components/ContactForm';
import { Award, Check, Instagram, Mail, MapPin, Phone, ShieldCheck } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Kontakt & kostnadsfri offert | Penselverket AB"
        description="Kontakta Penselverket i Uddevalla för en kostnadsfri offertförfrågan om invändigt eller utvändigt måleri. Snabb återkoppling inom 24h."
      />

      {/* Clean Top Page Hero */}
      <section className="page-hero page-hero--contact-top">
        <div className="container page-hero__grid">
          <Reveal>
            <p className="eyebrow">Kontakt & Offert</p>
            <h1>Kontakta oss för ditt måleriprojekt.</h1>
          </Reveal>
          <Reveal delay={100}>
            <div className="page-hero__copy">
              <p className="page-hero__lead">
                Hör av dig för en kostnadsfri offert, rådgivning eller för att boka ett förutsättningslöst hembesök i Uddevalla med omnejd. Vi återkopplar normalt inom 24 timmar.
              </p>
              <div className="gallery-trust-pills about-hero-pills">
                <span><ShieldCheck /> Godkänd för F-skatt</span>
                <span><Check /> 30% ROT-avdrag direkt</span>
                <span><Award /> Full ansvarsförsäkring</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Section: Quick Contact Cards + Form + Guidance */}
      <section className="contact-main-section section-pad">
        <div className="container">
          {/* Quick Contact Bar */}
          <div className="contact-quick-bar">
            <a href={`tel:${company.phoneHref}`} className="contact-quick-card">
              <div className="contact-quick-card__icon"><Phone /></div>
              <div>
                <small>Ring direkt</small>
                <strong>{company.phoneDisplay}</strong>
              </div>
            </a>

            <a href={`mailto:${company.email}`} className="contact-quick-card">
              <div className="contact-quick-card__icon"><Mail /></div>
              <div>
                <small>Skicka e-post</small>
                <strong>{company.email}</strong>
              </div>
            </a>

            <div className="contact-quick-card">
              <div className="contact-quick-card__icon"><MapPin /></div>
              <div>
                <small>Verksamhetsområde</small>
                <strong>Uddevalla & Bohuslän</strong>
              </div>
            </div>

            <a href={company.instagramUrl} target="_blank" rel="noreferrer" className="contact-quick-card">
              <div className="contact-quick-card__icon"><Instagram /></div>
              <div>
                <small>Följ våra jobb</small>
                <strong>{company.instagramHandle}</strong>
              </div>
            </a>
          </div>

          {/* Form and Sidebar Grid */}
          <div className="contact-form-section__grid" style={{ marginTop: '36px' }}>
            <Reveal>
              <div className="contact-form-card">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal className="contact-aside" delay={100}>
              {/* Direct call box */}
              <div className="contact-direct-card">
                <div className="contact-direct-card__header">
                  <span className="contact-direct-card__badge">Snabbast svar</span>
                  <h3>Föredrar du att ringa direkt?</h3>
                  <p>Du pratar direkt med målaren Oliver Bingmark. Inga mellanhänder eller växlar.</p>
                </div>
                <a className="button button--accent button--full" href={`tel:${company.phoneHref}`}>
                  <Phone /> Ring {company.phoneDisplay}
                </a>
              </div>

              {/* What happens next box */}
              <div className="contact-steps-card">
                <h4>Vad händer när du skickar förfrågan?</h4>
                <ol className="contact-steps-list">
                  <li>
                    <strong>1. Snabb återkoppling</strong>
                    <p>Vi läser igenom dina uppgifter och återkopplar inom 24 timmar via telefon eller e-post.</p>
                  </li>
                  <li>
                    <strong>2. Hembesök eller foton</strong>
                    <p>Vid behov gör vi ett kostnadsfritt besök på plats i Uddevalla för att mäta och bedöma underlaget.</p>
                  </li>
                  <li>
                    <strong>3. Specificerad offert</strong>
                    <p>Du får ett tydligt prisförslag med specificerat 30% ROT-avdrag och uppskattad tidsplan.</p>
                  </li>
                </ol>
              </div>

              {/* Good to include checklist */}
              <div className="contact-checklist-card">
                <p className="eyebrow">Bra att ta med i beskrivningen</p>
                <ul>
                  <li><Check /> Vilka rum eller fasadytor det gäller</li>
                  <li><Check /> Ungefärlig storlek eller antal kvadratmeter</li>
                  <li><Check /> Nuvarande skick och önskad målad yta</li>
                  <li><Check /> När du önskar få arbetet utfört</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
