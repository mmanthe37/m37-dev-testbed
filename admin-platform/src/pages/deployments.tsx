import React from 'react';
import Layout from '@/components/Layout';

const deployments = [
  {
    id: 1,
    name: 'OmniSphere Platform',
    environment: 'production',
    status: 'healthy',
    url: 'https://omnisphere.vercel.app',
    platform: 'Vercel',
    lastDeployed: '2026-02-03T14:30:00Z',
    commit: 'a1b2c3d',
  },
  {
    id: 2,
    name: 'Gear AI API',
    environment: 'production',
    status: 'healthy',
    url: 'https://api.gearai.app',
    platform: 'Azure App Service',
    lastDeployed: '2026-02-02T10:15:00Z',
    commit: 'e4f5g6h',
  },
  {
    id: 3,
    name: 'Dev Testbed',
    environment: 'staging',
    status: 'deploying',
    url: 'https://staging.m37-testbed.dev',
    platform: 'Netlify',
    lastDeployed: '2026-02-04T21:45:00Z',
    commit: 'i7j8k9l',
  },
];

export default function Deployments() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'deploying':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '✓';
      case 'deploying':
        return '⟳';
      case 'failed':
        return '✗';
      default:
        return '?';
    }
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'production':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'staging':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'development':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Deployments</h1>
          <p className="text-gray-400">
            Monitor your application deployments across all platforms
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <p className="text-gray-400 text-sm">Total Deployments</p>
            <p className="text-3xl font-bold text-white mt-2">{deployments.length}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Healthy</p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {deployments.filter(d => d.status === 'healthy').length}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Deploying</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {deployments.filter(d => d.status === 'deploying').length}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">This Month</p>
            <p className="text-3xl font-bold text-primary-500 mt-2">12</p>
          </div>
        </div>

        {/* Deployments List */}
        <div className="space-y-4 mb-8">
          {deployments.map(deployment => (
            <div key={deployment.id} className="card hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{deployment.name}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded border flex items-center ${getStatusColor(deployment.status)}`}>
                      <span className="mr-1">{getStatusIcon(deployment.status)}</span>
                      {deployment.status}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded border ${getEnvironmentColor(deployment.environment)}`}>
                      {deployment.environment}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <span className="mr-2">🌐</span>
                      <a
                        href={deployment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300"
                      >
                        {deployment.url}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">☁️</span>
                      {deployment.platform}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📦</span>
                      {deployment.commit}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🕐</span>
                      {new Date(deployment.lastDeployed).toLocaleString()}
                    </div>
                  </div>
                </div>

                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-medium transition">
                  View Logs
                </button>
              </div>

              {deployment.status === 'deploying' && (
                <div className="mt-4 pt-4 border-t border-[#1e293b]">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Deployment in progress...</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Deployment Platforms */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Deployment Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="card hover-lift cursor-pointer bg-gradient-to-br from-black/40 to-black/20 border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Vercel</h3>
                  <p className="text-sm text-gray-400">Frontend deployments</p>
                </div>
                <span className="text-3xl">▲</span>
              </div>
            </a>

            <a
              href="https://portal.azure.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card hover-lift cursor-pointer bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Azure</h3>
                  <p className="text-sm text-gray-400">Cloud services</p>
                </div>
                <span className="text-3xl">☁️</span>
              </div>
            </a>

            <a
              href="https://app.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card hover-lift cursor-pointer bg-gradient-to-br from-teal-600/20 to-green-600/20 border-teal-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Netlify</h3>
                  <p className="text-sm text-gray-400">Static sites</p>
                </div>
                <span className="text-3xl">🌐</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
