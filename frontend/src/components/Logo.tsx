import { Link } from 'react-router-dom';

type LogoProps = {
  compact?: boolean;
  light?: boolean;
};

export function Logo({ compact = false, light = false }: LogoProps) {
  return (
    <Link className={`brand ${compact ? 'brand--compact' : ''} ${light ? 'brand--light' : ''}`} to="/" aria-label="Penselverket – startsida">
      <img src="/assets/penselverket-logo.png" alt="" width="52" height="52" />
      {!compact && (
        <span className="brand__text">
          <strong>Penselverket</strong>
          <small>Måleri · Uddevalla</small>
        </span>
      )}
    </Link>
  );
}
