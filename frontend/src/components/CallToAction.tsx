import { Link } from 'react-router-dom';
import { company } from '../content/siteContent';
import { ArrowUpRight, Phone } from './Icons';
import { Reveal } from './Reveal';

export function CallToAction() {
  return (
    <section className="cta-section section-pad">
      <div className="container">
        <Reveal>
          <div className="cta-card">
            <div className="cta-card__topline">
              <span>Har du ett projekt på gång?</span>
              <span>Uddevalla · Västra Götaland</span>
            </div>
            <div className="cta-card__content">
              <h2>Berätta vad du vill förändra. Vi tar nästa steg tillsammans.</h2>
              <p>
                Skicka en kostnadsfri offertförfrågan eller ring direkt. Penselverket återkopplar med vad som behövs för att kunna bedöma projektet.
              </p>
            </div>
            <div className="cta-card__actions">
              <Link className="button button--accent" to="/kontakt#offert">
                Begär kostnadsfri offert <ArrowUpRight />
              </Link>
              <a className="button button--ghost-light" href={`tel:${company.phoneHref}`}>
                <Phone /> {company.phoneDisplay}
              </a>
            </div>
            <div className="cta-card__mark">P</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
