import { Link } from 'react-router-dom';
import { company } from '../content/siteContent';
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
          <Link to="/om-oss">Om oss</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/integritet">Integritet</Link>
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

      <div className="container site-footer__bottom">
        <p>© {year} {company.legalName}. Alla rättigheter förbehållna.</p>
        <p>Byggd för tydlighet, förtroende och lokal synlighet.</p>
      </div>
    </footer>
  );
}
