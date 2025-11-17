export type Category =
  | 'conflict-wars'
  | 'environment'
  | 'technology'
  | 'society'
  | 'governance'
  | 'economy'
  | 'politics';

export interface DataStory {
  id: string;
  title: string;
  slug: string;
  category: Category;
  author: string;
  date: string;
  lastModified?: string;
  readTime: number;

  // Scientific paper sections
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  discussion: string;
  conclusion: string;
  references: Reference[];

  // Additional metadata
  keywords: string[];
  doi?: string;

  // Visualizations
  visualizations?: Visualization[];
}

export interface Reference {
  id: string;
  text: string;
  url?: string;
  authors?: string[];
  year?: number;
  publication?: string;
}

export interface Visualization {
  id: string;
  type: 'datawrapper' | 'flourish' | 'iframe' | 'image';
  url: string;
  caption?: string;
  height?: number;
  section: 'introduction' | 'methodology' | 'results' | 'discussion' | 'conclusion';
}

export const CATEGORIES: Record<Category, { label: string; description: string; color: string }> = {
  'conflict-wars': {
    label: 'Conflict & Wars',
    description: 'Analysis of conflicts, wars, and their societal impact',
    color: '#dc2626',
  },
  'environment': {
    label: 'Environment',
    description: 'Environmental challenges and climate change research',
    color: '#16a34a',
  },
  'technology': {
    label: 'Technology',
    description: 'Technological advancement and its implications',
    color: '#2563eb',
  },
  'society': {
    label: 'Society',
    description: 'Social dynamics, demographics, and cultural trends',
    color: '#7c3aed',
  },
  'governance': {
    label: 'Governance',
    description: 'Government systems, policies, and public administration',
    color: '#0891b2',
  },
  'economy': {
    label: 'Economy',
    description: 'Economic trends, markets, and financial systems',
    color: '#ea580c',
  },
  'politics': {
    label: 'Politics',
    description: 'Political systems, elections, and policy analysis',
    color: '#9333ea',
  },
};
