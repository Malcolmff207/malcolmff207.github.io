import React, { useEffect } from 'react';
import { useLoading } from '../hooks/useLoading';
import Skeleton from './Skeleton';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

// Call to Action Skeleton Component
const CallToActionSkeleton = () => (
  <section className="py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <Skeleton variant="text" width="400px" height="32px" className="mx-auto mb-4" />
        <Skeleton variant="text" width="600px" className="mx-auto mb-2" />
        <Skeleton variant="text" width="500px" className="mx-auto mb-6" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton variant="rounded" width="150px" height="48px" />
          <Skeleton variant="rounded" width="150px" height="48px" />
        </div>
      </div>
    </div>
  </section>
);

const CallToAction = ({ 
  content = {
    title: "Ready to Start My Career Journey?",
    description: "I'm passionate about creating clean, efficient code and eager to contribute to a dynamic development team. Whether you're looking for a junior developer, I'd love to connect!"
  },
  buttons = {
    email: {
      text: "Email Me",
      href: "/contact"
    },
    phone: {
      text: "Give Me a Call", 
      href: "tel:+35699194666"
    }
  },
  layout = {
    fullWidth: false,
    className: "",
    sidebarSpacing: "lg:ml-20"
  }
}) => {
  const { isLoading, stopLoading } = useLoading(400);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [stopLoading]);

  if (isLoading) {
    return <CallToActionSkeleton />;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className={`${layout.sidebarSpacing} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        
        {/* Main CTA Container with Full Background */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] lg:min-h-[500px]">
          
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/CallToAction.png" 
              alt="Developer workspace - coding environment with modern setup"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient if image fails
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700" style={{display: 'none'}}></div>
            
            {/* Color gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/70 dark:from-blue-700/85 dark:via-purple-700/75"></div>
            
            {/* Additional dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[400px] lg:min-h-[500px] p-8 md:p-12">
            
            {/* Text Content - Centered or Left Aligned */}
            <div className="max-w-2xl text-white space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {content.title}
              </h2>
              <p className="text-gray-200 text-lg lg:text-xl leading-relaxed">
                {content.description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href={buttons.email.href}
                  className="inline-flex items-center justify-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FaEnvelope />
                  <span>{buttons.email.text}</span>
                </a>
                <a 
                  href={buttons.phone.href}
                  className="inline-flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30 hover:border-white/50 hover:scale-105"
                >
                  <FaPhone />
                  <span>{buttons.phone.text}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;