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
    id: 'fasad-trahus-uddevalla',
    title: 'Fasadmålning av trähus',
    category: 'Utvändigt',
    location: 'Uddevalla',
    src: '/assets/service-utvandigt.webp',
    alt: 'Noggrann fasadmålning av villa i Uddevalla',
    description: 'Komplett fasadmålning med noggrann tvätt, skrapning och två strykningar med högkvalitativ fasadfärg.'
  },
  {
    id: 'invandigt-rum-golvskydd',
    title: 'Invändigt måleri med täckning',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/project-room.webp',
    alt: 'Invändigt måleri med skyddstäckning av golv och detaljer',
    description: 'Skyddstäckning av golv och lister inför spackling och målning av väggar och tak.'
  },
  {
    id: 'fasad-gul-villa',
    title: 'Utvändig målning & fasadlyft',
    category: 'Utvändigt',
    location: 'Västra Götaland',
    src: '/assets/gulmalning2.webp',
    alt: 'Fasadmålning av trävilla med fräsch kulör',
    description: 'Hållbar fasadmålning med fokus på väderbeständighet och snygga kontraster mot foder och knutar.'
  },
  {
    id: 'kok-skyddstackning',
    title: 'Målning & förberedelse av kök',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/project-kitchen.webp',
    alt: 'Skyddstäckt köksdel under invändigt måleriarbete',
    description: 'Omsorgsfull inkapsling och täckning av köksinredning och bänkar innan målning påbörjas.'
  },
  {
    id: 'trapphus-brf-entrer',
    title: 'Trapphusmålning för BRF',
    category: 'Företag & BRF',
    location: 'Uddevalla',
    src: '/assets/project-trapphus.webp',
    alt: 'Nymålat trapphus med varma toner för bostadsrättsförening',
    description: 'Slitstark målning av trapphus och entrépartier med färgsättning anpassad för gemensamma miljöer.'
  },
  {
    id: 'underarbete-verktyg',
    title: 'Dammfritt underarbete',
    category: 'Underarbete',
    location: 'Uddevalla',
    src: '/assets/tools-wide.webp',
    alt: 'Professionell slipmaskin med dammutsug för underarbete',
    description: 'Modern maskinpark med effektivt dammutsug för jämn slipning utan spridning av slipdamm i hemmet.'
  },
  {
    id: 'fonster-och-snickerier',
    title: 'Fönstermålning & foder',
    category: 'Utvändigt',
    location: 'Uddevalla',
    src: '/assets/fonster.webp',
    alt: 'Noggrann målning av fönsterbågar och foder',
    description: 'Precision runt fönsterkarmar och snickerier med slitstark fönsterfärg som skyddar mot fukt.'
  },
  {
    id: 'hall-nymalat',
    title: 'Målning av hall & genomgångsytor',
    category: 'Invändigt',
    location: 'Uddevalla',
    src: '/assets/project-hall.webp',
    alt: 'Nymålad hall med släta ytor och neutral kulör',
    description: 'Jämna ytor och rena avslut mot lister i utrymmen med mycket ljusinsläpp och rörelse.'
  },
  {
    id: 'fastighet-foretag',
    title: 'Verksamhets- & fastighetsmålning',
    category: 'Företag & BRF',
    location: 'Uddevalla',
    src: '/assets/service-foretag-brf.webp',
    alt: 'Måleri för kommersiella fastigheter och kontor',
    description: 'Planerade måleriinsatser för kontor och fastigheter med minimal påverkan på den dagliga driften.'
  },
  {
    id: 'forberedelse-vaggytor',
    title: 'Spackling & detaljarbete',
    category: 'Underarbete',
    location: 'Uddevalla',
    src: '/assets/project-detail.webp',
    alt: 'Väggyta och dörröppning under noggrant underarbete',
    description: 'Grunden för ett perfekt slutresultat: bredspackling, skarvremsor och finjustering av ojämnheter.'
  }
];
