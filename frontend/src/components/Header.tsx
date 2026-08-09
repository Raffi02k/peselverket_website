import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { company } from '../content/siteContent';
import { ArrowUpRight, CloseIcon, Instagram, MenuIcon, Phone } from './Icons';
import { Logo } from './Logo';

const leftLinks = [
  { to: '/tjanster', label: 'Tjänster' },
  { to: '/projekt', label: 'Projekt' },
  { to: '/om-oss', label: 'Om oss' }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove('menu-open');
      return;
    }

    document.body.classList.add('menu-open');
    const previousFocus = document.activeElement as HTMLElement | null;
    const firstLink = menuRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key === 'Tab' && menuRef.current) {
        const focusable = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>('a, button:not([disabled])')
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
      previousFocus?.focus();
    };
  }, [open]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'is-active' : ''}`;

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav-shell" aria-label="Huvudnavigation">
          <div className="nav-shell__left">
            {leftLinks.map((link) => (
              <NavLink key={link.to} className={navClass} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-shell__brand">
            <Logo compact />
          </div>

          <div className="nav-shell__right">
            <a className="nav-link" href={company.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <NavLink className={navClass} to="/kontakt">
              Kontakt
            </NavLink>
            <NavLink className="button button--accent button--small" to="/kontakt#offert">
              Begär offert
              <ArrowUpRight />
            </NavLink>
          </div>

          <div className="nav-shell__mobile-brand">
            <Logo />
          </div>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Stäng meny' : 'Öppna meny'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="mobile-menu__inner">
          <p className="eyebrow eyebrow--light">Navigera</p>
          <div className="mobile-menu__links">
            {[...leftLinks, { to: '/kontakt', label: 'Kontakt' }].map((link, index) => (
              <NavLink key={link.to} to={link.to} tabIndex={open ? 0 : -1}>
                <span>0{index + 1}</span>
                {link.label}
                <ArrowUpRight />
              </NavLink>
            ))}
          </div>
          <div className="mobile-menu__contact">
            <a href={`tel:${company.phoneHref}`} tabIndex={open ? 0 : -1}>
              <Phone />
              <span>
                <small>Ring Penselverket</small>
                {company.phoneDisplay}
              </span>
            </a>
            <a href={company.instagramUrl} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              <Instagram />
              <span>
                <small>Följ arbetet</small>
                {company.instagramHandle}
              </span>
            </a>
          </div>
          <NavLink className="button button--accent button--wide" to="/kontakt#offert" tabIndex={open ? 0 : -1}>
            Begär kostnadsfri offert
            <ArrowUpRight />
          </NavLink>
        </div>
      </div>
    </>
  );
}
