import React from 'react';
import { 
  FaBars, 
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaDownload
} from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';

const MobileMenu = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  navigationItems, 
  onNavigate,
  onDownloadResume 
}) => {
  
  // Handle mobile navigation item click
  const handleMobileNavItemClick = (e, href) => {
    e.preventDefault();
    
    // Navigate immediately
    if (onNavigate) {
      onNavigate(href);
    }
    
    // Close menu
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed top-16 left-0 right-0 bottom-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 z-50 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="space-y-2">
                {/* Navigation Items */}
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                    onClick={(e) => handleMobileNavItemClick(e, item.href)}
                  >
                    <item.icon className="text-sm" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
                
                {/* Mobile Action Buttons */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  {/* Social Links and Theme Toggle */}
                  <div className="flex justify-center space-x-4">
                    <ThemeToggle />
                    <a
                      href="https://github.com/Malcolmff207"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  </div>
                  
                  {/* Download Resume Button */}
                  <button 
                    onClick={() => {
                      onDownloadResume();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 font-medium shadow-md"
                  >
                    <FaDownload className="text-sm" />
                    <span>Download Resume</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;