import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CloseIcon, MapPin, ZoomIn } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';
import { galleryCategories, galleryItems, type GalleryCategory, type GalleryItem } from '../data/gallery';

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Alla');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'Alla') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeModalItem: GalleryItem | null =
    selectedItemIndex !== null ? filteredItems[selectedItemIndex] ?? null : null;

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (selectedItemIndex !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
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
    <>
      <PageMeta
        title="Bildgalleri | Penselverket AB - Måleriarbeten i Uddevalla"
        description="Se bilder från Penselverkets måleriprojekt i Uddevalla och Västra Götaland. Fasadmålning, invändigt måleri, underarbete och BRF-projekt."
      />

      <section className="page-hero page-hero--projects">
        <div className="container page-hero__grid">
          <Reveal>
            <p className="eyebrow">Bildgalleri</p>
            <h1>Dokumenterat hantverk i bild.</h1>
          </Reveal>
          <Reveal delay={100}>
            <div className="page-hero__copy">
              <p className="page-hero__lead">
                Här visar vi foton från våra faktiska måleriarbeten i Uddevalla med omnejd. Från noggrant underarbete och dammfri slipning till färdiga fasader, rum och trapphus.
              </p>
              <div className="gallery-trust-pills">
                <span><Check /> 100% Äkta foton från verkliga projekt</span>
                <span><Check /> Noggrant underarbete</span>
                <span><Check /> 30% ROT-avdrag</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="gallery-section section-pad section--sand">
        <div className="container">
          <div className="filter-row" role="group" aria-label="Filtrera bildgalleri">
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

          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 45}>
                <article
                  className="gallery-card"
                  onClick={() => setSelectedItemIndex(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Visa bild: ${item.title}`}
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

          <div className="gallery-footer-cta">
            <p>Vill du ha ett liknande resultat i ditt hem eller din fastighet?</p>
            <div className="gallery-footer-cta__buttons">
              <Link className="button button--accent" to="/kontakt#offert">
                Begär kostnadsfri offert <ArrowUpRight />
              </Link>
              <a className="button button--ghost" href={`tel:${company.phoneHref}`}>
                Ring {company.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Fullscreen Modal */}
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

          {/* Navigation arrow buttons */}
          <button
            type="button"
            className="gallery-modal__nav gallery-modal__nav--prev"
            onClick={handlePrev}
            aria-label="Föregående bild"
          >
            <ArrowLeft />
          </button>

          <button
            type="button"
            className="gallery-modal__nav gallery-modal__nav--next"
            onClick={handleNext}
            aria-label="Nästa bild"
          >
            <ArrowRight />
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

      <CallToAction />
    </>
  );
}
