import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CloseIcon,
  MapPin,
  ZoomIn
} from './Icons';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { galleryCategories, galleryItems, type GalleryCategory, type GalleryItem } from '../data/gallery';

type GallerySectionProps = {
  isHomePage?: boolean;
  showHeader?: boolean;
  initialCategory?: GalleryCategory;
  showFilters?: boolean;
};

export function GallerySection({
  isHomePage = false,
  showHeader = false,
  initialCategory = 'Alla',
  showFilters = true
}: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>(initialCategory);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'Alla') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeModalItem: GalleryItem | null =
    selectedItemIndex !== null ? filteredItems[selectedItemIndex] ?? null : null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItemIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selectedItemIndex]);

  // Keyboard navigation for lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedItemIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedItemIndex((prev) =>
          prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, filteredItems.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItemIndex === null) return;
    setSelectedItemIndex(selectedItemIndex > 0 ? selectedItemIndex - 1 : filteredItems.length - 1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItemIndex === null) return;
    setSelectedItemIndex(selectedItemIndex < filteredItems.length - 1 ? selectedItemIndex + 1 : 0);
  };

  return (
    <section className={`gallery-section section-pad section--sand ${!isHomePage ? 'gallery-section--page' : ''}`} id="galleri">
      <div className="container">
        {/* Optional Header (shown on HomePage or if explicitly requested) */}
        {(showHeader || isHomePage) && (
          <div className="gallery-section__header-row">
            <Reveal>
              <SectionHeader
                eyebrow={isHomePage ? 'Bildgalleri & Referenser' : 'Våra Arbeten'}
                title="Dokumenterat hantverk i bild."
                text="Bilder från våra faktiska måleriarbeten i Uddevalla och Västra Götaland. Klicka på en bild för att se den i fullskärm."
              />
            </Reveal>
            {isHomePage && (
              <div className="gallery-section__header-action">
                <Link className="button button--ghost" to="/galleri">
                  Se alla {galleryItems.length} bilder <ArrowRight />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Category Filter Pills */}
        {showFilters && (
          <div className="filter-row gallery-filter-row" role="group" aria-label="Filtrera bildgalleri">
            {galleryCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? 'is-active' : ''}
                aria-pressed={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedItemIndex(null);
                }}
              >
                {category}
                {category === 'Alla' ? ` (${galleryItems.length})` : ''}
              </button>
            ))}
          </div>
        )}

        {/* Regular Clean Image Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 35}>
              <article
                className="gallery-card"
                onClick={() => setSelectedItemIndex(index)}
                tabIndex={0}
                role="button"
                aria-label={`Visa bild i storformat: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItemIndex(index);
                  }
                }}
              >
                <div className="gallery-card__media">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span className="gallery-card__category">{item.category}</span>
                  <div className="gallery-card__zoom-hint" aria-hidden="true">
                    <ZoomIn />
                  </div>
                </div>

                <div className="gallery-card__content">
                  <div className="gallery-card__meta">
                    <span><MapPin /> {item.location}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA on HomePage */}
        {isHomePage && (
          <div className="gallery-home-cta-row">
            <Link className="button button--accent" to="/galleri">
              Se hela bildgalleriet ({galleryItems.length} bilder) <ArrowUpRight />
            </Link>
            <Link className="button button--ghost" to="/kontakt#offert">
              Begär offert för ditt projekt
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Modal with Navigation Arrows */}
      {activeModalItem && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
          onClick={() => setSelectedItemIndex(null)}
        >
          <button
            type="button"
            className="gallery-modal__close"
            onClick={() => setSelectedItemIndex(null)}
            aria-label="Stäng bildvisning"
          >
            <CloseIcon />
          </button>

          {/* Modal navigation arrow buttons (Left / Right) */}
          <button
            type="button"
            className="gallery-modal__nav gallery-modal__nav--prev"
            onClick={handlePrev}
            aria-label="Föregående bild"
            title="Föregående bild (Vänsterpil)"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            className="gallery-modal__nav gallery-modal__nav--next"
            onClick={handleNext}
            aria-label="Nästa bild"
            title="Nästa bild (Högerpil)"
          >
            <ChevronRight />
          </button>

          <div
            className="gallery-modal__dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-modal__image-wrapper">
              <img src={activeModalItem.src} alt={activeModalItem.alt} />
              <div className="gallery-modal__counter">
                {(selectedItemIndex ?? 0) + 1} / {filteredItems.length}
              </div>
            </div>

            <div className="gallery-modal__details">
              <div className="gallery-modal__meta">
                <span className="gallery-card__category">{activeModalItem.category}</span>
                <span className="gallery-modal__location">
                  <MapPin /> {activeModalItem.location}
                </span>
              </div>
              <h2>{activeModalItem.title}</h2>
              <p>{activeModalItem.description}</p>
              <div className="gallery-modal__actions">
                <Link
                  className="button button--accent button--small"
                  to="/kontakt#offert"
                  onClick={() => setSelectedItemIndex(null)}
                >
                  Begär offert för liknande jobb <ArrowUpRight />
                </Link>
                <Link
                  className="button button--ghost button--small"
                  to="/projekt"
                  onClick={() => setSelectedItemIndex(null)}
                >
                  Se alla projekt
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
