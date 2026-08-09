import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  light?: boolean;
  align?: 'left' | 'center';
};

export function SectionHeader({ eyebrow, title, text, light = false, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`section-header section-header--${align} ${light ? 'section-header--light' : ''}`}>
      <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-header__text">{text}</p>}
    </div>
  );
}
