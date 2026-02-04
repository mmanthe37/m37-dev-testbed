import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import ProjectCard from '@/components/ProjectCard';
import { developerProfile, projects, techStack, learningProgress, azureSubscriptions, azureResources } from '@/data/profile';

export default function Home() {
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const recentTechnologies = techStack.filter(t => t.lastUsed && new Date(t.lastUsed) > new Date('2026-02-01')).length;

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {developerProfile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-400">
            {developerProfile.title} • {developerProfile.location}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Projects"
            value={activeProjects}
            icon="🚀"
            trend="up"
            trendValue="+2 this month"
            color="#00C853"
          />
          <StatCard
            title="Azure Resources"
            value={azureResources.length}
            icon="☁️"
            trend="neutral"
            trendValue={`${azureSubscriptions.length} subscriptions`}
            color="#0078D4"
          />
          <StatCard
            title="GitHub Repos"
            value="12"
            icon="🐙"
            trend="up"
            trendValue="+3 this year"
            color="#6e5494"
          />
          <StatCard
            title="Learning XP"
            value={learningProgress.totalXp}
            icon="📚"
            trend="up"
            trendValue={`Level ${learningProgress.currentLevel}`}
            color="#FF4500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <a
            href="/projects"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-primary-600/20 to-purple-600/20 border-primary-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">View All Projects</h3>
                <p className="text-sm text-gray-400">Manage your development portfolio</p>
              </div>
              <span className="text-3xl">📊</span>
            </div>
          </a>

          <a
            href="/azure"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Azure Portal</h3>
                <p className="text-sm text-gray-400">Manage cloud resources</p>
              </div>
              <span className="text-3xl">☁️</span>
            </div>
          </a>

          <a
            href="/credentials"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">API Credentials</h3>
                <p className="text-sm text-gray-400">Secure credential management</p>
              </div>
              <span className="text-3xl">🔐</span>
            </div>
          </a>
        </div>

        {/* Active Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter(p => p.status === 'active')
              .slice(0, 4)
              .map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tech Stack Overview */}
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack Snapshot</h3>
            <div className="space-y-3">
              {techStack
                .filter(t => t.proficiency === 'expert' || t.proficiency === 'advanced')
                .slice(0, 6)
                .map(tech => (
                  <div key={tech.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      <span className="text-white font-medium">{tech.name}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      {tech.proficiency}
                    </span>
                  </div>
                ))}
            </div>
            <a href="/tech-stack" className="text-primary-400 hover:text-primary-300 text-sm font-medium mt-4 block">
              View Full Stack →
            </a>
          </div>

          {/* Learning Progress */}
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">Learning Progress</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Level {learningProgress.currentLevel}</span>
                <span className="text-primary-400">{learningProgress.totalXp} XP</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-purple-600 h-2 rounded-full"
                  style={{ width: '28%' }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-semibold text-gray-300">Recent Completions:</h4>
              {learningProgress.recentActivity.slice(0, 3).map((activity, idx) => (
                <div key={idx} className="text-sm text-gray-400">
                  <span className="text-green-500 mr-2">✓</span>
                  {activity.title}
                </div>
              ))}
            </div>

            <a href="/learning" className="text-primary-400 hover:text-primary-300 text-sm font-medium block">
              View Learning Dashboard →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
