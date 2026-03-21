export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  tools: string[];
  images: string[];
  price?: number;
  beforeImage?: string;
  afterImage?: string;
  process?: string;
  results?: string;
  featured?: boolean;
}

export interface DigitalProduct {
  id: string;
  title: string;
  category: 'Thumbnail Pack' | 'UI Kit' | 'Template';
  price: number;
  image: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  tier: 'Basic' | 'Pro' | 'Premium';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}
