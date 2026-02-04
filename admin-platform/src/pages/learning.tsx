import React from 'react';
import Layout from '@/components/Layout';
import { learningProgress } from '@/data/profile';

export default function Learning() {
  const xpToNextLevel = 1300; // From profile data
  const progressPercentage = (learningProgress.totalXp / (learningProgress.totalXp + xpToNextLevel)) * 100;

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Learning Progress</h1>
          <p className="text-gray-400">
            Track your continuous learning journey across platforms
          </p>
        </div>

        {/* Level Progress */}
        <div className="card mb-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Level {learningProgress.currentLevel}
              </h2>
              <p className="text-gray-300">
                {learningProgress.totalXp} XP earned • {xpToNextLevel} XP to Level {learningProgress.currentLevel + 1}
              </p>
            </div>
            <div className="text-6xl">🎯</div>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300">{Math.round(progressPercentage)}% to next level</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <p className="text-gray-400 text-sm">Modules Completed</p>
            <p className="text-3xl font-bold text-white mt-2">{learningProgress.completedModules}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Certifications</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{learningProgress.certifications.length}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Recent Activities</p>
            <p className="text-3xl font-bold text-primary-500 mt-2">{learningProgress.recentActivity.length}</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningProgress.certifications.map(cert => (
              <div key={cert.id} className="card hover-lift">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                    {cert.dateEarned && (
                      <p className="text-xs text-gray-500 mt-2">
                        Earned: {new Date(cert.dateEarned).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <span className="text-3xl">🏆</span>
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            ))}

            {/* Suggested Certifications */}
            <div className="card bg-primary-500/10 border-primary-500/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Azure Developer Associate</h3>
                  <p className="text-sm text-gray-400">Microsoft</p>
                  <span className="inline-block px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs font-medium border border-yellow-500/20 mt-2">
                    Recommended
                  </span>
                </div>
                <span className="text-3xl">🎓</span>
              </div>
              <a
                href="https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                Start Learning →
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Learning Activity</h2>
          <div className="card">
            <div className="space-y-4">
              {learningProgress.recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 pb-4 border-b border-[#1e293b] last:border-0 last:pb-0"
                >
                  <span className="text-green-500 text-xl mt-1">✓</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs px-2 py-1 bg-primary-500/10 text-primary-400 rounded border border-primary-500/20">
                        {activity.type}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(activity.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Platforms */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Learning Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://learn.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card hover-lift cursor-pointer bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Microsoft Learn</h3>
                  <p className="text-sm text-gray-400">Azure & GitHub</p>
                </div>
                <span className="text-3xl">📘</span>
              </div>
            </a>

            <a
              href="https://github.com/collections"
              target="_blank"
              rel="noopener noreferrer"
              className="card hover-lift cursor-pointer bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">GitHub Learning</h3>
                  <p className="text-sm text-gray-400">Labs & Skills</p>
                </div>
                <span className="text-3xl">🐙</span>
              </div>
            </a>

            <a
              href="https://developer.apple.com/tutorials"
              target="_blank"
              rel="noopener noreferrer"
              className="card hover-lift cursor-pointer bg-gradient-to-br from-gray-600/20 to-gray-800/20 border-gray-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Apple Developer</h3>
                  <p className="text-sm text-gray-400">Swift & iOS</p>
                </div>
                <span className="text-3xl">🍎</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
