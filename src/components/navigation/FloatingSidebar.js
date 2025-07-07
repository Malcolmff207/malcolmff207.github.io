import React, { useState, useRef, useEffect } from 'react';
import { 
  FaCode, 
  FaChevronDown, 
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaLinkedin,
  FaDownload
} from 'react-icons/fa';
import CVModal from '../CVModal';
import ThemeToggle from '../ThemeToggle';

const FloatingSidebar = ({ navigationItems, activeDropdown, setActiveDropdown, onNavigate }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setActiveDropdown]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  const handleDropdownItemClick = (e, href) => {
    e.preventDefault();
    setActiveDropdown(null); // Close dropdown
    if (onNavigate) {
      onNavigate(href);
    }
  };

  const handleDownloadResume = () => {
    setIsCVModalOpen(true);
  };

  return (
    <>
      <div className={`fixed left-4 top-4 bottom-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl dark:shadow-gray-900/70 border border-gray-200 dark:border-gray-700 z-50 transition-all duration-700 ease-out rounded-2xl flex flex-col animate-in fade-in slide-in-from-left-8 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center space-x-2 flex-1">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg">
              <FaCode className="text-white text-sm" />
            </div>
            {!isSidebarCollapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-in fade-in slide-in-from-left-4 duration-300 delay-200">
                Portfolio
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="py-4 space-y-1 flex-1 overflow-y-auto" ref={dropdownRef}>
          {navigationItems.map((item, index) => (
            <div key={item.name} className="px-2">
              {item.dropdown ? (
                <div>
                  <button
                    onClick={(e) => {
                      if (!isSidebarCollapsed) {
                        toggleDropdown(`sidebar-${item.name}`);
                      } else {
                        handleNavClick(e, item.href);
                      }
                    }}
                    className={`flex items-center w-full px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 rounded-xl group animate-in fade-in slide-in-from-left-4 ${
                      isSidebarCollapsed ? 'justify-center' : 'justify-between'
                    }`}
                    style={{animationDelay: `${(index + 1) * 100}ms`}}
                    title={isSidebarCollapsed ? item.name : ''}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="text-lg group-hover:scale-110 transition-transform duration-200" />
                      {!isSidebarCollapsed && (
                        <span className="font-medium animate-in fade-in slide-in-from-left-2 duration-300" style={{animationDelay: `${(index + 2) * 100}ms`}}>
                          {item.name}
                        </span>
                      )}
                    </div>
                    {!isSidebarCollapsed && (
                      <FaChevronDown 
                        className={`text-xs transition-all duration-200 ${
                          activeDropdown === `sidebar-${item.name}` ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </button>
                  
                  {!isSidebarCollapsed && activeDropdown === `sidebar-${item.name}` && (
                    <div className="ml-4 mt-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150 text-sm rounded-lg"
                          onClick={(e) => handleDropdownItemClick(e, dropdownItem.href)}
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 rounded-xl group animate-in fade-in slide-in-from-left-4 ${
                    isSidebarCollapsed ? 'justify-center' : ''
                  }`}
                  style={{animationDelay: `${(index + 1) * 100}ms`}}
                  title={isSidebarCollapsed ? item.name : ''}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <item.icon className="text-lg group-hover:scale-110 transition-transform duration-200" />
                  {!isSidebarCollapsed && (
                    <span className="font-medium animate-in fade-in slide-in-from-left-2 duration-300" style={{animationDelay: `${(index + 2) * 100}ms`}}>
                      {item.name}
                    </span>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Action Buttons - Fixed at Bottom */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 rounded-b-2xl shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          {isSidebarCollapsed ? (
            <div className="space-y-2">
              <ThemeToggle />
              <a
                href="https://github.com/Malcolmff207"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-105"
                title="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-105"
                title="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <button 
                onClick={handleDownloadResume}
                className="w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 hover:scale-105 flex items-center justify-center"
                title="View Resume"
              >
                <FaDownload className="text-lg" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-center space-x-4">
                <ThemeToggle />
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-105"
                  title="GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-105"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
              <button 
                onClick={handleDownloadResume}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 font-medium text-sm hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-400 delay-400"
              >
                <FaDownload className="text-sm" />
                <span>Resume</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expand/Collapse Button - Outside Sidebar */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className={`fixed top-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 z-50 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-left-4 delay-500 ${
          isSidebarCollapsed ? 'left-24' : 'left-72'
        }`}
      >
        {isSidebarCollapsed ? <FaChevronRight className="text-sm" /> : <FaChevronLeft className="text-sm" />}
      </button>

      {/* Content Overlay for Sidebar - Mobile Only */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* CV Modal */}
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </>
  );
};

export default FloatingSidebar;