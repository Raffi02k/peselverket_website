export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  image?: string;
  visual: 'image' | 'graphic-dark' | 'graphic-sand';
};

export type ProjectCategory = 'Invändigt' | 'Utvändigt' | 'Företag & BRF';
export type ProjectStatus = 'Pågående' | 'Färdigt';

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  summary: string;
  description: string[];
  scope: string[];
  cover: string;
  images: Array<{ src: string; alt: string }>;
};

export type LocationServiceItem = {
  number: string;
  title: string;
  description: string;
  highlight: string;
};

export type LocationData = {
  slug: string;
  name: string;
  county: string;
  heroTagline: string;
  heading: string;
  headingAccent: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  quickAnswer: string;
  subAreas: string[];
  pricingNote: string;
  servicesSubtitle: string;
  services: LocationServiceItem[];
  processLead: string;
  processSteps: Array<{
    number: string;
    title: string;
    text: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};
