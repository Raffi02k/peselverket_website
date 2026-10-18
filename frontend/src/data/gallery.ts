export type GalleryCategory = 'Alla' | 'Utvändigt' | 'Invändigt' | 'Företag & BRF' | 'Underarbete';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Utvändigt' | 'Invändigt' | 'Företag & BRF' | 'Underarbete';
  location: string;
  src: string;
  alt: string;
  description: string;
}

export const galleryCategories: GalleryCategory[] = [
  'Alla',
  'Utvändigt',
  'Invändigt',
  'Företag & BRF',
  'Underarbete'
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'fasadmalning-villa-uddevalla',
    title: 'Fasadmålning av trävilla',
    category: 'Utvändigt',
    location: 'Uddevalla',
    src: '/assets/utvandigt_malari.webp',
    alt: 'Noggrann fasadmålning av trävilla i Uddevalla',
    description: 'Komplett fasadmålning med noggrann tvätt, grundning och två strykningar med högkvalitativ fasadfärg.'
  },
  {
    id: 'lagenhet-nymalat-uddevalla',
    title: 'Totalmålning av lägenhet',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/laganhet.webp',
    alt: 'Nymålad lägenhet med släta ytor och matt finish',
    description: 'Slätmålning av väggar och tak i neutral kulör med rena avslut mot lister och foder.'
  },
  {
    id: 'exteriot-ommalning-panel',
    title: 'Exteriör ommålning av träfasad',
    category: 'Utvändigt',
    location: 'Uddevalla',
    src: '/assets/utvandigt_malari1.webp',
    alt: 'Ommålning av träfasad och panel i Uddevalla',
    description: 'Väderskyddande behandling och ommålning för långvarig hållbarhet mot bohuslänskt kustklimat.'
  },
  {
    id: 'invandigt-maleri-rum',
    title: 'Invändigt måleri i bostad',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/invandigt_maleri.webp',
    alt: 'Invändigt måleriarbete med jämna väggytor',
    description: 'Noggrann målning av väggar och tak med fokus på jämn täckning och ljusreflektion.'
  },
  {
    id: 'foretagsmaleri-lokaler',
    title: 'Företagsmåleri & kommersiella ytor',
    category: 'Företag & BRF',
    location: 'Uddevalla',
    src: '/assets/foretag.webp',
    alt: 'Måleri av företagslokaler och verksamhetsytor',
    description: 'Professionell målning anpassad efter företagets tidsplan och krav på slitstyrka.'
  },
  {
    id: 'underarbete-spackling',
    title: 'Noggrann spackling & underarbete',
    category: 'Underarbete',
    location: 'Uddevalla',
    src: '/assets/invandigt_malari2.webp',
    alt: 'Spackling och förberedelse av väggytor innan målning',
    description: 'Grunden för ett perfekt slutresultat: bredspackling, skarvremsor och finjustering av ojämnheter.'
  },
  {
    id: 'fasadpanel-och-knutar',
    title: 'Målning av fasadpanel och knutar',
    category: 'Utvändigt',
    location: 'Västra Götaland',
    src: '/assets/utvandigt_malari2.webp',
    alt: 'Målning av panel och kontrasterande knutar',
    description: 'Stilrent färgval som lyfter husets karaktär med skarpa linjer och välgjort foderarbete.'
  },
  {
    id: 'lagenhet-vardagsrum',
    title: 'Nymålat vardagsrum',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/laganhet2.webp',
    alt: 'Ljus och modern invändig finish i vardagsrum',
    description: 'Enhetlig finish med kvalitetsfärg som tål vardagens slitage och ger ett varmt helhetsintryck.'
  },
  {
    id: 'penselverket-pa-plats',
    title: 'Penselverket på plats vid projekt',
    category: 'Företag & BRF',
    location: 'Uddevalla',
    src: '/assets/reklam.webp',
    alt: 'Penselverket utrustning och arbetsfordon vid projekt',
    description: 'Alltid välutrustad med rätt verktyg, stegar och material för ett tryggt och effektivt genomförande.'
  },
  {
    id: 'detaljarbete-fonster-takfot',
    title: 'Detaljarbete runt fönster & takfot',
    category: 'Utvändigt',
    location: 'Uddevalla',
    src: '/assets/utvandigt_malari4.webp',
    alt: 'Noggrann målning runt takfot och fönsterdetaljer',
    description: 'Precisionsmålning på svåråtkomliga partier för att säkerställa komplett fuktskydd.'
  },
  {
    id: 'tackning-och-skydd',
    title: 'Målning med täckning & skydd',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/invandigt_malari3.webp',
    alt: 'Invändigt måleri med noggrann täckning av golv och inredning',
    description: 'Fullständig maskering och golvskydd så att ditt hem förblir rent under hela måleriprocessen.'
  },
  {
    id: 'fasadlyft-uddevalla',
    title: 'Fasadlyft & träskydd',
    category: 'Utvändigt',
    location: 'Uddevalla',
    src: '/assets/utvandigt_malari7.webp',
    alt: 'Fasadlyft på trähus i Uddevalla',
    description: 'Grundlig tvätt följt av fasadfärg som skyddar träet mot fukt, algpåväxt och solens UV-strålar.'
  },
  {
    id: 'snickerimaleri-lister',
    title: 'Snickerimålning & karmar',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/invandigt_malari4.webp',
    alt: 'Detaljmålning av snickerier och lister',
    description: 'Slitstark lackfärg på dörrfoder, fönsterbänkar och lister för en elegant och hållbar yta.'
  },
  {
    id: 'grundarbete-skrapning',
    title: 'Fasadtvätt & skrapning av lös färg',
    category: 'Underarbete',
    location: 'Uddevalla',
    src: '/assets/utvandigt_malari3.webp',
    alt: 'Grundarbete och skrapning av träfasad inför målning',
    description: 'Vi fuskar aldrig med underlaget. All lös färg skrapas bort och träet mättas med oljegrund.'
  },
  {
    id: 'fardigstalld-villa',
    title: 'Färdigställd villa med ny kulör',
    category: 'Utvändigt',
    location: 'Uddevalla',
    src: '/assets/utvandigt_malari8.webp',
    alt: 'Färdigmålad trävilla med enhetlig och snygg yta',
    description: 'Ett hållbart resultat som kunden kan glädjas åt i många år framöver.'
  },
  {
    id: 'dammfritt-underarbete-maskinpark',
    title: 'Dammfritt underarbete',
    category: 'Underarbete',
    location: 'Uddevalla',
    src: '/assets/tools-wide.webp',
    alt: 'Professionell slipmaskin med dammutsug för underarbete',
    description: 'Modern maskinpark med effektivt dammutsug för jämn slipning utan spridning av slipdamm i hemmet.'
  }
];
