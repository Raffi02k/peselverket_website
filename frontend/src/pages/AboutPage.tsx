import { Link } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { ArrowUpRight, Check } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';
import { company } from '../content/siteContent';

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="Om Penselverket | Lokalt måleriföretag i Uddevalla"
        description="Lär känna Penselverket AB och arbetssättet bakom noggrant måleri i Uddevalla med omnejd."
      />

      <section className="page-hero page-hero--about">
        <div className="container page-hero__grid">
          <Reveal>
            <p className="eyebrow">Om Penselverket</p>
            <h1>Personligt ansvar i varje steg.</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="page-hero__lead">
              Penselverket drivs av Oliver Bingmark och utgår från Uddevalla. Fokus ligger på tydlig kommunikation, ett metodiskt arbetssätt och respekt för miljön där arbetet utförs.
            </p>
            <Link className="button button--accent" to="/kontakt#offert">Ta första kontakten <ArrowUpRight /></Link>
          </Reveal>
        </div>
      </section>

      <section className="about-story section-pad">
        <div className="container about-story__grid">
          <Reveal className="about-story__visual">
            <div className="about-story__logo-card">
              <img src="/assets/penselverket_logo_runt.png" alt="Penselverket logotyp" width="600" height="600" />
            </div>
            <div className="about-story__facts">
              <span>Grundare & kontaktperson</span>
              <strong>{company.contactName}</strong>
              <small>{company.location}</small>
            </div>
          </Reveal>
          <Reveal className="about-story__content" delay={100}>
            <p className="eyebrow">Företaget</p>
            <h2>Ett enkelt löfte: gör grunden ordentligt.</h2>
            <p className="lead-copy">
              Ett hållbart måleriarbete börjar med att förstå underlaget och förbereda ytan rätt. Därför får skyddstäckning, rengöring, slipning och lagning den tid projektet kräver.
            </p>
            <p>
              För kunden ska processen samtidigt kännas tydlig. Vad ingår, hur går arbetet till och vad behöver vara klart innan start? Penselverket vill att de frågorna ska ha begripliga svar.
            </p>
            <ul className="check-list">
              <li><Check /> Personlig kontakt genom projektet</li>
              <li><Check /> Tydligt upplägg innan arbetet startar</li>
              <li><Check /> Omsorg om ytor, detaljer och arbetsmiljö</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="values-section section-pad section--sand">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Arbetssätt"
              title="Tre principer som håller ihop projektet."
              text="Inte stora ord, utan konkreta sätt att arbeta från första kontakt till överlämning."
            />
          </Reveal>
          <div className="values-grid">
            <Reveal>
              <article><span>01</span><h3>Noggrann grund</h3><p>Ytan bedöms och förbereds efter sitt faktiska skick, inte efter en standardmall.</p></article>
            </Reveal>
            <Reveal delay={80}>
              <article><span>02</span><h3>Tydlig dialog</h3><p>Förutsättningar, omfattning och nästa steg förklaras på ett sätt som går att förstå.</p></article>
            </Reveal>
            <Reveal delay={160}>
              <article><span>03</span><h3>Respekt på plats</h3><p>Hem och verksamheter skyddas, hålls ordnade och lämnas med omsorg.</p></article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="company-facts section-pad">
        <div className="container company-facts__grid">
          <Reveal>
            <SectionHeader eyebrow="Företagsfakta" title="Lokalt förankrat i Uddevalla." />
          </Reveal>
          <Reveal delay={100}>
            <dl>
              <div><dt>Juridiskt namn</dt><dd>{company.legalName}</dd></div>
              <div><dt>Organisationsnummer</dt><dd>{company.organisationNumber}</dd></div>
              <div><dt>Säte</dt><dd>Uddevalla</dd></div>
              <div><dt>Skatt & moms</dt><dd>Godkänd för F-skatt och momsregistrerad</dd></div>
              <div><dt>Arbetsområde</dt><dd>{company.serviceArea}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
