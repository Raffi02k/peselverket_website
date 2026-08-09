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
  }
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
