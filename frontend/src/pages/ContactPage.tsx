import { ContactForm } from '../components/ContactForm';
import { Instagram, Mail, MapPin, Phone } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Kontakt & kostnadsfri offert | Penselverket AB"
        description="Kontakta Penselverket i Uddevalla för en kostnadsfri offertförfrågan om invändigt eller utvändigt måleri."
      />

      <section className="contact-form-section section-pad">
        <div className="container contact-form-section__grid">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal className="contact-aside" delay={100}>
            <div className="contact-aside__image">
              <img src="/assets/project-hall.webp" alt="Skyddstäckt golv och målad vägg under pågående arbete" loading="lazy" />
              <span>Pågående arbete · Uddevalla</span>
            </div>
            <div className="contact-aside__info">
              <p className="eyebrow">Bra att skicka med</p>
              <ul>
                <li>Vilka rum eller ytor det gäller</li>
                <li>Ungefärlig storlek eller antal rum</li>
                <li>Nuvarande skick och önskat resultat</li>
                <li>Önskad tidsperiod</li>
              </ul>
              <p className="small-copy">Bilder kan delas i den fortsatta kontakten när Penselverket har återkommit.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="contact-hero">
        <div className="container contact-hero__grid">
          <Reveal>
            <p className="eyebrow eyebrow--light">Kontakt</p>
            <h1>Har du ett projekt på gång?</h1>
            <p>
              Berätta kort vad du behöver hjälp med. Penselverket återkopplar med vad som behövs för att bedöma omfattning och nästa steg.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="contact-cards">
              <a href={`tel:${company.phoneHref}`}><Phone /><span><small>Ring</small><strong>{company.phoneDisplay}</strong></span></a>
              <a href={`mailto:${company.email}`}><Mail /><span><small>E-post</small><strong>{company.email}</strong></span></a>
              <a href={company.instagramUrl} target="_blank" rel="noreferrer"><Instagram /><span><small>Instagram</small><strong>{company.instagramHandle}</strong></span></a>
              <div><MapPin /><span><small>Arbetsområde</small><strong>Uddevalla med omnejd</strong></span></div>
            </div>
          </Reveal>
        </div>
      </section>

    </>

  );
}
