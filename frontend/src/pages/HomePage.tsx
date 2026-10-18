import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { FAQ } from '../components/FAQ';
import { GallerySection } from '../components/GallerySection';
import { ArrowRight, ArrowUpRight, Check, Phone } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';
import { company, processSteps, reviewSummary, reviews, services } from '../content/siteContent';
import { projects } from '../data/projects';

export function HomePage() {
  const serviceMarqueeItems = [
    'Utvändigt måleri',
    'Företag & BRF',
    'Underarbete',
    'Uddevalla med omnejd',
    'Invändigt måleri'
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    name: company.legalName,
    email: company.email,
    telephone: company.phoneHref,
    identifier: company.organisationNumber,
    areaServed: ['Uddevalla', 'Västra Götaland'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Uddevalla',
      addressRegion: 'Västra Götaland',
      addressCountry: 'SE'
    }
  };
  const repeatedReviews = [...reviews, ...reviews];

  return (
    <>
      <PageMeta
        title="Målare i Uddevalla | Penselverket AB"
        description="Noggrant invändigt och utvändigt måleri för privatpersoner, företag och BRF i Uddevalla och Västra Götaland. Begär kostnadsfri offert."
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <section className="hero-video">
        <div className="hero-video__bg" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero-poster.webp"
            src="/media/hero-video.mp4"
          />
        </div>
        <div className="hero-video__overlay" aria-hidden="true" />
        <div className="hero-video__content">
          <img
            src="/assets/penselverket_logo_runt.webp"
            alt="Penselverket"
            className="hero-video__logo"
            width="420"
            height="420"
          />

          <h1 className="hero-video__subtitle">
            Professionellt måleri med precision och resultat som håller i Uddevalla &amp; Västra Götaland
          </h1>

          <div className="hero-video__ctas">
            <Link to="/kontakt#offert" className="hero-video__cta hero-video__cta--primary">
              Begär offert
            </Link>
            <Link to="/tjanster" className="hero-video__cta">
              Se våra tjänster
            </Link>
          </div>
        </div>
      </section>

      <div className="service-marquee" aria-hidden="true">
        <div className="service-marquee__track">
          {[0, 1, 2].map((group) => (
            <div className="service-marquee__group" key={group}>
              {serviceMarqueeItems.map((item) => (
                <Fragment key={`${group}-${item}`}>
                  <span>{item}</span>
                  <b aria-hidden="true">✦</b>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="services-section section-pad section--sand">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Tjänster"
              title={<>Måleritjänster för hem,<br />fastigheter och verksamheter.</>}
              text="Varje uppdrag börjar med att förstå ytan, miljön och det resultat du vill uppnå."
            />
          </Reveal>

          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 90}>
                <Link className={`service-card service-card--${service.visual}`} to={`/tjanster#${service.id}`}>
                  {service.image && <img src={service.image} alt="" loading="lazy" />}
                  <div className="service-card__graphic" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <i />
                  </div>
                  <div className="service-card__overlay" />
                  <div className="service-card__content">
                    <span className="service-card__number">0{index + 1}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="service-card__link">Läs mer <ArrowUpRight /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="section-link-row">
            <Link className="button button--ghost" to="/tjanster">Se alla tjänster <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="container intro-section__grid">
          <Reveal>
            <p className="eyebrow">Penselverket</p>
            <h2>Lokalt måleri med yrkesstolthet.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="intro-section__copy">
              <p className="lead-copy">
                Ett bra måleriarbete handlar om mer än själva färgen. Det börjar med rätt förberedelser, tydlig kommunikation och respekt för kundens hem eller verksamhet.
              </p>
              <p>
                Penselverket arbetar metodiskt från första genomgång till färdig yta, med ett personligt ansvar genom hela projektet.
              </p>
              <Link className="text-link" to="/om-oss">Lär känna Penselverket <ArrowUpRight /></Link>
            </div>
          </Reveal>
        </div>

        <div className="container trust-row">
          <div><strong>F-skatt</strong><span>Godkänd för F-skatt</span></div>
          <div><strong>Moms</strong><span>Momsregistrerad</span></div>
          <div><strong>Offert</strong><span>Kostnadsfri förfrågan</span></div>
          <div><strong>559595-4453</strong><span>Organisationsnummer</span></div>
        </div>
      </section>

      <section className="reviews-section section-pad section--paper" aria-labelledby="reviews-title">
        <div className="container reviews-section__shell">
          <Reveal>
            <div className="reviews-section__heading">
              <p className="eyebrow">{reviewSummary.eyebrow}</p>
              <h2 id="reviews-title">{reviewSummary.title}</h2>
              <p className="lead-copy reviews-section__lead">{reviewSummary.text}</p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="reviews-rating" aria-label={`${reviewSummary.rating} av 5 stjärnor baserat på ${reviewSummary.reviewCount}`}>
              <span>{reviewSummary.rating}</span>
              <div>
                <div className="reviews-stars" aria-hidden="true">★★★★★</div>
                <p>{reviewSummary.reviewCount}</p>
              </div>
            </div>
          </Reveal>

          <div className="reviews-marquee" aria-label="Kundomdömen">
            <div className="reviews-track">
              {repeatedReviews.map((review, index) => (
                <article className="review-card" key={`${review.name}-${index}`}>
                  <p className="review-card__label">{review.source}</p>
                  <div className="reviews-stars" aria-hidden="true">★★★★★</div>
                  <blockquote>{`“${review.quote}”`}</blockquote>
                  <strong>{review.name}</strong>
                  <p className="review-card__source">Verifierad kund</p>
                </article>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="reviews-section__actions">
              <a
                className="button button--accent reviews-section__cta"
                href={reviewSummary.writeReviewHref}
                target="_blank"
                rel="noreferrer"
              >
                {reviewSummary.writeReviewLabel} <ArrowUpRight />
              </a>
              <a
                className="button button--ghost reviews-section__cta"
                href={reviewSummary.ctaHref}
                target="_blank"
                rel="noreferrer"
              >
                {reviewSummary.ctaLabel} <ArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="quality-section section-pad">
        <div className="container quality-section__grid">
          <Reveal className="quality-section__media">
            <img src="/assets/tools-wide.webp" alt="Slipmaskin och dammutsugare för professionellt underarbete" loading="lazy" width="835" height="410" />
            <div className="quality-section__media-label">
              <span>Underarbetet</span>
              <strong>Grunden för ett hållbart resultat</strong>
            </div>
          </Reveal>
          <Reveal className="quality-section__content" delay={100}>
            <p className="eyebrow eyebrow--light">Underarbetet</p>
            <h2>Ett hållbart slutresultat börjar långt före första strykningen.</h2>
            <p>
              Noggrann slipning, spackling, rengöring och rätt förberedelser skapar förutsättningar för jämna ytor och ett resultat som håller över tid.
            </p>
            <ul className="check-list check-list--light">
              <li><Check /> Rätt förberedelse för underlaget</li>
              <li><Check /> Professionella verktyg och arbetsmetoder</li>
              <li><Check /> Ordning och omsorg under projektet</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="container process-section__grid">
          <div className="process-section__sticky">
            <SectionHeader
              eyebrow="Så går det till"
              title={<>Från första kontakt till sista penseldrag.</>}
              text="En tydlig process gör det enklare att veta vad som händer före, under och efter arbetet."
              light
            />
            <Link className="button button--ghost-light" to="/kontakt#offert">
              Starta en förfrågan <ArrowUpRight />
            </Link>
          </div>
          <div className="process-list">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 70}>
                <article className="process-step">
                  <span className="process-step__number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section section-pad">
        <div className="container">
          <Reveal>
            <div className="projects-section__heading">
              <SectionHeader
                eyebrow="Projekt"
                title="Arbetet får tala."
                text="Här publiceras dokumenterade projekt och arbetsprocesser från Penselverket."
              />
              <Link className="button button--ghost" to="/projekt">Se projektsidan <ArrowRight /></Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ProjectCard project={projects[0]} featured />
          </Reveal>
          <div className="project-note-grid">
            <Reveal>
              <div className="project-note project-note--image">
                <img src="/assets/invandigt_malari2.webp" alt="Noggrant underarbete och spackling under pågående arbete" loading="lazy" />
                <div><span>Arbetsprocess</span><strong>Skydd, förberedelse och kontroll</strong></div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="project-note project-note--type">
                <span>Fler projekt publiceras löpande</span>
                <p>Riktiga bilder, tydlig status och inga påhittade slutresultat.</p>
                <Link className="text-link text-link--light" to="/projekt">Utforska projekt <ArrowUpRight /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <GallerySection isHomePage={true} showFilters={true} />

      <section className="about-section section-pad section--paper">
        <div className="container about-section__grid">
          <Reveal className="about-section__visual">
            <div className="about-brand-card">
              <img src="/assets/penselverket_logo_runt.webp" alt="Penselverket logotyp" width="600" height="600" loading="lazy" />
              <div className="about-brand-card__caption">
                <span>Grundare & kontaktperson</span>
                <strong>Oliver Bingmark</strong>
              </div>
            </div>
            <div className="about-location-card">
              <strong>Uddevalla</strong>
              <small>Västra Götaland</small>
            </div>
          </Reveal>
          <Reveal className="about-section__content" delay={100}>
            <p className="eyebrow">Om Penselverket</p>
            <h2>Personligt ansvar från första kontakt till färdigt resultat.</h2>
            <p className="lead-copy">
              Penselverket drivs av Oliver Bingmark och bygger på ett enkelt löfte: noggrant underarbete, tydlig kommunikation och ett slutresultat som känns rätt i kundens hem eller verksamhet.
            </p>
            <p>
              Som lokalt måleriföretag i Uddevalla är målet att göra processen enkel och trygg, från den första frågan till den avslutande genomgången.
            </p>
            <Link className="button button--ghost" to="/om-oss">Mer om Penselverket <ArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      <section className="rot-section section-pad">
        <div className="container rot-card">
          <Reveal>
            <div className="rot-card__label">ROT</div>
          </Reveal>
          <Reveal className="rot-card__content" delay={80}>
            <p className="eyebrow">ROT-avdrag</p>
            <h2>Lägre arbetskostnad för godkända måleriarbeten.</h2>
            <p>
              Som privatperson kan du för godkända arbeten ha rätt till upp till 30 procent skattereduktion på arbetskostnaden. Material, resor och andra kostnader omfattas inte av samma avdrag.
            </p>
            <p className="small-copy">
              Penselverket hanterar avdraget på fakturan enligt fakturamodellen när villkoren är uppfyllda. Din möjlighet till avdrag beror på dina personliga förutsättningar och Skatteverkets aktuella regler.
            </p>
            <Link className="text-link" to="/kontakt#offert">Fråga om ROT i din offert <ArrowUpRight /></Link>
          </Reveal>
          <p className="rot-card__note">Generell information. Kontrollera alltid fullständiga villkor hos Skatteverket.</p>
        </div>
      </section>

      <section className="faq-section section-pad section--sand">
        <div className="container faq-section__grid">
          <Reveal>
            <SectionHeader
              eyebrow="Vanliga frågor"
              title="Bra att veta före ditt måleriprojekt."
              text="Några av de vanligaste frågorna inför en första kontakt."
            />
            <a className="button button--ghost" href={`tel:${company.phoneHref}`}><Phone /> Ring {company.phoneDisplay}</a>
          </Reveal>
          <Reveal delay={100}>
            <FAQ />
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
