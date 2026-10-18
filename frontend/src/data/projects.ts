import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'invandigt-maleri-uddevalla',
    title: 'Totalmålning av lägenhet & bostad',
    location: 'Uddevalla',
    category: 'Invändigt',
    status: 'Färdigt',
    year: '2026',
    summary:
      'Komplett invändig målning av väggar, tak och snickerier med noggrant underarbete och slät, modern finish.',
    description: [
      'Noggrant grund- och underarbete med bredspackling, skarvremsor och maskering av samtliga golvytor.',
      'Två strykningar med slitstark vägg- och takfärg i neutral kulör som ger ett harmoniskt och ljust intryck.'
    ],
    scope: [
      'Skyddstäckning av golv och inredning',
      'Bredspackling och slipning med dammutsug',
      'Målning av väggar, tak och dörrfoder',
      'Slutbesiktning och renstädade ytor'
    ],
    cover: '/assets/laganhet.webp',
    images: [
      {
        src: '/assets/laganhet.webp',
        alt: 'Nymålad lägenhet med släta ytor och matt finish i Uddevalla'
      },
      {
        src: '/assets/laganhet2.webp',
        alt: 'Ljus och modern invändig finish i vardagsrum'
      },
      {
        src: '/assets/invandigt_maleri.webp',
        alt: 'Invändigt måleriarbete med jämna väggytor'
      },
      {
        src: '/assets/invandigt_malari2.webp',
        alt: 'Noggrann spackling och underarbete innan målning'
      },
      {
        src: '/assets/invandigt_malari4.webp',
        alt: 'Precisionsmålning av snickerier och dörrfoder'
      }
    ]
  },
  {
    slug: 'utvandigt-fasadmaleri-uddevalla',
    title: 'Fasad & utvändigt måleri',
    location: 'Uddevalla',
    category: 'Utvändigt',
    status: 'Färdigt',
    year: '2026',
    summary:
      'Noggrann fasadmålning och grundarbete på trähus i Uddevalla med fokus på väderbeständighet och välgjort detaljarbete.',
    description: [
      'Noggrann rengöring, tvätt och skrapning av tidigare färgskikt och lös färg.',
      'Grundmålning samt två strykningar med högkvalitativ fasadfärg för långvarigt skydd mot bohuslänskt kustklimat.'
    ],
    scope: [
      'Ställningsbyggande och säkerhetsåtgärder',
      'Fasadtvätt och skrapning',
      'Grundmålning & slutstrykning',
      'Målning av fönsterfoder, vindskivor och knutar'
    ],
    cover: '/assets/utvandigt_malari.webp',
    images: [
      {
        src: '/assets/utvandigt_malari.webp',
        alt: 'Fasadmålning av trävilla i Uddevalla'
      },
      {
        src: '/assets/utvandigt_malari1.webp',
        alt: 'Exteriör ommålning med täckande fasadfärg'
      },
      {
        src: '/assets/utvandigt_malari2.webp',
        alt: 'Målning av träpanel och knutar'
      },
      {
        src: '/assets/utvandigt_malari4.webp',
        alt: 'Detaljarbete fönster och takfot'
      },
      {
        src: '/assets/utvandigt_malari8.webp',
        alt: 'Färdigställd villa med fräsch kulör'
      }
    ]
  },
  {
    slug: 'trapphus-brf-uddevalla',
    title: 'Företagsmåleri & kommersiella lokaler',
    location: 'Uddevalla',
    category: 'Företag & BRF',
    status: 'Färdigt',
    year: '2026',
    summary:
      'Måleri av företagslokaler, verksamhetsytor och fastigheter med fokus på slitstyrka och minimal störning.',
    description: [
      'Målning av lokaler, kontor och gemensamma utrymmen anpassat för hög belastning.',
      'Flexibel planering så att verksamheten kan rulla på utan onödiga avbrott.'
    ],
    scope: [
      'Underarbete och spackling av slitna väggar',
      'Målning av väggar och snickerier med slitstark färg',
      'Tydlig tidsplan och noggrann ordning under arbetet'
    ],
    cover: '/assets/foretag.webp',
    images: [
      {
        src: '/assets/foretag.webp',
        alt: 'Måleri av företagslokaler och verksamhetsytor i Uddevalla'
      },
      {
        src: '/assets/reklam.webp',
        alt: 'Penselverket arbetsfordon och utrustning på plats vid projekt'
      }
    ]
  }
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
