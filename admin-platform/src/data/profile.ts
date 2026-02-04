import { DeveloperProfile, Project, Technology, APICredential, LearningProgress } from '../types';

export const developerProfile: DeveloperProfile = {
  name: 'Michael Andrew Manthe',
  email: 'mmanthe37@live.seminolestate.edu',
  github: 'mmanthe37',
  title: 'Full-Stack Developer & Cloud Architect',
  bio: 'Passionate about building innovative solutions across web, mobile, and blockchain platforms. Specializing in Azure cloud architecture, AI/ML integrations, and modern web technologies.',
  location: 'Florida, USA',
};

export const projects: Project[] = [
  {
    id: 'omnisphere',
    name: 'OmniSphere Platform',
    type: 'blockchain',
    status: 'active',
    technologies: ['React', 'Next.js', 'Solidity', 'Web3', 'TypeScript'],
    repository: 'https://github.com/mmanthe37/OmniSphere',
    description: 'All-in-one DeFi solution with advanced trading capabilities and multi-chain support',
  },
  {
    id: 'gear-ai',
    name: 'Gear AI',
    type: 'mobile',
    status: 'active',
    technologies: ['Swift', 'SwiftUI', 'iOS', 'AI/ML', 'OBD2'],
    repository: 'https://github.com/mmanthe37/m37-dev-testbed',
    description: 'Chat with your vehicle - AI-powered vehicle diagnostics and maintenance assistant',
  },
  {
    id: 'trading-system',
    name: 'Adaptive Trend Momentum Compounder',
    type: 'ai',
    status: 'active',
    technologies: ['Python', 'AI/ML', 'Trading Algorithms', 'Multi-Agent Systems'],
    description: 'Multi-agent trading system with adaptive trend analysis',
  },
  {
    id: 'dev-testbed',
    name: 'M37 Dev Testbed',
    type: 'other',
    status: 'active',
    technologies: ['React', 'TypeScript', 'Python', 'Swift', 'Go', 'Docker'],
    repository: 'https://github.com/mmanthe37/m37-dev-testbed',
    description: 'Personal development laboratory for experimenting with new technologies',
  },
];

export const techStack: Technology[] = [
  // Languages
  { name: 'TypeScript', category: 'language', proficiency: 'advanced', lastUsed: '2026-02-04' },
  { name: 'JavaScript', category: 'language', proficiency: 'expert', lastUsed: '2026-02-04' },
  { name: 'Swift', category: 'language', proficiency: 'advanced', lastUsed: '2026-02-03' },
  { name: 'Python', category: 'language', proficiency: 'advanced', lastUsed: '2026-02-02' },
  { name: 'Go', category: 'language', proficiency: 'intermediate', lastUsed: '2026-01-28' },
  { name: 'Solidity', category: 'language', proficiency: 'intermediate', lastUsed: '2026-01-25' },
  
  // Frameworks
  { name: 'React', category: 'framework', proficiency: 'expert', lastUsed: '2026-02-04' },
  { name: 'Next.js', category: 'framework', proficiency: 'advanced', lastUsed: '2026-02-04' },
  { name: 'React Native', category: 'framework', proficiency: 'advanced', lastUsed: '2026-02-03' },
  { name: 'Expo', category: 'framework', proficiency: 'advanced', lastUsed: '2026-02-03' },
  { name: 'SwiftUI', category: 'framework', proficiency: 'advanced', lastUsed: '2026-02-03' },
  
  // Platforms & Services
  { name: 'Azure', category: 'platform', proficiency: 'advanced', lastUsed: '2026-02-04' },
  { name: 'GitHub Actions', category: 'platform', proficiency: 'advanced', lastUsed: '2026-02-04' },
  { name: 'Docker', category: 'platform', proficiency: 'intermediate', lastUsed: '2026-02-01' },
  { name: 'Terraform', category: 'platform', proficiency: 'intermediate', lastUsed: '2026-01-24' },
  { name: 'Supabase', category: 'service', proficiency: 'intermediate', lastUsed: '2026-02-03' },
  
  // Tools
  { name: 'Git', category: 'tool', proficiency: 'expert', lastUsed: '2026-02-04' },
  { name: 'VS Code', category: 'tool', proficiency: 'expert', lastUsed: '2026-02-04' },
  { name: 'Xcode', category: 'tool', proficiency: 'advanced', lastUsed: '2026-02-03' },
  { name: 'PowerShell', category: 'tool', proficiency: 'intermediate', lastUsed: '2026-01-30' },
];

export const apiCredentials: APICredential[] = [
  {
    name: 'Apple Developer',
    platform: 'Apple',
    type: 'API Key',
    hasKey: true,
    lastRotated: '2026-01-15',
  },
  {
    name: 'Google OAuth',
    platform: 'Google Cloud',
    type: 'OAuth Client',
    hasKey: true,
    lastRotated: '2026-01-20',
  },
  {
    name: 'Azure Service Principal',
    platform: 'Microsoft Azure',
    type: 'Service Principal',
    hasKey: true,
    lastRotated: '2026-01-24',
  },
  {
    name: 'GitHub Personal Access Token',
    platform: 'GitHub',
    type: 'PAT',
    hasKey: true,
    lastRotated: '2026-02-01',
  },
  {
    name: 'Coinbase Developer Platform',
    platform: 'Coinbase',
    type: 'API Key',
    hasKey: true,
    lastRotated: '2026-01-18',
  },
  {
    name: 'OpenAI API',
    platform: 'OpenAI',
    type: 'API Key',
    hasKey: true,
    lastRotated: '2026-01-25',
  },
  {
    name: 'Supabase',
    platform: 'Supabase',
    type: 'API Key',
    hasKey: true,
    lastRotated: '2026-02-03',
  },
];

export const learningProgress: LearningProgress = {
  platform: 'microsoft-learn',
  totalXp: 500,
  currentLevel: 1,
  completedModules: 1,
  certifications: [
    {
      id: 'github-foundations',
      name: 'GitHub Foundations',
      issuer: 'Microsoft',
      url: 'https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/',
    },
  ],
  recentActivity: [
    {
      title: 'Generate images with Azure OpenAI - Introduction',
      type: 'unit',
      completedAt: '2025-10-24T02:15:12.541621Z',
    },
    {
      title: 'What is DALL-E',
      type: 'unit',
      completedAt: '2025-10-24T02:15:15.748725Z',
    },
    {
      title: 'DALL-E in OpenAI Studio',
      type: 'unit',
      completedAt: '2025-10-24T02:15:20.546967Z',
    },
    {
      title: 'DALL-E REST API',
      type: 'unit',
      completedAt: '2025-10-24T02:15:27.314212Z',
    },
    {
      title: 'Exercise: Use DALL-E',
      type: 'unit',
      completedAt: '2025-10-24T02:15:38.806584Z',
    },
  ],
};

export const azureSubscriptions = [
  {
    id: '9e3c67f1-937c-42d8-bc24-c488f90c68c9',
    name: 'Primary Subscription',
    state: 'Enabled',
    subscriptionId: '9e3c67f1-937c-42d8-bc24-c488f90c68c9',
  },
  {
    id: 'aef65f68-df04-4e66-88a0-c7764d32b686',
    name: 'Student Subscription',
    state: 'Enabled',
    subscriptionId: 'aef65f68-df04-4e66-88a0-c7764d32b686',
  },
];

export const azureResources = [
  {
    id: 'arm-connection-1',
    name: 'Azure Resource Manager Connection',
    type: 'Microsoft.Web/connections',
    location: 'eastus2',
    resourceGroup: 'm37-student-subscription',
    tags: { environment: 'production' },
  },
];
