import { Link, useLocation } from 'react-router-dom';

type LogoProps = {
  compact?: boolean;
  light?: boolean;
};

export function Logo({ compact = false, light = false }: LogoProps) {
  const { pathname } = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      className={`brand ${compact ? 'brand--compact' : ''} ${light ? 'brand--light' : ''}`}
      to="/"
      aria-label="Penselverket – startsida"
      onClick={handleClick}
    >
      <img src="/assets/penselverket_logo_runt.png" alt="" width="52" height="52" />
      {!compact && (
        <span className="brand__text">
          <strong>Penselverket</strong>
          <small>Måleri · Uddevalla</small>
        </span>
      )}
    </Link>
  );
}
