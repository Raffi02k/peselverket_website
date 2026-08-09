import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'invandigt-maleri-uddevalla',
    title: 'Pågående invändigt måleri',
    location: 'Uddevalla',
    category: 'Invändigt',
    status: 'Pågående',
    year: '2026',
    summary:
      'Ett pågående invändigt projekt där ytor skyddas, förbereds och målas med fokus på ett jämnt och hållbart slutresultat.',
    description: [
      'Bilderna visar arbetet under processen. Golv, köksytor och angränsande delar har täckts in innan arbetet med väggarna fortsätter.',
      'Projektet publiceras som pågående eftersom något färdigt slutresultat ännu inte finns dokumenterat i det uppladdade bildmaterialet.'
    ],
    scope: [
      'Skyddstäckning av golv och fasta ytor',
      'Förberedelse av väggar',
      'Invändig målning',
      'Löpande kontroll av ytor och detaljer'
    ],
    cover: '/assets/hero-project.webp',
    images: [
      {
        src: '/assets/project-room.webp',
        alt: 'Täckt golv och förberedd vägg under pågående invändigt måleriarbete i Uddevalla'
      },
      {
        src: '/assets/project-kitchen.webp',
        alt: 'Skyddstäckt köksdel under pågående invändigt måleriprojekt i Uddevalla'
      },
      {
        src: '/assets/project-detail.webp',
        alt: 'Väggyta och dörröppning under förberedelse inför fortsatt måleriarbete'
      },
      {
        src: '/assets/project-hall.webp',
        alt: 'Nymålad väggyta och skyddstäckt golv i en hall under pågående arbete'
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
      'Noggrann rengöring, tvätt och skrapning av tidigare färgskikt.',
      'Grundmålning samt två strykningar med högkvalitativ fasadfärg för långvarigt skydd.'
    ],
    scope: [
      'Ställningsbyggande och säkerhetsåtgärder',
      'Fasadtvätt och skrapning',
      'Grundmålning & slutstrykning',
      'Målning av fönsterfoder och knutar'
    ],
    cover: '/assets/service-utvandigt.webp',
    images: [
      {
        src: '/assets/service-utvandigt.webp',
        alt: 'Målning av trähusfasad i Uddevalla'
      },
      {
        src: '/assets/project-facade.webp',
        alt: 'Detalj av nymålad fasad och fönsterfoder'
      }
    ]
  },
  {
    slug: 'trapphus-brf-uddevalla',
    title: 'Målning av trapphus & entréer BRF',
    location: 'Uddevalla',
    category: 'Företag & BRF',
    status: 'Färdigt',
    year: '2026',
    summary:
      'Uppfräschning och målning av trapphus, entréer och gemensamma ytor för bostadsrättsförening i Uddevalla.',
    description: [
      'Renovering och målning av väggar, lister och dörrpartier i flerbostadshus.',
      'Slitstarka och lättstädade färgval anpassade för hög belastning i gemensamma utrymmen.'
    ],
    scope: [
      'Underarbete och spackling av slitna väggar',
      'Målning av väggar och snickerier',
      'Slitstark finish för trapphus och entré',
      'Tydlig planering för minsta möjliga störning för de boende'
    ],
    cover: '/assets/service-foretag-brf.webp',
    images: [
      {
        src: '/assets/service-foretag-brf.webp',
        alt: 'Entré och fastighet nymålad för BRF i Uddevalla'
      },
      {
        src: '/assets/project-trapphus.webp',
        alt: 'Nymålat trapphus med varma toner och belysning'
      }
    ]
  }
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
