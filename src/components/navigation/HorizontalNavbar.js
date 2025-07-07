import React, { useState, useRef, useEffect } from 'react';
import { 
  FaCode, 
  FaChevronDown, 
  FaGithub,
  FaLinkedin,
  FaDownload
} from 'react-icons/fa';
import CVModal from '../CVModal';
import ThemeToggle from '../ThemeToggle';
import MobileMenu from './MobileMenu';

const HorizontalNavbar = ({ navigationItems, activeDropdown, setActiveDropdown, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <nav className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 sticky top-0 z-50 transition-all duration-500 animate-in fade-in slide-in-from-top-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg">
                <FaCode className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                      >
                        <item.icon className="text-sm" />
                        <span>{item.name}</span>
                        <FaChevronDown 
                          className={`text-xs transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {item.dropdown.map((dropdownItem) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150"
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
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <item.icon className="text-sm" />
                      <span>{item.name}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <a
                href="https://github.com/Malcolmff207"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <button 
                onClick={handleDownloadResume}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <FaDownload className="text-sm" />
                <span>Resume</span>
              </button>
            </div>

            {/* Mobile Menu Component */}
            <MobileMenu
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              navigationItems={navigationItems}
              onNavigate={onNavigate}
              onDownloadResume={handleDownloadResume}
            />
          </div>
        </div>
      </nav>

      {/* CV Modal */}
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </>
  );
};

export default HorizontalNavbar;