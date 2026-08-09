import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M8.3 4.2 10 8.1c.2.5.1 1.1-.3 1.5l-1.5 1.5a14.7 14.7 0 0 0 4.7 4.7l1.5-1.5c.4-.4 1-.5 1.5-.3l3.9 1.7c.5.2.8.7.8 1.2v2.5c0 .7-.5 1.3-1.2 1.4C10.7 22 2 13.3 3.2 4.6 3.3 3.9 3.9 3.4 4.6 3.4h2.5c.5 0 1 .3 1.2.8Z" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.65" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.65" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
