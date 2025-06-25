// components/Header.js - Updated with dark mode support
import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const Header = () => {
  const texts = [
    "Full-Stack Developer",
    "Front-End Specialist", 
    "React Enthusiast",
    "Problem Solver",
    "Digital Innovator"
  ];
  
  // Replace your existing typewriter logic with the hook
  const { currentText } = useTypewriter(texts, 100, 50, 2000);

  return (
    <header className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 dark:bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 dark:bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 dark:bg-indigo-600 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 dark:from-gray-100 dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Malcolm Fenech
            </h1>
            
            <div className="text-2xl md:text-3xl mb-6 h-12 flex items-center justify-center">
              <span className="text-blue-400 dark:text-blue-300">I'm a </span>
              <span className="text-white dark:text-gray-100 ml-2 font-semibold">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Passionate full-stack developer from Malta creating exceptional digital experiences 
              with modern technologies. Let's build something amazing together.
            </p>
          </div>
          
          {/* Tech Stack Preview */}
          <div className="mt-12">
            <p className="text-gray-400 dark:text-gray-500 mb-4 text-sm uppercase tracking-wider">Technologies I Work With</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['React.js', 'Next.js', 'Vue.js', 'Node.js', 'JavaScript', 'TypeScript', 'C#' , 'Tailwind', 'Bootstrap', 'AWS'].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full text-sm border border-white/20 dark:border-white/10 hover:bg-blue-500/20 dark:hover:bg-blue-600/20 hover:border-blue-400/40 dark:hover:border-blue-500/40 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;