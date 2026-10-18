import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Phone } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="Om Penselverket AB | Målare i Uddevalla"
        description="Penselverket drivs av målaren Oliver Bingmark i Uddevalla. Invändigt och utvändigt måleri med noggrant underarbete, fasta priser och ROT-avdrag."
      />

      <section className="about-fullscreen-section">
        <div className="container about-fullscreen-grid">
          {/* Left Column: Direct, human information */}
          <Reveal className="about-fullscreen-content">
            <p className="eyebrow">Om Penselverket AB</p>
            <h1>Målare i Uddevalla med fokus på hantverket.</h1>

            <p className="about-direct-lead">
              Penselverket drivs av målaren Oliver Bingmark. Vi hjälper privatpersoner, fastighetsägare och bostadsrättsföreningar i Uddevalla och Bohuslän med invändigt och utvändigt måleri.
            </p>

            <p className="about-direct-text">
              Vi lägger stor vikt vid noggrant underarbete, tydliga fasta priser och att alltid lämna ditt hem rent och snyggt.
            </p>

            {/* Quick Facts List */}
            <div className="about-direct-facts">
              <div>
                <small>Grundare</small>
                <strong>{company.contactName}</strong>
              </div>
              <div>
                <small>Telefon</small>
                <a href={`tel:${company.phoneHref}`}><strong>{company.phoneDisplay}</strong></a>
              </div>
              <div>
                <small>Säte & Område</small>
                <strong>Uddevalla & Bohuslän</strong>
              </div>
              <div>
                <small>Org.nr</small>
                <strong>{company.organisationNumber}</strong>
              </div>
              <div>
                <small>Skatt & ROT</small>
                <strong>Godkänd för F-skatt · 30% ROT</strong>
              </div>
              <div>
                <small>E-post</small>
                <a href={`mailto:${company.email}`}><strong>{company.email}</strong></a>
              </div>
            </div>

            {/* Actions */}
            <div className="about-direct-actions">
              <Link className="button button--accent" to="/kontakt">
                Begär kostnadsfri offert <ArrowUpRight />
              </Link>
              <a className="button button--ghost" href={`tel:${company.phoneHref}`}>
                <Phone /> Ring {company.phoneDisplay}
              </a>
            </div>
          </Reveal>

          {/* Right Column: Authentic Video */}
          <Reveal className="about-fullscreen-media" delay={100}>
            <div className="about-photo-card">
              <video
                src="/media/om_oss_video.mp4"
                poster="/media/om_oss_poster.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Oliver Bingmark under måleriarbete i Uddevalla"
              >
                <img
                  src="/media/om_oss_poster.webp"
                  alt="Oliver Bingmark under måleriarbete i Uddevalla"
                  loading="eager"
                  width="720"
                  height="1280"
                />
              </video>
              <div className="about-photo-card__caption">
                <strong>{company.contactName}</strong>
                <span>Målare & Grundare · Uddevalla</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
