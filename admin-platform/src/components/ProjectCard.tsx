import React from 'react';

interface ProjectCardProps {
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'archived';
  technologies: string[];
  description: string;
  repository?: string;
}

export default function ProjectCard({
  name,
  type,
  status,
  technologies,
  description,
  repository,
}: ProjectCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'maintenance':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'web': return '🌐';
      case 'mobile': return '📱';
      case 'backend': return '⚙️';
      case 'blockchain': return '⛓️';
      case 'ai': return '🤖';
      default: return '📦';
    }
  };

  return (
    <div className="card hover-lift">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getTypeIcon()}</span>
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded border ${getStatusColor()} mt-1`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-medium border border-primary-500/20"
          >
            {tech}
          </span>
        ))}
        {technologies.length > 5 && (
          <span className="px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-xs font-medium">
            +{technologies.length - 5} more
          </span>
        )}
      </div>

      {repository && (
        <a
          href={repository}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center"
        >
          View Repository →
        </a>
      )}
    </div>
  );
}
