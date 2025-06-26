import React, { useEffect } from 'react';
import { useLoading } from '../hooks/useLoading';
import Skeleton from './Skeleton';

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
    description: "I'm passionate about creating clean, efficient code and eager to contribute to a dynamic development team. Whether you're looking for a junior developer or want to discuss opportunities, I'd love to connect!"
  },
  buttons = {
    email: {
      text: "Email Me",
      href: "mailto:malcolmff207@gmail.com"
    },
    phone: {
      text: "Give Me a Call", 
      href: "tel:+35699194666"
    }
  },
  layout = {
    fullWidth: false,
    className: "",
    sidebarSpacing: "lg:ml-20" // Changed to responsive
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
    <section className="py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 animate-in fade-in slide-in-from-bottom duration-700">
      <div className={`${layout.sidebarSpacing} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 animate-in fade-in slide-in-from-top duration-500 animation-delay-100">
            {content.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top duration-500 animation-delay-200">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={buttons.email.href}
              className="px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold shadow-md hover:shadow-lg animate-in fade-in scale-in duration-500 animation-delay-300"
            >
              {buttons.email.text}
            </a>
            <a 
              href={buttons.phone.href}
              className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-semibold border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg animate-in fade-in scale-in duration-500 animation-delay-400"
            >
              {buttons.phone.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;