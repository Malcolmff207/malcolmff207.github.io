import React, { useState, useEffect } from 'react';
import { BsGrid3X3Gap, BsCode, BsLaptop, BsPhone, BsGlobe, BsSearch, BsFilter } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaMobile, FaPython, FaGamepad } from 'react-icons/fa';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useDebouncedSearch } from '../hooks/useDebounce';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { ProjectsPageSkeleton } from '../components/skeletons';

// Sample project components (you can replace these with actual project components)
// For now, we'll create simple fallback components if the actual ones don't exist
const TodoApp = () => (
  <div className="p-6 text-center">
    <h3 className="text-lg font-semibold mb-2">Todo App Demo</h3>
    <p className="text-gray-600 dark:text-gray-400">This is a placeholder for the Todo App component.</p>
    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Create the actual component in src/components/projects/TodoApp.js</p>
  </div>
);

const WeatherApp = () => (
  <div className="p-6 text-center">
    <h3 className="text-lg font-semibold mb-2">Weather App Demo</h3>
    <p className="text-gray-600 dark:text-gray-400">This is a placeholder for the Weather App component.</p>
    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Create the actual component in src/components/projects/WeatherApp.js</p>
  </div>
);

const PortfolioShowcase = () => (
  <div className="p-6 text-center">
    <h3 className="text-lg font-semibold mb-2">Portfolio Showcase Demo</h3>
    <p className="text-gray-600 dark:text-gray-400">This is a placeholder for the Portfolio Showcase component.</p>
    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Create the actual component in src/components/projects/PortfolioShowcase.js</p>
  </div>
);

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasIntersected, setHasIntersected] = useState(false); // Add local state

  // Debounced search
  const { debouncedTerm: debouncedSearchTerm, isSearching } = useDebouncedSearch(searchTerm, 300, 1);

  // Intersection observer for animations - modified to use local state
  const { ref: projectsRef, hasIntersected: observerIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  // Update local hasIntersected state when observer intersects OR when loading finishes
  useEffect(() => {
    if (observerIntersected || !isLoading) {
      setHasIntersected(true);
    }
  }, [observerIntersected, isLoading]);

  // Project categories configuration
  const projectCategories = {
    all: {
      title: "All",
      fullTitle: "All Projects",
      icon: BsGrid3X3Gap,
      color: "gray"
    },
    web: {
      title: "Web",
      fullTitle: "Web Applications",
      icon: BsGlobe,
      color: "blue"
    },
    mobile: {
      title: "Mobile",
      fullTitle: "Mobile Applications",
      icon: BsPhone,
      color: "green"
    },
    fullstack: {
      title: "Full Stack",
      fullTitle: "Full Stack Applications",
      icon: BsLaptop,
      color: "purple"
    },
    games: {
      title: "Games",
      fullTitle: "Game Development",
      icon: FaGamepad,
      color: "orange"
    }
  };

  // Sample projects data (replace with your actual projects)
  const projectsData = {
    web: [
      {
        id: 'todo-app',
        title: 'Interactive Todo Application',
        description: 'A modern, responsive todo application with drag-and-drop functionality, local storage, and beautiful animations.',
        image: '/api/placeholder/400/250',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        category: 'web',
        status: 'completed',
        demoUrl: 'https://example.com/todo',
        githubUrl: 'https://github.com/example/todo',
        featured: true,
        component: TodoApp,
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
        category: 'web',
        status: 'completed',
        demoUrl: 'https://example.com/weather',
        githubUrl: 'https://github.com/example/weather',
        featured: false,
        component: WeatherApp,
        highlights: [
          'Real-time weather data',
          '7-day forecast',
          'Interactive charts',
          'Location-based results'
        ]
      }
    ],
    fullstack: [
      {
        id: 'portfolio-site',
        title: 'Portfolio Website',
        description: 'This very portfolio website built with React, featuring dark mode, animations, and responsive design.',
        image: '/api/placeholder/400/250',
        technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
        category: 'fullstack',
        status: 'completed',
        demoUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/portfolio',
        featured: true,
        component: PortfolioShowcase,
        highlights: [
          'Responsive design',
          'Dark mode support',
          'Smooth animations',
          'SEO optimized'
        ]
      }
    ],
    mobile: [
      {
        id: 'mobile-fitness',
        title: 'Fitness Tracker App',
        description: 'A React Native fitness tracking application with workout logging and progress visualization.',
        image: '/api/placeholder/400/250',
        technologies: ['React Native', 'Firebase', 'AsyncStorage', 'Victory Charts'],
        category: 'mobile',
        status: 'in-progress',
        demoUrl: null,
        githubUrl: 'https://github.com/example/fitness',
        featured: false,
        component: null,
        highlights: [
          'Workout tracking',
          'Progress charts',
          'Social sharing',
          'Offline support'
        ]
      }
    ],
    games: [
      {
        id: 'unity-puzzle',
        title: '3D Puzzle Game',
        description: 'A Unity-based 3D puzzle game with physics-based mechanics and immersive environments.',
        image: '/api/placeholder/400/250',
        technologies: ['Unity', 'C#', 'Blender', '3D Modeling'],
        category: 'games',
        status: 'completed',
        demoUrl: 'https://example.com/puzzle',
        githubUrl: 'https://github.com/example/puzzle',
        featured: false,
        component: null,
        highlights: [
          'Physics-based puzzles',
          '3D environments',
          'Sound design',
          'Multiple levels'
        ]
      }
    ]
  };

  // Listen for navigation filter events
  useEffect(() => {
    const handleFilterEvent = (event) => {
      const { filter } = event.detail;
      if (projectCategories[filter]) {
        setActiveFilter(filter);
      }
    };

    window.addEventListener('setProjectFilter', handleFilterEvent);
    return () => window.removeEventListener('setProjectFilter', handleFilterEvent);
  }, []);

  // Simple loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Get all projects
  const getAllProjects = () => {
    const allProjects = [];
    Object.values(projectsData).forEach(categoryProjects => {
      allProjects.push(...categoryProjects);
    });
    return allProjects;
  };

  // Filter projects based on active filter and search
  const getFilteredProjects = () => {
    let projects = [];
    
    if (activeFilter === 'all') {
      projects = getAllProjects();
    } else {
      projects = projectsData[activeFilter] || [];
    }

    // Apply search filter
    if (debouncedSearchTerm) {
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      );
    }

    return projects;
  };

  const filteredProjects = getFilteredProjects();
  const categories = Object.keys(projectCategories);

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

  // Show skeleton loading
  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading projects">
        <span className="sr-only">Loading projects, please wait...</span>
        <ProjectsPageSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="min-h-screen max-w-6xl mx-auto p-6 lg:ml-24" ref={projectsRef}>
        
        {/* Header Section */}
        <div className="text-center mb-12 stagger-children">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl mb-6 scale-in">
            <BsCode className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            My Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my development work, from web applications to mobile apps and games. 
            Click on any project to see it in action.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in slide-in-from-top duration-500 animation-delay-200">
          {categories.map((category) => {
            const categoryData = projectCategories[category];
            const CategoryIcon = categoryData.icon;
            const isActive = activeFilter === category;
            
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive 
                    ? `bg-${categoryData.color}-500 text-white shadow-lg scale-105` 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <CategoryIcon className="w-4 h-4" />
                <span className="text-sm">{categoryData.title}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 animate-in fade-in slide-in-from-top duration-500 animation-delay-300">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BsSearch className={`h-4 w-4 text-gray-400 dark:text-gray-500 ${isSearching ? 'animate-pulse' : ''}`} />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            )}
          </div>
          {(searchTerm || isSearching) && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 animate-in fade-in">
              {isSearching ? 'Searching...' : `Found ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} matching "${debouncedSearchTerm}"`}
            </p>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-500 animation-delay-400">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project)}
              hasIntersected={hasIntersected} // Use local state instead of observer state
            />
          ))}
        </div>

        {/* No Projects Found */}
        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-16 animate-in fade-in scale-in duration-500">
            <BsFilter className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm 
                ? `No projects match your search for "${debouncedSearchTerm}"`
                : `No projects in the ${projectCategories[activeFilter].fullTitle} category`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}
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