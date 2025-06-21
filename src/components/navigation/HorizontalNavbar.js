import React, { useState, useRef, useEffect } from 'react';
import { 
  FaCode, 
  FaChevronDown, 
  FaBars, 
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaDownload
} from 'react-icons/fa';

const HorizontalNavbar = ({ navigationItems, activeDropdown, setActiveDropdown, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleMobileNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  const handleMobileDropdownItemClick = (e, href) => {
    e.preventDefault();
    setActiveDropdown(null);
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50 transition-all duration-500 animate-in fade-in slide-in-from-top-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <FaCode className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
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
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
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
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    <item.icon className="text-sm" />
                    <span>{item.name}</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
              <FaDownload className="text-sm" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(`mobile-${item.name}`)}
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="text-sm" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <FaChevronDown 
                          className={`text-xs transition-transform duration-200 ${
                            activeDropdown === `mobile-${item.name}` ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {activeDropdown === `mobile-${item.name}` && (
                        <div className="pl-8 pt-2 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                              onClick={(e) => handleMobileDropdownItemClick(e, dropdownItem.href)}
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
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      onClick={(e) => handleMobileNavClick(e, item.href)}
                    >
                      <item.icon className="text-sm" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  )}
                </div>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md">
                  <FaDownload className="text-sm" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HorizontalNavbar;