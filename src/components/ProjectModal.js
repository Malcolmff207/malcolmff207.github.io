import React, { useState, useEffect } from 'react';
import { 
  BsX, 
  BsGithub, 
  BsBoxArrowUpRight, 
  BsCheckCircle, 
  BsClock, 
  BsCode,
  BsEye,
  BsInfoCircle,
  BsStar
} from 'react-icons/bs';
import Modal from './Modal';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('demo');
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && project) {
      setActiveTab(project.component ? 'demo' : 'details');
      setIsComponentLoaded(false);
      
      // Simulate component loading
      if (project.component) {
        const timer = setTimeout(() => {
          setIsComponentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, project]);

  if (!project) return null;

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
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const tabs = [
    ...(project.component ? [{ id: 'demo', label: 'Live Demo', icon: BsEye }] : []),
    { id: 'details', label: 'Project Details', icon: BsInfoCircle },
    { id: 'code', label: 'Technologies', icon: BsCode }
  ];

  const ComponentDemo = () => {
    if (!project.component) {
      return (
        <div className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <BsCode className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No live demo available</p>
          </div>
        </div>
      );
    }

    const Component = project.component;

    return (
      <div className="relative">
        {!isComponentLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading demo...</p>
            </div>
          </div>
        )}
        
        <div className={`transition-opacity duration-500 ${isComponentLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {project.title} - Live Demo
                </span>
              </div>
            </div>
            <div className="p-4 max-h-96 overflow-auto">
              <Component />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectDetails = () => (
    <div className="space-y-6">
      {/* Project Image */}
      {project.image && (
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Description */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          About This Project
        </h4>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Key Features
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <BsCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
          >
            <BsBoxArrowUpRight className="w-4 h-4" />
            View Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <BsGithub className="w-4 h-4" />
            View Source Code
          </a>
        )}
      </div>
    </div>
  );

  const TechnologiesTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Technologies Used
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Development Stats */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Project Information
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Status</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(project.status)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Category</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium capitalize">
              {project.category}
            </span>
          </div>
          {project.featured && (
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <span className="text-yellow-700 dark:text-yellow-300">Featured Project</span>
              <BsStar className="w-4 h-4 text-yellow-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'demo':
        return <ComponentDemo />;
      case 'details':
        return <ProjectDetails />;
      case 'code':
        return <TechnologiesTab />;
      default:
        return <ProjectDetails />;
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="extra-large"
      showCloseButton={false}
    >
      <div className="flex flex-col h-full max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {project.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {project.category} • {getStatusText(project.status)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <BsX className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderTabContent()}
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;