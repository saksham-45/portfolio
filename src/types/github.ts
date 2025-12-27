export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  default_branch: string;
  size: number; // Size in KB
  archived: boolean;
  disabled: boolean;
}

export interface RepoLanguages {
  [key: string]: number;
}

export interface ProcessedProject {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  languages: RepoLanguages;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
  slug: string;
  hasContent: boolean; // Has at least 2-3 files
}

