import React, { useState, useEffect } from 'react';
import { BsCode, BsBoxArrowUpRight } from 'react-icons/bs';
import ProjectModal from '../components/ProjectModal';
import Calculator from '../components/projects/Calculator';

// Simple project card component
const ProjectCard = ({ project, index, onClick }) => {
  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-in fade-in scale-in"
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          /* Fallback gradient background */
          <div className="w-full h-full bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 flex items-center justify-center">
            <BsCode className="text-white text-6xl opacity-50" />
          </div>
        )}
        
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />
        
        {/* Content that appears on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-200 text-sm mb-4 line-clamp-3">{project.description}</p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-md text-xs font-medium border border-white/30"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-md text-xs font-medium border border-white/30">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
            
            {/* Status and Demo Button */}
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.status === 'completed' 
                  ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
              }`}>
                {project.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
              
              <div className="flex items-center gap-2 text-sm font-medium">
                <BsBoxArrowUpRight className="w-4 h-4" />
                <span>View Demo</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample projects data
  const projects = [
    {
      id: 'ultimate-calculator',
      title: 'Ultimate Calculator Suite',
      description: 'A comprehensive calculator application featuring 13 different calculator types including basic arithmetic, scientific calculations, BMI, age calculator, unit converter, statistics, and number base conversions.',
      image: '/api/placeholder/400/250',
      technologies: [
        'React', 
        'JavaScript', 
        'Tailwind CSS', 
        'React Hooks', 
        'Mathematical Algorithms',
        'State Management',
        'Input Validation',
        'Responsive Design'
      ],
      status: 'completed',
      featured: true,
      component: Calculator,
      highlights: [
        '13 different calculator types in one app',
        'Scientific calculator with trigonometric functions',
        'Real-time calculations and conversions',
        'BMI, age, and calorie calculators',
        'Statistical analysis tools',
        'Number base converter (binary, hex, decimal)',
        'Time zone and date difference calculators',
        'Professional UI with dark mode support'
      ]
    },
    {
      id: 'todo-app',
      title: 'Interactive Todo Application',
      description: 'A modern, responsive todo application with drag-and-drop functionality, local storage, and beautiful animations.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      status: 'completed',
      featured: false,
      component: null,
      highlights: [
        'Drag and drop task reordering',
        'Local storage persistence',
        'Dark mode support',
        'Responsive design'
      ]
    },
    {
      id: 'weather-app',
      title: 'Weather Dashboard',
      description: 'A comprehensive weather application with real-time data, forecasts, and interactive maps.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
      status: 'completed',
      featured: false,
      component: null,
      highlights: [
        'Real-time weather data',
        '7-day forecast',
        'Interactive charts',
        'Location-based results'
      ]
    },
    {
      id: 'portfolio-site',
      title: 'Portfolio Website',
      description: 'This very portfolio website built with React, featuring dark mode, animations, and responsive design.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
      status: 'completed',
      featured: true,
      component: null,
      highlights: [
        'Responsive design',
        'Dark mode support',
        'Smooth animations',
        'SEO optimized'
      ]
    },
    {
      id: 'mobile-fitness',
      title: 'Fitness Tracker App',
      description: 'A React Native fitness tracking application with workout logging and progress visualization.',
      image: '/api/placeholder/400/250',
      technologies: ['React Native', 'Firebase', 'AsyncStorage', 'Victory Charts'],
      status: 'in-progress',
      featured: false,
      component: null,
      highlights: [
        'Workout tracking',
        'Progress charts',
        'Social sharing',
        'Offline support'
      ]
    },
    {
      id: 'unity-puzzle',
      title: '3D Puzzle Game',
      description: 'A Unity-based 3D puzzle game with physics-based mechanics and immersive environments.',
      image: '/api/placeholder/400/250',
      technologies: ['Unity', 'C#', 'Blender', '3D Modeling'],
      status: 'completed',
      featured: false,
      component: null,
      highlights: [
        'Physics-based puzzles',
        '3D environments',
        'Sound design',
        'Multiple levels'
      ]
    }
  ];

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle project card click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 lg:ml-24">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-64 bg-gradient-to-r from-purple-400 to-blue-500 rounded-3xl mb-8 animate-pulse" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4 w-64 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-96 animate-pulse" />
          </div>
          
          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="min-h-screen max-w-6xl mx-auto p-6 lg:ml-24">
        
        {/* Hero Section with Background */}
        <div className="relative text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          {/* Background Image/Gradient */}
          <div className="relative h-64 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <BsCode className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
              <p className="text-lg text-purple-100 max-w-2xl">
                A showcase of my development work. Hover over any project to see details, click to interact with live demos.
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-500 animation-delay-400">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-16" />
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectsPage;