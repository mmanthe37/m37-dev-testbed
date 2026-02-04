// Developer Profile Types
export interface DeveloperProfile {
  name: string;
  email: string;
  github: string;
  avatar?: string;
  title: string;
  bio: string;
  location: string;
}

// Azure Types
export interface AzureSubscription {
  id: string;
  name: string;
  state: string;
  subscriptionId: string;
}

export interface AzureResource {
  id: string;
  name: string;
  type: string;
  location: string;
  resourceGroup: string;
  tags?: Record<string, string>;
}

export interface AzureRoleAssignment {
  roleAssignmentId: string;
  scope: string;
  displayName: string;
  roleDefinitionName: string;
  objectType: string;
}

// GitHub Types
export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  private: boolean;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  htmlUrl: string;
  topics: string[];
}

export interface GitHubWorkflow {
  id: number;
  name: string;
  path: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  type: 'web' | 'mobile' | 'backend' | 'blockchain' | 'ai' | 'other';
  status: 'active' | 'maintenance' | 'archived';
  technologies: string[];
  repository?: string;
  deploymentUrl?: string;
  description: string;
}

// Learning Types
export interface LearningProgress {
  platform: 'microsoft-learn' | 'github' | 'other';
  totalXp: number;
  currentLevel: number;
  completedModules: number;
  certifications: Certification[];
  recentActivity: LearningActivity[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateEarned?: string;
  url?: string;
}

export interface LearningActivity {
  title: string;
  type: string;
  completedAt: string;
}

// Tech Stack Types
export interface Technology {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform' | 'service';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  lastUsed?: string;
}

// API Credentials Types (for display only, not storing actual keys)
export interface APICredential {
  name: string;
  platform: string;
  type: string;
  hasKey: boolean;
  lastRotated?: string;
  expiresAt?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  githubRepos: number;
  azureResources: number;
  uptime: number;
  deploymentsThisMonth: number;
}
