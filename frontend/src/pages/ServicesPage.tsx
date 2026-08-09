import { Link } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { ArrowUpRight, Check } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';
import { services } from '../content/siteContent';

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Måleritjänster i Uddevalla | Penselverket AB"
        description="Invändigt och utvändigt måleri samt måleritjänster för företag och BRF i Uddevalla med omnejd."
      />

      <section className="page-hero page-hero--services">
        <div className="container page-hero__grid">
          <Reveal>
            <p className="eyebrow">Tjänster</p>
            <h1>Rätt arbete för ytan, miljön och målet.</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="page-hero__lead">
              Penselverket hjälper till med måleri för hem, fastigheter och verksamheter. Varje uppdrag planeras utifrån underlag, omfattning och önskat resultat.
            </p>
            <Link className="button button--accent" to="/kontakt#offert">Beskriv ditt projekt <ArrowUpRight /></Link>
          </Reveal>
        </div>
      </section>

      <section className="services-detail section-pad">
        <div className="container">
          {services.map((service, index) => (
            <article id={service.id} className="service-detail" key={service.id}>
              <Reveal className="service-detail__visual">
                {service.image ? (
                  <img src={service.image} alt="Pågående invändigt måleriarbete i Uddevalla" loading={index === 0 ? 'eager' : 'lazy'} />
                ) : (
                  <div className={`service-detail__graphic service-detail__graphic--${service.visual}`} aria-hidden="true">
                    <span>0{index + 1}</span>
                    <strong>{service.shortTitle}</strong>
                    <i />
                  </div>
                )}
              </Reveal>
              <Reveal className="service-detail__content" delay={100}>
                <p className="eyebrow">0{index + 1} · {service.shortTitle}</p>
                <h2>{service.title}</h2>
                <p className="lead-copy">{service.description}</p>
                <ul className="check-list">
                  {service.details.map((detail) => <li key={detail}><Check />{detail}</li>)}
                </ul>
                <Link className="text-link" to="/kontakt#offert">Fråga om tjänsten <ArrowUpRight /></Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="scope-section section-pad section--sand">
        <div className="container scope-section__grid">
          <Reveal>
            <SectionHeader
              eyebrow="Inte en standardlösning"
              title="Underlaget avgör hur arbetet ska göras."
              text="Färgvalet är bara en del. Befintligt skick, tidigare behandlingar, fukt, ljus och användning påverkar hur projektet bör planeras."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="scope-list">
              <div><span>01</span><strong>Bedömning</strong><p>Ytor och förutsättningar gås igenom innan upplägget bestäms.</p></div>
              <div><span>02</span><strong>Förberedelse</strong><p>Skydd, rengöring, lagning och grundarbete anpassas efter behov.</p></div>
              <div><span>03</span><strong>Utförande</strong><p>Arbetet genomförs metodiskt med fokus på jämnhet och detaljer.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
