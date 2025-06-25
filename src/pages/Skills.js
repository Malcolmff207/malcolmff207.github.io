import React, { useState, useRef, useEffect } from 'react';
import { BsCode, BsLaptop, BsTools, BsPalette, BsGear, BsServer, BsDatabase, BsPhone, BsGearFill, BsChevronDown, BsChevronRight, BsSearch, BsGrid3X3Gap } from 'react-icons/bs';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useAnimatedProgress } from '../hooks/useAnimatedProgress';
import { useDebouncedSearch } from '../hooks/useDebounce';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState(null);
  const [expandedSkills, setExpandedSkills] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  
  // Replace search logic with debounced hook
  const { debouncedTerm: debouncedSearchTerm, isSearching } = useDebouncedSearch(searchTerm, 300, 1);
  
  // Replace manual intersection observer with hook
  const { ref: skillsRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Refs for tab positioning
  const tabContainerRef = useRef(null);
  const tabRefs = useRef([]);
  
  // Define available columns with default widths (without description)
  const availableColumns = [
    { id: 'technology', label: 'Technology', minWidth: 100, maxWidth: 400 },
    { id: 'level', label: 'Level', minWidth: 80, maxWidth: 200 },
    { id: 'progress', label: 'Progress', minWidth: 120, maxWidth: 300 },
    { id: 'proficiency', label: 'Proficiency', minWidth: 80, maxWidth: 150 }
  ];
  
  // Column width state (pixels) - removed description column
  const [columnWidths, setColumnWidths] = useState({
    technology: 220,
    level: 120,
    progress: 200,
    proficiency: 120
  });

  const skillTabs = {
    all: {
      title: "All",
      fullTitle: "All Skills",
      icon: BsGrid3X3Gap,
      color: "gray",
      skills: []
    },
    frontend: {
      title: "Frontend",
      fullTitle: "Frontend Development",
      icon: BsLaptop,
      color: "blue",
      skills: [
        { name: "React", level: 90, description: "Component-based development, hooks, state management" },
        { name: "JavaScript", level: 85, description: "ES6+, async/await, DOM manipulation" },
        { name: "HTML/CSS", level: 92, description: "Semantic HTML, responsive design, animations" },
        { name: "Tailwind CSS", level: 88, description: "Utility-first CSS framework, custom components" },
        { name: "TypeScript", level: 75, description: "Type safety, interfaces, advanced types" },
        { name: "Next.js", level: 80, description: "Server-side rendering, routing, optimization" }
      ]
    },
    backend: {
      title: "Backend",
      fullTitle: "Backend Development",
      icon: BsServer,
      color: "green",
      skills: [
        { name: "Node.js", level: 82, description: "Server-side JavaScript, API development" },
        { name: "Python", level: 78, description: "Web development, automation, data processing" },
        { name: "C#", level: 70, description: "Object-oriented programming, .NET framework" },
        { name: "RESTful APIs", level: 85, description: "API design, HTTP methods, authentication" },
        { name: "Express.js", level: 80, description: "Web framework, middleware, routing" }
      ]
    },
    database: {
      title: "Database",
      fullTitle: "Database & Cloud",
      icon: BsDatabase,
      color: "purple",
      skills: [
        { name: "MongoDB", level: 75, description: "NoSQL database, aggregation, indexing" },
        { name: "MySQL", level: 72, description: "Relational database, queries, optimization" },
        { name: "Git", level: 88, description: "Version control, branching, collaboration" },
        { name: "Postman", level: 85, description: "API testing, documentation, automation" },
        { name: "AWS", level: 65, description: "Cloud services, deployment, scaling" }
      ]
    },
    design: {
      title: "Design",
      fullTitle: "Design & Creative",
      icon: BsPalette,
      color: "pink",
      skills: [
        { name: "UI/UX Design", level: 80, description: "User interface design, user experience principles" },
        { name: "Figma", level: 75, description: "Design prototyping, collaboration, components" },
        { name: "Blender", level: 70, description: "3D modeling, animation, rendering" },
        { name: "Unity", level: 78, description: "Game development, 3D programming, physics" },
        { name: "Photoshop", level: 68, description: "Image editing, digital art, design" }
      ]
    },
    mobile: {
      title: "Mobile",
      fullTitle: "Mobile & Game Dev",
      icon: BsPhone,
      color: "indigo",
      skills: [
        { name: "React Native", level: 72, description: "Cross-platform mobile development" },
        { name: "Unity 3D", level: 78, description: "Game development, C# scripting" },
        { name: "Mobile UI", level: 75, description: "Responsive design, touch interfaces" },
        { name: "Game Physics", level: 70, description: "Physics simulation, collision detection" }
      ]
    },
    tools: {
      title: "Tools",
      fullTitle: "Development Tools",
      icon: BsTools,
      color: "orange",
      skills: [
        { name: "VS Code", level: 92, description: "Code editor, extensions, debugging" },
        { name: "Webpack", level: 68, description: "Module bundling, optimization" },
        { name: "npm/yarn", level: 85, description: "Package management, scripts" },
        { name: "Chrome DevTools", level: 88, description: "Debugging, performance analysis" },
        { name: "Docker", level: 60, description: "Containerization, deployment" }
      ]
    }
  };

  // Define tabs array as constant to avoid reference errors
  const TABS = ['all', 'frontend', 'backend', 'database', 'design', 'mobile', 'tools'];

  const toggleSkillDescription = (skillName) => {
    setExpandedSkills(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  const handleMouseDown = (e, columnId) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingColumn(columnId);
    
    const startX = e.clientX;
    const startWidth = columnWidths[columnId];
    
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newWidth = startWidth + deltaX;
      const column = availableColumns.find(col => col.id === columnId);
      
      // Clamp to min/max bounds
      const clampedWidth = Math.max(column.minWidth, Math.min(column.maxWidth, newWidth));
      
      setColumnWidths(prev => ({
        ...prev,
        [columnId]: clampedWidth
      }));
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resetColumnWidths = () => {
    setColumnWidths({
      technology: 220,
      level: 120,
      progress: 200,
      proficiency: 120
    });
  };

  const getSkillColor = (level) => {
    if (level >= 85) return 'bg-green-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 65) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getSkillLabel = (level) => {
    if (level >= 85) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 65) return 'Intermediate';
    return 'Beginner';
  };

  // Get all skills for "All" tab - SIMPLIFIED
  const getAllSkills = () => {
    const allSkills = [];
    
    // Manually add skills from each category
    allSkills.push(...skillTabs.frontend.skills.map(s => ({...s, category: 'frontend'})));
    allSkills.push(...skillTabs.backend.skills.map(s => ({...s, category: 'backend'})));
    allSkills.push(...skillTabs.database.skills.map(s => ({...s, category: 'database'})));
    allSkills.push(...skillTabs.design.skills.map(s => ({...s, category: 'design'})));
    allSkills.push(...skillTabs.mobile.skills.map(s => ({...s, category: 'mobile'})));
    allSkills.push(...skillTabs.tools.skills.map(s => ({...s, category: 'tools'})));
    
    return allSkills;
  };

  // Get current skills based on active tab and search - SIMPLIFIED
  const getCurrentSkills = () => {
    let skills = [];
    
    if (activeTab === 'all') {
      skills = getAllSkills();
    } else {
      skills = skillTabs[activeTab]?.skills || [];
    }
    
    if (debouncedSearchTerm) {
      skills = skills.filter(skill => 
        skill.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    
    return skills;
  };

  const currentTab = skillTabs[activeTab] || skillTabs.all;
  const currentSkills = getCurrentSkills();

  // Update underline position when active tab changes
  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeIndex = TABS.indexOf(activeTab);
      const activeTabElement = tabRefs.current[activeIndex];
      const containerElement = tabContainerRef.current;
      
      if (activeTabElement && containerElement) {
        const containerRect = containerElement.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        
        setUnderlineStyle({
          width: tabRect.width,
          left: tabRect.left - containerRect.left
        });
      }
    };

    // Update position immediately
    updateUnderlinePosition();
    
    // Update position on window resize
    const handleResize = () => updateUnderlinePosition();
    window.addEventListener('resize', handleResize);
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateUnderlinePosition, 50);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [activeTab]);

  // Progress Bar Component with animated hook
  const ProgressBar = ({ skill, progressColor }) => {
    const { currentValue } = useAnimatedProgress(
      hasIntersected ? skill.level : 0,
      1000,
      Math.random() * 200 // Random delay for staggered effect
    );

    return (
      <div className="w-full">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r from-${progressColor}-500 to-${progressColor}-600 transition-all duration-300`}
            style={{ width: `${currentValue}%` }}
          ></div>
        </div>
      </div>
    );
  };

 {/* Update renderCell function for dark mode */}
    const renderCell = (skill, columnId) => {
      const getProgressColor = () => {
        if (activeTab === 'all' && skill.category) {
          return skillTabs[skill.category]?.color || 'blue';
        }
        return currentTab.color;
      };

      switch (columnId) {
        case 'technology':
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSkillDescription(skill.name)}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Toggle description"
              >
                {expandedSkills[skill.name] ? (
                  <BsChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                ) : (
                  <BsChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              <span className="font-medium text-gray-900 dark:text-gray-100">{skill.name}</span>
            </div>
          );
        
        case 'level':
          return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getSkillColor(skill.level)}`}>
              {getSkillLabel(skill.level)}
            </span>
          );
        
        case 'progress':
          const progressColor = getProgressColor();
          return <ProgressBar skill={skill} progressColor={progressColor} />;
        
        case 'proficiency':
          return <span className="font-semibold text-gray-700 dark:text-gray-300">{skill.level}%</span>;
        
        default:
          return null;
      }
    };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="min-h-screen max-w-6xl mx-auto p-6 lg:ml-24" style={{ cursor: isResizing ? 'col-resize' : 'default' }} ref={skillsRef}>
        <style>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              max-height: 120px;
              transform: translateY(0);
            }
          }
          
          .animate-slideDown {
            animation: slideDown 0.6s ease-out forwards;
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="max-w-6xl mx-auto p-6 lg:ml-24" style={{ cursor: isResizing ? 'col-resize' : 'default' }} ref={skillsRef}>
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl mb-6">
              <BsCode className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Skills & Technologies</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills, tools, and technologies I work with. 
              From frontend frameworks to backend systems and creative tools.
            </p>
          </div>

        {/* Tab Navigation */}
        <div className="relative">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide" ref={tabContainerRef}>
            {TABS.map((tab, index) => {
              const TabIcon = skillTabs[tab].icon;
              const isActive = activeTab === tab;
              
              return (
                <button
                  key={tab}
                  ref={el => tabRefs.current[index] = el}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 min-w-fit ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  style={{ 
                    flex: `1 1 ${100 / TABS.length}%`,
                    minWidth: '100px'
                  }}
                >
                  <TabIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{skillTabs[tab].title}</span>
                </button>
              );
            })}
          </div>
          
          {/* Sliding Underline */}
          <div 
            className="absolute bottom-0 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${underlineStyle.width}px`,
              left: `${underlineStyle.left}px`
            }}
          ></div>
        </div>
      </div>

      {/* Search Bar */}
    <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden mt-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BsSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
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
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isSearching ? 'Searching...' : `Found ${currentSkills.length} skill${currentSkills.length !== 1 ? 's' : ''} matching "${debouncedSearchTerm}"`}
          </p>
        )}
      </div>
    </div>

      {/* Skills Table - Desktop */}
    <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-fixed" style={{ minWidth: Object.values(columnWidths).reduce((sum, width) => sum + width, 0) + 'px' }}>
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {availableColumns.map((column, index) => (
                <th
                  key={column.id}
                  className={`relative py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide ${
                    column.id === 'proficiency' || column.id === 'level' ? 'text-center' : 'text-left'
                  } ${isResizing ? 'select-none' : ''}`}
                  style={{ width: `${columnWidths[column.id]}px` }}
                >
                  {column.label}
                  {index < availableColumns.length - 1 && (
                    <div
                      className={`absolute top-0 right-0 w-px h-full cursor-col-resize bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors ${
                        resizingColumn === column.id ? 'bg-gray-500 dark:bg-gray-400' : ''
                      }`}
                      onMouseDown={(e) => handleMouseDown(e, column.id)}
                      title="Drag to resize column"
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentSkills.map((skill, index) => (
              <React.Fragment key={skill.name}>
                <tr
                  className={`border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                  } ${isResizing ? 'select-none' : ''}`}
                >
                  {availableColumns.map(column => (
                    <td
                      key={column.id}
                      className={`py-4 px-4 ${
                        column.id === 'proficiency' || column.id === 'level' ? 'text-center' : 'text-left'
                      } overflow-hidden`}
                      style={{ width: `${columnWidths[column.id]}px` }}
                    >
                      {renderCell(skill, column.id)}
                    </td>
                  ))}
                </tr>
                
                {/* Description Row */}
                {expandedSkills[skill.name] && (
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td 
                      colSpan={availableColumns.length} 
                      className="px-4 overflow-hidden"
                    >
                      <div className="animate-slideDown">
                        <div className="flex items-center gap-3 py-2">
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Description:
                          </span>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>

       {/* Skills Cards - Mobile */}
      <div className="md:hidden space-y-4 p-4">
        {currentSkills.map((skill, index) => {
          const getMobileProgressColor = () => {
            if (activeTab === 'all' && skill.category) {
              return skillTabs[skill.category]?.color || 'blue';
            }
            return currentTab.color;
          };
          
          const progressColor = getMobileProgressColor();
          
          return (
            <div key={skill.name} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSkillDescription(skill.name)}
                    className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Toggle description"
                  >
                    {expandedSkills[skill.name] ? (
                      <BsChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <BsChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{skill.name}</h3>
                </div>
                <span className="font-bold text-gray-700 dark:text-gray-300">{skill.level}%</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSkillColor(skill.level)}`}>
                  {getSkillLabel(skill.level)}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-3">
                <ProgressBar skill={skill} progressColor={progressColor} />
              </div>
              
              {expandedSkills[skill.name] && (
                <div className="animate-slideDown">
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {skill.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
</div>
  );
};

export default Skills;