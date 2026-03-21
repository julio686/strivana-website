// AI Ghost Agent Types

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  seoScore: number;
  readabilityScore: number;
  wordCount: number;
  backlinks: Backlink[];
}

export interface Backlink {
  id: string;
  url: string;
  domain: string;
  anchorText: string;
  domainAuthority: number;
  pageAuthority: number;
  status: 'active' | 'pending' | 'broken' | 'removed';
  createdAt: Date;
  lastChecked: Date;
}

export interface GEOTarget {
  id: string;
  location: string;
  country: string;
  city?: string;
  keywords: string[];
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  rankingPosition?: number;
  lastUpdated: Date;
}

export interface Lead {
  id: string;
  companyName: string;
  website?: string;
  email?: string;
  phone?: string;
  industry?: string;
  location?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  notes?: string;
  createdAt: Date;
  lastContacted?: Date;
}

export interface SEOAudit {
  id: string;
  pageUrl: string;
  overallScore: number;
  metrics: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  issues: SEOIssue[];
  recommendations: string[];
  createdAt: Date;
}

export interface SEOIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'technical' | 'performance' | 'mobile';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  fix?: string;
}

export interface GhostAgentTask {
  id: string;
  type: 'blog_write' | 'backlink_build' | 'geo_optimize' | 'lead_scrape' | 'seo_audit';
  status: 'pending' | 'running' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  params: Record<string, any>;
  result?: any;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  totalBacklinks: number;
  activeBacklinks: number;
  totalLeads: number;
  qualifiedLeads: number;
  geoTargets: number;
  averageSeoScore: number;
  tasksCompleted: number;
  tasksPending: number;
}

export interface GhostAgentConfig {
  openaiApiKey: string;
  blogFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  targetKeywords: string[];
  competitorUrls: string[];
  backlinkTargets: number;
  leadSources: string[];
  geoLocations: string[];
}
