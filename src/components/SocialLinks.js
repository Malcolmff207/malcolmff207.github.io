import React, { useEffect, useState } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter,
  FaEnvelope,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { useLoading } from '../hooks/useLoading';
import Skeleton from './Skeleton';

// Social Links Skeleton
const SocialLinksSkeleton = () => (
  <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Skeleton variant="text" width="300px" height="36px" className="mx-auto mb-4" />
        <Skeleton variant="text" width="500px" height="20px" className="mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <Skeleton variant="circular" width="60px" height="60px" />
              <div className="flex-1">
                <Skeleton variant="text" width="120px" height="20px" className="mb-2" />
                <Skeleton variant="text" width="80px" height="16px" className="mb-1" />
                <Skeleton variant="text" width="100px" height="14px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SocialLinks = () => {
  const { isLoading, stopLoading } = useLoading(600);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const socialPlatforms = [
    {
      name: 'GitHub',
      icon: FaGithub,
      href: "https://github.com/malcolmff",
      description: 'Code repositories & projects',
      stats: '25+ Repositories',
      color: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:from-gray-600 hover:to-gray-800',
      bgPattern: 'bg-gray-50 dark:bg-gray-800',
      textColor: 'text-gray-700 dark:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/",
      description: 'Professional network & experience',
      stats: 'Software Developer',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700',
      bgPattern: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      href: "https://facebook.com/malcolmfenech",
      description: 'Personal updates & connections',
      stats: 'Stay Connected',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-400 hover:to-blue-600',
      bgPattern: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: "https://instagram.com/malcolmfenech",
      description: 'Behind the scenes & lifestyle',
      stats: 'Photos & Stories',
      color: 'from-pink-500 via-red-500 to-yellow-500',
      hoverColor: 'hover:from-pink-400 hover:via-red-400 hover:to-yellow-400',
      bgPattern: 'bg-pink-50 dark:bg-pink-900/20',
      textColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: "https://twitter.com/malcolmfenech",
      description: 'Tech thoughts & quick updates',
      stats: 'Tech Discussions',
      color: 'from-sky-400 to-sky-600',
      hoverColor: 'hover:from-sky-300 hover:to-sky-500',
      bgPattern: 'bg-sky-50 dark:bg-sky-900/20',
      textColor: 'text-sky-600 dark:text-sky-400'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      href: "mailto:malcolmff207@gmail.com",
      description: 'Direct communication',
      stats: 'Let\'s talk!',
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:from-green-400 hover:to-green-600',
      bgPattern: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 700);
    
    return () => clearTimeout(timer);
  }, [stopLoading]);

  if (isLoading) {
    return <SocialLinksSkeleton />;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 dark:from-gray-900 dark:via-gray-800 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/networking-workspace.png" 
          alt="Professional networking and collaboration workspace"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient if image fails
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        {/* Fallback gradient background */}
        <div 
          className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-700 dark:via-purple-700 dark:to-cyan-700" 
          style={{display: 'none'}}
        ></div>
        
        {/* Color gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/70 dark:from-blue-700/85 dark:via-purple-700/75"></div>
        
        {/* Additional dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/30"></div>
      </div>
      
      <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Content */}
        <div className="text-center text-white pt-8 md:pt-16 mb-12 md:mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Follow my journey, view my work, and let's build something amazing together
          </p>
        </div>

        {/* Social Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8 md:pb-16 animate-in fade-in slide-in-from-bottom duration-700 animation-delay-400">
          {socialPlatforms.map((platform, index) => {
            const IconComponent = platform.icon;
            const isHovered = hoveredCard === platform.name;
            
            return (
              <a
                key={platform.name}
                href={platform.href}
                target={platform.name !== 'Email' ? "_blank" : undefined}
                rel={platform.name !== 'Email' ? "noopener noreferrer" : undefined}
                className={`group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700/50 hover:bg-white/95 dark:hover:bg-gray-800/95 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-in fade-in scale-in`}
                style={{ animationDelay: `${600 + (index * 100)}ms` }}
                onMouseEnter={() => setHoveredCard(platform.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                
                {/* Background gradient that appears on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 md:space-x-4 mb-3">
                    {/* Icon with gradient background */}
                    <div className={`relative p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${platform.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    
                    {/* Platform Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 truncate">
                        {platform.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-1">
                        {platform.description}
                      </p>
                      <p className={`text-xs font-medium ${platform.textColor}`}>
                        {platform.stats}
                      </p>
                    </div>
                    
                    {/* External link icon */}
                    <FaExternalLinkAlt className="w-3 h-3 md:w-4 md:h-4 text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" />
                  </div>
                  
                  {/* Interaction hint */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      Click to visit
                    </span>
                    
                    {/* Animated arrow */}
                    <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-all duration-300">
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                </div>
                
                {/* Hover border glow */}
                <div className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;