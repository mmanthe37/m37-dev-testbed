import React from 'react';
import Layout from '@/components/Layout';

const mockRepos = [
  {
    id: 1,
    name: 'm37-dev-testbed',
    fullName: 'mmanthe37/m37-dev-testbed',
    description: 'Personal development laboratory for experimenting with new technologies',
    language: 'TypeScript',
    stars: 2,
    forks: 0,
    private: false,
    updatedAt: '2026-02-04',
  },
  {
    id: 2,
    name: 'OmniSphere',
    fullName: 'mmanthe37/OmniSphere',
    description: 'All-in-one DeFi solution platform',
    language: 'JavaScript',
    stars: 5,
    forks: 1,
    private: false,
    updatedAt: '2026-02-03',
  },
  {
    id: 3,
    name: 'gear-ai-mobile',
    fullName: 'mmanthe37/gear-ai-mobile',
    description: 'Chat with your vehicle - AI-powered diagnostics',
    language: 'Swift',
    stars: 3,
    forks: 0,
    private: false,
    updatedAt: '2026-02-02',
  },
];

export default function GitHub() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">GitHub Profile</h1>
          <p className="text-gray-400">
            Your repositories, contributions, and activity
          </p>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <p className="text-gray-400 text-sm">Repositories</p>
            <p className="text-3xl font-bold text-white mt-2">12</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Total Stars</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">24</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Contributions</p>
            <p className="text-3xl font-bold text-green-500 mt-2">487</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Followers</p>
            <p className="text-3xl font-bold text-primary-500 mt-2">15</p>
          </div>
        </div>

        {/* Repositories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Repositories</h2>
          <div className="space-y-4">
            {mockRepos.map(repo => (
              <div key={repo.id} className="card hover-lift">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <a
                      href={`https://github.com/${repo.fullName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-primary-400 hover:text-primary-300"
                    >
                      {repo.name}
                    </a>
                    <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                  </div>
                  {!repo.private && (
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
                      Public
                    </span>
                  )}
                  {repo.private && (
                    <span className="px-3 py-1 bg-gray-500/10 text-gray-500 rounded-full text-xs font-medium border border-gray-500/20">
                      Private
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  {repo.language && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                      {repo.language}
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="mr-1">⭐</span>
                    {repo.stars}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">🔱</span>
                    {repo.forks}
                  </div>
                  <div>Updated {repo.updatedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="https://github.com/mmanthe37"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">View Profile</h3>
                <p className="text-sm text-gray-400">@mmanthe37</p>
              </div>
              <span className="text-3xl">🐙</span>
            </div>
          </a>

          <a
            href="https://github.com/mmanthe37?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">All Repositories</h3>
                <p className="text-sm text-gray-400">Browse all repos</p>
              </div>
              <span className="text-3xl">📚</span>
            </div>
          </a>

          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Access Tokens</h3>
                <p className="text-sm text-gray-400">Manage PATs</p>
              </div>
              <span className="text-3xl">🔑</span>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  );
}
