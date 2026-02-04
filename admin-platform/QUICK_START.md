# M37 Personal Dev Admin Platform - Quick Start Guide

## 🚀 Getting Started

This platform is now ready to use! Follow these simple steps:

### 1. Navigate to the platform directory

```bash
cd admin-platform
```

### 2. Install dependencies (already done)

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The platform will be available at **http://localhost:3000**

### 4. Build for production

```bash
npm run build
npm start
```

## 📱 Platform Features

### Available Pages

1. **Dashboard (/)** - Overview of all your development resources
2. **/projects** - Complete portfolio of all your projects
3. **/azure** - Azure subscriptions and resources
4. **/github** - GitHub repositories and activity
5. **/tech-stack** - Your complete technology inventory
6. **/credentials** - API credentials management dashboard
7. **/learning** - Microsoft Learn progress tracker
8. **/deployments** - Deployment monitoring across platforms

## 🎨 Customization

### Update Your Profile

Edit `src/data/profile.ts` to customize:
- Your personal information
- Project list
- Technology stack
- API credentials (display only)
- Learning progress
- Azure resources

### Add New Pages

1. Create a new file in `src/pages/`
2. Add navigation link in `src/components/Sidebar.tsx`
3. Follow the existing layout pattern

## 🔐 Security Notes

- This platform displays metadata about credentials, **NOT actual keys**
- Never commit actual API keys or secrets
- Use environment variables for sensitive data
- Rotate credentials regularly (platform tracks rotation dates)

## 🌐 Deployment Options

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy the 'out' directory
```

### Deploy to Azure Static Web Apps

Follow Azure's deployment guide for Next.js applications.

## 📊 Data Integration

The platform currently uses static data from `src/data/profile.ts`. 

For live data integration:

1. **Azure**: Use the Azure SDK (already included)
2. **GitHub**: Use Octokit REST API (already included)
3. **Microsoft Learn**: Use Microsoft Graph API

Create API routes in `src/pages/api/` for backend data fetching.

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** 18 - UI library

## 📝 Support

For issues or questions:
- Check the main README.md
- Review Next.js documentation
- Check component examples in the codebase

---

**Happy managing! 🎉**
