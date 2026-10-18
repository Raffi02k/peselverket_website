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

      <section className="about-editorial-page">
        {/* Decorative Ghost Watermark Typography (as in freeART reference) */}
        <div className="about-editorial-watermark" aria-hidden="true">
          <span>OM OSS · PENSELVERKET</span>
        </div>

        {/* Main Floating Rounded Editorial Container */}
        <div className="about-editorial-container">
          {/* Header Title Section */}
          <header className="about-editorial-header">
            <span className="about-editorial-tag">HANTVERK MED PASSION</span>
            <h1 className="about-editorial-title">
              OM <span className="about-editorial-title-accent">OSS</span>
            </h1>
            <p className="about-editorial-lead">
              Penselverket drivs av målaren Oliver Bingmark. Vi hjälper privatpersoner, fastighetsägare och bostadsrättsföreningar i Uddevalla och Bohuslän med invändigt och utvändigt måleri där kvalitet, noggrant underarbete och personlig service alltid kommer först.
            </p>
          </header>

          {/* Staggered 2x2 Bento Editorial Grid */}
          <div className="about-editorial-grid">
            {/* Top-Left: Founder & Craft Card */}
            <Reveal className="about-editorial-card about-editorial-card--story">
              <div className="about-story-visual">
                <img
                  src="/assets/penselverket_logo_runt.webp"
                  alt="Penselverket hantverksstämpel"
                  className="about-story-badge"
                  width="110"
                  height="110"
                  loading="eager"
                />
              </div>
              <div className="about-story-text">
                <span className="about-card-eyebrow">GRUNDARE & MÅLARE</span>
                <h3>Oliver Bingmark</h3>
                <p>
                  Vi tror på ett genuint målerihantverk där underarbetet får ta den tid som krävs för att slutresultatet ska hålla och se felfritt ut i många år framåt.
                </p>
                <div className="about-story-meta">
                  <span>Uddevalla & Bohuslän</span>
                  <span>·</span>
                  <span>Org.nr {company.organisationNumber}</span>
                </div>
              </div>
            </Reveal>

            {/* Top-Right: Stat 1 */}
            <Reveal className="about-editorial-card about-editorial-card--stat" delay={80}>
              <div className="about-stat-number">30%</div>
              <h3 className="about-stat-title">ROT-AVDRAG DIREKT PÅ FAKTURAN</h3>
              <p className="about-stat-desc">
                Som privatperson betalar du endast 70% av arbetskostnaden. Vi hanterar hela kontakten och avdraget med Skatteverket utan administrativt krångel för dig.
              </p>
            </Reveal>

            {/* Bottom-Left: Stat 2 */}
            <Reveal className="about-editorial-card about-editorial-card--stat" delay={120}>
              <div className="about-stat-number">100%</div>
              <h3 className="about-stat-title">NÖJD KUND & FASTA PRISER</h3>
              <p className="about-stat-desc">
                Tydliga, specificerade offerter innan vi sätter igång. Vi håller tidsplaner, lämnar hemmet dammfritt och städat, och har F-skatt godkänd.
              </p>
            </Reveal>

            {/* Bottom-Right: Authentic Video of Oliver in Action */}
            <Reveal className="about-editorial-card about-editorial-card--video" delay={160}>
              <div className="about-video-frame">
                <video
                  src="/media/om_oss_video.mp4"
                  poster="/media/om_oss_poster.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Oliver Bingmark målar i Uddevalla"
                >
                  <img
                    src="/media/om_oss_poster.webp"
                    alt="Oliver Bingmark under arbete"
                    loading="eager"
                    width="720"
                    height="1280"
                  />
                </video>
                <div className="about-video-caption">
                  <div>
                    <strong>Oliver Bingmark</strong>
                    <span>Målare i arbete · Uddevalla</span>
                  </div>
                  <span className="about-video-live-pill">
                    <span className="about-pulse-dot" /> I ARBETE
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom Action Footer Bar */}
          <footer className="about-editorial-footer">
            <div className="about-footer-info">
              <span className="about-footer-tag">REDO ATT FÖRVANDLA DITT HEM?</span>
              <p>Begär en kostnadsfri offert eller slå oss en signal för rådgivning.</p>
            </div>
            <div className="about-footer-actions">
              <Link className="button button--accent" to="/kontakt">
                Begär kostnadsfri offert <ArrowUpRight />
              </Link>
              <a className="button button--ghost-editorial" href={`tel:${company.phoneHref}`}>
                <Phone /> Ring {company.phoneDisplay}
              </a>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
