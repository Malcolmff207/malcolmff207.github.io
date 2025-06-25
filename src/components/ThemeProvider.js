import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeProvider = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    // Add theme-related meta tags
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = theme === 'dark' ? '#1e293b' : '#ffffff';
      document.head.appendChild(meta);
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {children}
    </div>
  );
};

export default ThemeProvider;