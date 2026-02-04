# M37 Dev Admin Platform

A comprehensive, personalized development administration platform for managing all development resources, projects, credentials, and cloud infrastructure in one interconnected dashboard.

## 🎯 Overview

This is a custom-built admin platform specifically designed for mmanthe37's development ecosystem. It provides a unified interface to monitor and manage:

- **Projects Portfolio** - Track all active, maintenance, and archived projects
- **Azure Resources** - Monitor subscriptions and cloud resources
- **GitHub Integration** - View repositories and activity
- **Tech Stack** - Inventory of all technologies and proficiency levels
- **API Credentials** - Secure credential management dashboard
- **Learning Progress** - Track Microsoft Learn and other platform progress
- **Deployments** - Monitor application deployments across platforms

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Access to your development credentials (for live data integration)

### Installation

```bash
# Navigate to the platform directory
cd admin-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The platform will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Data Integration**: Azure SDK, Octokit (GitHub API)

### Project Structure

```
admin-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── StatCard.tsx     # Statistics card component
│   │   └── ProjectCard.tsx  # Project display card
│   ├── pages/               # Next.js pages
│   │   ├── index.tsx        # Dashboard home
│   │   ├── projects.tsx     # Projects portfolio
│   │   ├── azure.tsx        # Azure resources
│   │   ├── github.tsx       # GitHub integration
│   │   ├── tech-stack.tsx   # Technology inventory
│   │   ├── credentials.tsx  # API credentials
│   │   ├── learning.tsx     # Learning progress
│   │   └── deployments.tsx  # Deployment monitoring
│   ├── data/                # Static data and profiles
│   │   └── profile.ts       # Developer profile data
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # All type definitions
│   └── styles/              # Global styles
│       └── globals.css      # Tailwind and custom CSS
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind configuration
└── next.config.js           # Next.js configuration
```

## 📊 Features

### Dashboard Home
- Quick stats overview (projects, resources, repos, learning XP)
- Active projects showcase
- Tech stack snapshot
- Learning progress widget
- Quick action cards

### Projects Portfolio
- Filter by status (active, maintenance, archived)
- Filter by type (web, mobile, backend, blockchain, ai)
- Project cards with tech stack
- Repository links

### Azure Resources
- Subscription management
- Resource inventory table
- Quick links to Azure Portal, Cloud Shell, and documentation

### GitHub Integration
- Repository list with stats
- Contribution overview
- Language breakdown
- Quick access to profile and settings

### Tech Stack Inventory
- Technologies grouped by category
- Proficiency levels (expert, advanced, intermediate, beginner)
- Last used tracking
- Visual proficiency legend

### API Credentials
- Secure credential overview (no actual keys displayed)
- Rotation tracking with alerts
- Platform categorization
- Security best practices guide

### Learning Progress
- XP and level tracking
- Certifications showcase
- Recent activity timeline
- Recommended certifications
- Platform quick links

### Deployments
- Deployment status monitoring
- Environment tracking (production, staging, development)
- Platform overview (Vercel, Azure, Netlify)
- Deployment history
- Quick platform access

## 🔐 Security

This platform is designed with security in mind:

- **No Secrets Stored**: Actual API keys are never displayed or stored in the code
- **Environment Variables**: All sensitive data should use environment variables
- **Rotation Tracking**: Built-in credential rotation reminders
- **Best Practices**: Security guidelines included in the UI

## 🎨 Customization

The platform is fully customizable:

1. **Update Profile Data**: Edit `src/data/profile.ts` to reflect your current stack
2. **Add New Pages**: Create new pages in `src/pages/`
3. **Modify Styles**: Customize colors in `tailwind.config.js`
4. **Add Integrations**: Extend with real-time API integrations

## 🔗 Integration Opportunities

Future enhancements can include:

- Real-time Azure Resource Manager API integration
- Live GitHub API data fetching
- Microsoft Learn API integration
- Vercel/Netlify deployment webhooks
- Real-time deployment status updates
- Analytics and usage tracking

## 📝 Development Notes

### Adding New Pages

1. Create a new file in `src/pages/`
2. Add the route to sidebar navigation in `src/components/Sidebar.tsx`
3. Follow the existing layout pattern using the `Layout` component

### Updating Data

Static data is stored in `src/data/profile.ts`. For live data, implement API routes in `src/pages/api/` and fetch from components.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

Personal project - All rights reserved

---

**Built with ❤️ for efficient developer resource management**
