import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { ArrowRight, ArrowUpRight, Check, MapPin, Phone, Plus } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';
import { company, reviews, reviewSummary } from '../content/siteContent';
import { getLocationBySlug, locations } from '../data/locations';
import { NotFoundPage } from './NotFoundPage';

export function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!location) {
    return <NotFoundPage />;
  }

  const otherLocations = locations.filter((l) => l.slug !== location.slug);

  // Structured Data (JSON-LD) for Local Painting Business
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `Penselverket AB - Målare i ${location.name}`,
    description: location.metaDescription,
    url: `https://www.penselverket.com/malare/${location.slug}`,
    telephone: company.phoneHref,
    email: company.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.location.split(',')[0].trim(),
      addressRegion: 'Västra Götaland',
      addressCountry: 'SE'
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: location.name
      },
      ...location.subAreas.map((area) => ({
        '@type': 'Place',
        name: area
      }))
    ],
    openingHours: 'Mo-Fr 07:00-17:00',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Måleritjänster i ${location.name}`,
      itemListElement: location.services.map((s, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description
        },
        position: idx + 1
      }))
    }
  };

  return (
    <>
      <PageMeta title={location.metaTitle} description={location.metaDescription} />

      {/* JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="location-hero section-pad">
        <div className="container">
          <nav className="location-breadcrumb" aria-label="Brödsmulor">
            <Link to="/tjanster" className="location-breadcrumb__link">
              ← Tjänster
            </Link>
            <span className="location-breadcrumb__sep">/</span>
            <span>Målare i {location.name}</span>
          </nav>

          <div className="location-hero__grid">
            <div className="location-hero__main">
              <Reveal>
                <div className="location-hero__eyebrow">
                  <span className="location-hero__eyebrow-tag">{location.heroTagline}</span>
                </div>
                <h1 className="location-hero__title">
                  {location.heading}{' '}
                  <span className="location-hero__accent">
                    {location.headingAccent}
                    <svg
                      className="location-hero__underline"
                      viewBox="0 0 280 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 17C65 5 180 3 277 15"
                        stroke="var(--accent)"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="location-hero__lead">{location.heroDescription}</p>
              </Reveal>

              {/* Kort svar callout box (like Ellary) */}
              <Reveal delay={100}>
                <div className="location-quick-answer">
                  <div className="location-quick-answer__header">
                    <span className="location-quick-answer__badge">KORT SVAR</span>
                  </div>
                  <p className="location-quick-answer__text">{location.quickAnswer}</p>
                </div>
              </Reveal>
            </div>

            {/* Right Side Card (like Ellary side card) */}
            <div className="location-hero__aside">
              <Reveal delay={150}>
                <div className="location-side-card">
                  <div className="location-side-card__badges">
                    <span className="location-pill-badge location-pill-badge--accent">
                      {location.name.toUpperCase()}
                    </span>
                    <span className="location-pill-badge">FAST PRIS</span>
                    <span className="location-pill-badge">30% ROT</span>
                  </div>

                  <div className="location-side-card__price-box">
                    <span className="location-side-card__price-label">ROT-AVDRAG</span>
                    <p className="location-side-card__price-value">30 % skattereduktion</p>
                    <p className="location-side-card__price-sub">Dras direkt på arbetskostnaden</p>
                  </div>

                  <div className="location-side-card__areas">
                    <span className="location-side-card__areas-label">VI MÅLAR I:</span>
                    <p className="location-side-card__areas-text">
                      {location.subAreas.join(' · ')}
                    </p>
                    <p className="location-side-card__areas-note">
                      Lokalt på plats i {location.name} och närområden — kostnadsfritt hembesök för offert och rådgivning.
                    </p>
                  </div>

                  <a href="#offert" className="button button--accent location-side-card__cta">
                    Få kostnadsfri offert
                    <ArrowRight />
                  </a>

                  <div className="location-side-card__direct-contact">
                    <small>Eller ring direkt:</small>
                    <a href={`tel:${company.phoneHref}`}>
                      <Phone /> {company.phoneDisplay}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid ("Det vi gör i [Ort]") */}
      <section className="location-services-section section-pad section--sand">
        <div className="container">
          <Reveal>
            <div className="location-section-head">
              <p className="eyebrow">DET VI GÖR I {location.name.toUpperCase()}</p>
              <h2>{location.servicesSubtitle}</h2>
            </div>
          </Reveal>

          <div className="location-services-grid">
            {location.services.map((item, index) => (
              <Reveal key={item.number} delay={index * 80}>
                <a href="#offert" className="location-service-card">
                  <div className="location-service-card__top">
                    <span className="location-service-card__num">{item.number}</span>
                    <span className="location-service-card__icon" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <h3 className="location-service-card__title">{item.title}</h3>
                  <p className="location-service-card__desc">{item.description}</p>
                  <div className="location-service-card__footer">
                    <span className="location-service-card__highlight">{item.highlight}</span>
                    <span className="location-service-card__action">Begär offert →</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section ("Så jobbar vi") */}
      <section className="location-process-section section-pad">
        <div className="container">
          <div className="location-process-grid">
            <Reveal>
              <div className="location-process-intro">
                <p className="eyebrow">SÅ JOBBAR VI I {location.name.toUpperCase()}</p>
                <h2>Från första samtal till godkänd slutkontroll</h2>
                <p className="lead-copy">{location.processLead}</p>
                <div className="location-process-badges">
                  <span><Check /> Fast pris</span>
                  <span><Check /> Skriftligt avtal</span>
                  <span><Check /> 30 % ROT-avdrag</span>
                  <span><Check /> Städgaranti</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="location-process-steps">
                {location.processSteps.map((step) => (
                  <div key={step.number} className="location-process-step">
                    <span className="location-process-step__number">{step.number}</span>
                    <div className="location-process-step__body">
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Customer Trust / Reviews */}
      <section className="location-trust-section section-pad section--sand">
        <div className="container">
          <Reveal>
            <div className="location-trust-head">
              <p className="eyebrow">KUNDNÖJDHET & OMDÖMEN</p>
              <h2>Byggt på förtroende & noggrannhet</h2>
              <p className="lead-copy">
                Våra kunder uppskattar punktlighet, tydlig kommunikation och ett slutresultat som håller över tid.
              </p>
              <div className="location-trust-score">
                <span className="score-stars">★★★★★</span>
                <strong>5.0 av 5</strong>
                <span>på Google Reviews</span>
              </div>
            </div>
          </Reveal>

          <div className="location-reviews-grid">
            {reviews.slice(0, 3).map((rev) => (
              <Reveal key={rev.name}>
                <div className="location-review-card">
                  <div className="location-review-stars">★★★★★</div>
                  <blockquote className="location-review-quote">
                    "{rev.quote}"
                  </blockquote>
                  <div className="location-review-author">
                    <strong>{rev.name}</strong>
                    <span>{location.name} & omnejd</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="reviews-section__actions" style={{ marginTop: '36px' }}>
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

      {/* FAQ Section */}
      <section className="location-faq-section section-pad">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow={`VANLIGA FRÅGOR I ${location.name.toUpperCase()}`}
              title="Allt du behöver veta innan du anlitar oss"
              text={`Svar på de vanligaste funderingarna kring måleriarbeten, ROT-avdrag och upplägg i ${location.name}.`}
            />
          </Reveal>

          <div className="location-faq-list">
            {location.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <Reveal key={faq.question} delay={index * 50}>
                  <div className={`location-faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="location-faq-trigger"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className={`location-faq-icon ${isOpen ? 'is-rotated' : ''}`} aria-hidden="true">
                        <Plus />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="location-faq-content">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Locations Cross-Linking (Important for SEO & User Experience) */}
      <section className="location-other-areas section-pad section--sand">
        <div className="container">
          <Reveal>
            <div className="location-other-head">
              <p className="eyebrow">FLER ORTER</p>
              <h2>Vi utför även måleri i närliggande områden</h2>
              <p>Upptäck våra måleritjänster i andra delar av Bohuslän och Västra Götaland:</p>
            </div>
          </Reveal>

          <div className="location-other-grid">
            {otherLocations.map((other) => (
              <Link
                key={other.slug}
                to={`/malare/${other.slug}`}
                className="location-other-card"
              >
                <div className="location-other-card__info">
                  <MapPin />
                  <div>
                    <strong>Målare i {other.name}</strong>
                    <span>{other.subAreas.slice(0, 3).join(', ')}...</span>
                  </div>
                </div>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Contact Section */}
      <section className="location-contact-section section-pad" id="offert">
        <div className="container">
          <ContactForm defaultLocation={location.name} />
        </div>
      </section>
    </>
  );
}
