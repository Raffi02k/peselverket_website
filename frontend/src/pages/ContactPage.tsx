import { ContactForm } from '../components/ContactForm';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';

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
            <div className="contact-standalone-card">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
