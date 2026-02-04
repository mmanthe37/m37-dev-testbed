import React from 'react';
import Layout from '@/components/Layout';
import { techStack } from '@/data/profile';

export default function TechStack() {
  const categories = Array.from(new Set(techStack.map(t => t.category)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'language': return '💻';
      case 'framework': return '🏗️';
      case 'platform': return '☁️';
      case 'service': return '⚡';
      case 'tool': return '🛠️';
      default: return '📦';
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'expert': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'advanced': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'beginner': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tech Stack</h1>
          <p className="text-gray-400">
            Technologies, frameworks, and tools in your arsenal
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {categories.map(category => (
            <div key={category} className="card">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                <p className="text-gray-400 text-sm capitalize">{category}s</p>
              </div>
              <p className="text-2xl font-bold text-white">
                {techStack.filter(t => t.category === category).length}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack by Category */}
        {categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">{getCategoryIcon(category)}</span>
              <span className="capitalize">{category}s</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack
                .filter(t => t.category === category)
                .map(tech => (
                  <div key={tech.name} className="card hover-lift">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getProficiencyColor(tech.proficiency)}`}>
                        {tech.proficiency}
                      </span>
                    </div>
                    {tech.lastUsed && (
                      <p className="text-sm text-gray-400">
                        Last used: {new Date(tech.lastUsed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Proficiency Legend */}
        <div className="card mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Proficiency Levels</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-gray-400">Expert - Can architect and teach</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="text-gray-400">Advanced - Production ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span className="text-gray-400">Intermediate - Comfortable usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gray-500"></div>
              <span className="text-gray-400">Beginner - Learning phase</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
