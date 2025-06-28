import React, { useState, useEffect } from 'react';
import { BsX, BsGithub, BsBoxArrowUpRight, BsCode } from 'react-icons/bs';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && project) {
      setIsLoaded(false);
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-full p-4">
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Interactive Demo
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <BsGithub className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <BsBoxArrowUpRight className="w-4 h-4" />
                  Live Site
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <BsX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Demo Content */}
          <div className="p-6">
            {project.component ? (
              <div className="relative">
                {/* Loading State */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-400">Loading demo...</p>
                    </div>
                  </div>
                )}
                
                {/* Component Demo - Full Display */}
                <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <project.component />
                </div>
              </div>
            ) : (
              /* No Demo Available */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <BsCode className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Demo Not Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  {project.description}
                </p>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.technologies?.slice(0, 5).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Info Footer */}
          {project.component && (
            <div className="px-6 pb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 4 && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;