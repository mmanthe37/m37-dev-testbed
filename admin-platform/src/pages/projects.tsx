import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/profile';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'active' | 'maintenance' | 'archived'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const statusMatch = filter === 'all' || project.status === filter;
    const typeMatch = typeFilter === 'all' || project.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const projectTypes = ['all', ...Array.from(new Set(projects.map(p => p.type)))];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Projects Portfolio</h1>
          <p className="text-gray-400">
            Manage and monitor all your development projects
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-[#131925] text-gray-400 hover:bg-[#1e293b]'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-[#131925] text-gray-400 hover:bg-[#1e293b]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('maintenance')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'maintenance'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-[#131925] text-gray-400 hover:bg-[#1e293b]'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'archived'
                  ? 'bg-gray-600 text-white'
                  : 'bg-[#131925] text-gray-400 hover:bg-[#1e293b]'
              }`}
            >
              Archived
            </button>
          </div>

          <div className="flex gap-2">
            {projectTypes.map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  typeFilter === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#131925] text-gray-400 hover:bg-[#1e293b]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="text-gray-400 text-sm">Total Projects</p>
            <p className="text-3xl font-bold text-white mt-2">{projects.length}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Active</p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {projects.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">In Maintenance</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {projects.filter(p => p.status === 'maintenance').length}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Archived</p>
            <p className="text-3xl font-bold text-gray-500 mt-2">
              {projects.filter(p => p.status === 'archived').length}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found with the selected filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
