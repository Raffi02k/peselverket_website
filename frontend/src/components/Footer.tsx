import { Link } from 'react-router-dom';
import { openCookieModal } from './CookieModal';
import { company } from '../content/siteContent';
import { locations } from '../data/locations';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from './Icons';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Logo light />
          <p>
            Lokalt måleri i Uddevalla med fokus på noggrant underarbete, tydlig kommunikation och väl utförda resultat.
          </p>
        </div>

        <div className="site-footer__column">
          <p className="footer-label">Utforska</p>
          <Link to="/tjanster">Tjänster</Link>
          <Link to="/projekt">Projekt</Link>
          <Link to="/galleri">Galleri</Link>
          <Link to="/om-oss">Om oss</Link>
          <Link to="/faq">Vanliga frågor (FAQ)</Link>
          <Link to="/kontakt">Kontakt</Link>
        </div>

        <div className="site-footer__column">
          <p className="footer-label">Kontakt</p>
          <a href={`tel:${company.phoneHref}`}><Phone />{company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}><Mail />{company.email}</a>
          <a href={company.instagramUrl} target="_blank" rel="noreferrer"><Instagram />{company.instagramHandle}</a>
          <span><MapPin />{company.location}</span>
        </div>

        <div className="site-footer__column site-footer__facts">
          <p className="footer-label">Företagsinfo</p>
          <span>{company.legalName}</span>
          <span>Org.nr {company.organisationNumber}</span>
          <span>Godkänd för F-skatt</span>
          <span>Momsregistrerad</span>
          <Link className="footer-cta" to="/kontakt#offert">Starta ett projekt <ArrowUpRight /></Link>
        </div>
      </div>

      <div className="container site-footer__locations-wrapper">
        <div className="site-footer__locations">
          <span className="footer-locations__badge">ORTER</span>
          <div className="footer-locations__list" aria-label="Orter vi arbetar i">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/malare/${loc.slug}`}
                className="footer-location-pill"
                title={`Målare i ${loc.name}`}
              >
                Målare i {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <div className="site-footer__bottom-left">
          <p>© {year} {company.legalName}. Alla rättigheter förbehållna.</p>
          <div className="site-footer__legal-links">
            <Link to="/integritet">Integritet & GDPR</Link>
            <span className="legal-sep">·</span>
            <Link to="/tillganglighet">Tillgänglighet</Link>
            <span className="legal-sep">·</span>
            <button
              type="button"
              className="footer-cookie-btn"
              onClick={openCookieModal}
            >
              Cookie-inställningar
            </button>
            <span className="legal-sep">·</span>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>

        <a
          className="site-footer__credit"
          href="https://mediamagnet-three.vercel.app"
          target="_blank"
          rel="noreferrer"
          aria-label="Byggd av MediaMagnet"
        >
          <span>Byggd av</span>
          <img src="/assets/mediamagnet_logo_with_text_vit.webp" alt="MediaMagnet" width="220" height="58" />
        </a>
      </div>
    </footer>
  );
}
