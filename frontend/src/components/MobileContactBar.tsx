import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { company } from '../content/siteContent';
import { Mail, Phone } from './Icons';

export function MobileContactBar() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === '/kontakt') {
      setVisible(false);
      return;
    }

    const footer = document.querySelector<HTMLElement>('.site-footer');

    const updateVisibility = () => {
      const passedHero = window.scrollY > Math.min(650, window.innerHeight * 0.75);
      const footerIsNear = footer ? footer.getBoundingClientRect().top < window.innerHeight + 24 : false;
      setVisible(window.innerWidth <= 760 && passedHero && !footerIsNear);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [pathname]);

  if (pathname === '/kontakt') return null;

  return (
    <div
      className={`mobile-contact-bar ${visible ? 'is-visible' : ''}`}
      aria-label="Snabbkontakt"
      aria-hidden={!visible}
    >
      <a href={`tel:${company.phoneHref}`} tabIndex={visible ? 0 : -1}><Phone />Ring</a>
      <Link to="/kontakt#offert" tabIndex={visible ? 0 : -1}><Mail />Begär offert</Link>
    </div>
  );
}
