import { ContactForm } from '../components/ContactForm';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Begär offert | Penselverket AB - Måleri i Uddevalla"
        description="Skicka din offertförfrågan till Penselverket i Uddevalla. Kostnadsfri offert och snabb återkoppling inom 24 timmar."
      />

      <section className="contact-fullscreen-page">
        <div className="container contact-fullscreen-container">
          <Reveal>
            <div className="contact-page-header">
              <p className="eyebrow">Kontaktsida · Penselverket AB</p>
              <h1>Begär kostnadsfri offert.</h1>
              <p>
                Beskriv ditt måleriprojekt nedan så återkommer vi inom 24 timmar. Du kan även ringa oss direkt på{' '}
                <a href={`tel:${company.phoneHref}`}>{company.phoneDisplay}</a>.
              </p>
            </div>

            <div className="contact-standalone-card">
              <ContactForm hideIntro={true} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
