import React from 'react';
import { BsGithub, BsBoxArrowUpRight, BsClock, BsCheckCircle, BsStar } from 'react-icons/bs';

const ProjectCard = ({ project, index, onClick, hasIntersected }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <BsCheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <BsClock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-700 transform hover:-translate-y-2 cursor-pointer animate-in fade-in scale-in ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={onClick}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          <BsStar className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
          {getStatusIcon(project.status)}
          {getStatusText(project.status)}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20 dark:opacity-10">
              {project.category === 'web' && '🌐'}
              {project.category === 'mobile' && '📱'}
              {project.category === 'fullstack' && '💻'}
              {project.category === 'games' && '🎮'}
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Quick Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
              title="View Demo"
            >
              <BsBoxArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
              title="View Code"
            >
              <BsGithub className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium border border-purple-200 dark:border-purple-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors text-sm font-medium">
            View Details
          </button>
          {project.component ? (
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
              Live Demo
            </button>
          ) : (
            <button 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium opacity-60"
              title="Demo component not available"
              disabled
            >
              No Demo
            </button>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 dark:group-hover:border-purple-400/20 rounded-2xl transition-colors duration-300" />
    </div>
  );
};

export default ProjectCard;