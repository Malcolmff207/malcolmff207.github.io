import React, { useState } from 'react';
import { BsCode, BsPalette, BsLightbulb, BsHeart, BsEye, BsGithub, BsBoxArrowUpRight } from 'react-icons/bs';

const PortfolioShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: BsCode,
      title: 'Clean Code',
      description: 'Well-structured, maintainable code following best practices',
      color: 'blue'
    },
    {
      icon: BsPalette,
      title: 'Modern Design',
      description: 'Contemporary UI/UX with attention to detail and user experience',
      color: 'purple'
    },
    {
      icon: BsLightbulb,
      title: 'Innovation',
      description: 'Creative solutions and cutting-edge technologies',
      color: 'yellow'
    },
    {
      icon: BsHeart,
      title: 'Passion',
      description: 'Built with love and dedication to quality',
      color: 'red'
    }
  ];

  const technologies = [
    { name: 'React', level: 90, color: 'blue' },
    { name: 'JavaScript', level: 85, color: 'yellow' },
    { name: 'Tailwind CSS', level: 88, color: 'teal' },
    { name: 'Node.js', level: 75, color: 'green' },
    { name: 'Git', level: 82, color: 'orange' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
      purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
      yellow: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
      red: 'text-red-500 bg-red-50 dark:bg-red-900/20',
      teal: 'text-teal-500 bg-teal-50 dark:bg-teal-900/20',
      green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
      orange: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <BsCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Portfolio Website</h2>
            <p className="text-blue-100">Interactive React Application</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm hover:bg-white/30 transition-colors">
            <BsEye className="w-4 h-4" />
            Live Demo
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm hover:bg-white/30 transition-colors">
            <BsGithub className="w-4 h-4" />
            Source Code
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Key Features
        </h3>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            const isActive = activeFeature === index;
            
            return (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  isActive
                    ? `border-${feature.color}-500 ${getColorClasses(feature.color)}`
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <FeatureIcon className={`w-6 h-6 mb-2 ${isActive ? `text-${feature.color}-500` : 'text-gray-500'}`} />
                <div className={`font-medium text-sm ${isActive ? `text-${feature.color}-700 dark:text-${feature.color}-300` : 'text-gray-700 dark:text-gray-300'}`}>
                  {feature.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Description */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            {React.createElement(features[activeFeature].icon, {
              className: `w-5 h-5 text-${features[activeFeature].color}-500 mt-0.5`
            })}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {features[activeFeature].title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {features[activeFeature].description}
              </p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Technologies Used
        </h3>
        
        <div className="space-y-3">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">
                {tech.name}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`bg-${tech.color}-500 h-2 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${tech.level}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 w-8">
                {tech.level}%
              </div>
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Responsive</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">A+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Performance</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">∞</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Scalable</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Built with React & Tailwind CSS
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcase;