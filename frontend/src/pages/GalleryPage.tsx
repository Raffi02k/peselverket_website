import { CallToAction } from '../components/CallToAction';
import { GallerySection } from '../components/GallerySection';
import { Check } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';

export function GalleryPage() {
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

      <GallerySection showFilters={true} />

      <CallToAction />
    </>
  );
}
