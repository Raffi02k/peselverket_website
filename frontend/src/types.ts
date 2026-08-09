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
