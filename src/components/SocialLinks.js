import React, { useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter 
} from 'react-icons/fa';
import { useLoading } from '../hooks/useLoading';
import Skeleton from './Skeleton';

// Social Links Skeleton Component
const SocialLinksSkeleton = () => (
  <section className="bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
    <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            <Skeleton variant="circular" width="40px" height="40px" className="mr-3" />
            <Skeleton variant="text" width="200px" height="28px" />
          </div>
          <Skeleton variant="text" width="300px" className="mx-auto" />
        </div>
        
        <div className="flex justify-center items-center space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="rounded" width="48px" height="48px" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SocialLinks = () => {
  const { isLoading, stopLoading } = useLoading(500);
  
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/malcolmff",
      bgColor: "bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600",
      name: "GitHub"
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/",
      bgColor: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
      name: "LinkedIn"
    },
    {
      icon: FaFacebook,
      href: "https://facebook.com/malcolmfenech",
      bgColor: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500",
      name: "Facebook"
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/malcolmfenech",
      bgColor: "bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-500",
      name: "Instagram"
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/malcolmfenech",
      bgColor: "bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500",
      name: "Twitter"
    }
  ];

  const CodeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 600);
    
    return () => clearTimeout(timer);
  }, [stopLoading]);

  if (isLoading) {
    return <SocialLinksSkeleton />;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="text-center mb-6 animate-in fade-in slide-in-from-top duration-500 animation-delay-100">
            <div className="flex justify-center items-center mb-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 mr-3">
                <CodeIcon />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Connect Online</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Follow my journey and check out my projects
            </p>
          </div>
          
          <div className="flex justify-center items-center space-x-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl text-white transition-all duration-200 hover:scale-110 hover:shadow-md ${social.bgColor} animate-in fade-in scale-in`}
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  title={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;