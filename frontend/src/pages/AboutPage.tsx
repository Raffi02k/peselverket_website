import { Link } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { ArrowRight, ArrowUpRight, Check, Phone, ShieldCheck, MapPin, Award, StarIcon } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';
import { company } from '../content/siteContent';

const commitments = [
  {
    number: '01',
    title: 'Noggrant underarbete',
    text: 'Vi fuskar aldrig med grunden. Rengöring, spackling och dammfri maskinslipning skapar optimal vidhäftning och jämna, slitstarka ytor som håller i många år.'
  },
  {
    number: '02',
    title: 'Fast offert & tidplan',
    text: 'Du får alltid ett tydligt, specificerat underlag utan dolda tillägg. Vi håller överenskomna datum och kommunicerar öppet under hela arbetets gång.'
  },
  {
    number: '03',
    title: 'Respekt för ditt hem',
    text: 'Vi skyddar dina golv, lister och möbler med noggrann maskering och täckning. Arbetsplatsen hålls ren och vi städar alltid ordentligt efter oss varje dag.'
  },
  {
    number: '04',
    title: 'Trygghet & ROT-avdrag',
    text: 'Penselverket AB är fullt ansvarsförsäkrat, godkänt för F-skatt och sköter all administration kring ditt 30% ROT-avdrag direkt på fakturan.'
  }
];

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="Om Penselverket AB | Lokalt måleriföretag i Uddevalla"
        description="Lär känna Penselverket AB och målaren Oliver Bingmark. Personligt ansvar, noggrant underarbete och kvalitetsmåleri i Uddevalla och Bohuslän."
      />

      {/* Hero Section */}
      <section className="page-hero page-hero--about">
        <div className="container page-hero__grid">
          <Reveal>
            <p className="eyebrow">Om Penselverket AB</p>
            <h1>Måleri med yrkesstolthet & personligt ansvar.</h1>
          </Reveal>
          <Reveal delay={100}>
            <div className="page-hero__copy">
              <p className="page-hero__lead">
                Penselverket är ett lokalt måleriföretag i Uddevalla som drivs av målaren Oliver Bingmark. Vi hjälper privatpersoner, bostadsrättsföreningar och fastighetsägare i Uddevalla och Bohuslän med invändigt och utvändigt måleri där noggrant underarbete alltid står i centrum.
              </p>
              <div className="gallery-trust-pills about-hero-pills">
                <span><ShieldCheck /> Godkänd för F-skatt</span>
                <span><Award /> Full ansvarsförsäkring</span>
                <span><Check /> 30% ROT-avdrag direkt</span>
                <span><StarIcon /> 5.0 på Google</span>
              </div>
              <div className="about-hero-actions">
                <Link className="button button--accent" to="/kontakt#offert">
                  Begär kostnadsfri offert <ArrowUpRight />
                </Link>
                <a className="button button--ghost" href={`tel:${company.phoneHref}`}>
                  <Phone /> Ring {company.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story & Craftsman Profile */}
      <section className="about-story section-pad">
        <div className="container about-story__grid">
          <Reveal className="about-story__visual">
            <div className="about-story__photo-wrapper">
              <img
                src="/assets/project-facade.webp"
                alt="Penselverket utför fasadmålning med hög precision och säkerhet i Uddevalla"
                loading="lazy"
                width="800"
                height="600"
              />
              <div className="about-story__badge">
                <img
                  src="/assets/penselverket_logo_runt.webp"
                  alt="Penselverket stämpel"
                  className="about-story__badge-logo"
                  width="56"
                  height="56"
                />
                <div>
                  <strong>{company.contactName}</strong>
                  <span>Grundare & Målare, Uddevalla</span>
                  <small>Verksam i hela Västra Götaland</small>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="about-story__content" delay={100}>
            <p className="eyebrow">Vårt Hantverk</p>
            <h2>Grunden avgör hur bra det blir.</h2>
            <p className="lead-copy">
              Ett bra måleriarbete handlar till sjuttio procent om det som görs innan färgen ens nuddar väggen. Rengöring, spackling, dammfri slipning och noggrann maskering är det som avgör om ytan förblir jämn och fin över tid.
            </p>
            <p>
              Hos Penselverket möter du alltid en och samma person från första hembesöket till sista penseldraget. Vi lämnar en specificerad offert med fasta villkor, håller vad vi lovar gällande tider och ser till att ditt hem lämnas snyggt och städat varje dag.
            </p>
            <ul className="check-list">
              <li><Check /> Personlig kontakt och rådgivning kring material och kulörer</li>
              <li><Check /> Dammfri slipning och noggrann skyddstäckning av alla ytor</li>
              <li><Check /> Tydliga offerter utan dolda tillägg eller oväntade kostnader</li>
              <li><Check /> 30% ROT-avdrag administrerat direkt på din faktura</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Commitments & Working Principles */}
      <section className="values-section section-pad section--sand">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Så arbetar vi"
              title="Fyra enkla löften till dig som kund."
              text="Tydliga rutiner, noggrant hantverk och öppen dialog gör att du kan känna dig helt trygg genom hela projektet."
            />
          </Reveal>
          <div className="values-grid">
            {commitments.map((item, index) => (
              <Reveal key={item.number} delay={index * 60}>
                <article className="values-card">
                  <span className="values-card__number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Verifiable Company Credentials */}
      <section className="company-facts section-pad">
        <div className="container company-facts__grid">
          <Reveal>
            <SectionHeader
              eyebrow="Företagsfakta"
              title="En trygg och lokal samarbetspartner."
              text="Penselverket AB är ett registrerat svenskt aktiebolag med säte i Uddevalla. Vi har full ansvarsförsäkring, är godkända för F-skatt och hanterar ROT-avdrag direkt med Skatteverket."
            />
            <div className="company-facts__actions">
              <a
                className="button button--ghost"
                href={company.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
              >
                Läs våra recensioner på Google <ArrowUpRight />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="company-facts__card">
              <dl>
                <div>
                  <dt>Företagsnamn</dt>
                  <dd>{company.legalName}</dd>
                </div>
                <div>
                  <dt>Organisationsnummer</dt>
                  <dd><strong>{company.organisationNumber}</strong></dd>
                </div>
                <div>
                  <dt>Grundare & kontakt</dt>
                  <dd>{company.contactName}</dd>
                </div>
                <div>
                  <dt>Säte & bas</dt>
                  <dd>Uddevalla, Västra Götalands län</dd>
                </div>
                <div>
                  <dt>Skattestatus</dt>
                  <dd>Godkänd för F-skatt och momsregistrerad</dd>
                </div>
                <div>
                  <dt>Försäkring</dt>
                  <dd>Full ansvarsförsäkring för entreprenad</dd>
                </div>
                <div>
                  <dt>Arbetsområde</dt>
                  <dd>{company.serviceArea}</dd>
                </div>
                <div>
                  <dt>Telefon</dt>
                  <dd><a href={`tel:${company.phoneHref}`}>{company.phoneDisplay}</a></dd>
                </div>
                <div>
                  <dt>E-post</dt>
                  <dd><a href={`mailto:${company.email}`}>{company.email}</a></dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
