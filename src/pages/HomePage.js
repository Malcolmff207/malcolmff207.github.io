import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import CallToAction from '../components/CallToAction';
import SocialLinks from '../components/SocialLinks';
import WorkExperience from '../components/WorkExperience';
import Education from '../components/Education';
import FAQAccordion from '../components/FAQAccordian';
import { useSectionLoading } from '../hooks/useLoading';
import { 
  AboutSectionSkeleton,
  WorkExperienceSkeleton,
  EducationSectionSkeleton,
  FAQAccordionSkeleton 
} from '../components/skeletons';
import Skeleton from '../components/Skeleton';

// Social Links Skeleton
const SocialLinksSkeleton = () => (
  <section className="bg-gray-50 dark:bg-gray-900 py-10">
    <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <Skeleton variant="circular" width="40px" height="40px" className="mx-auto mb-3" />
          <Skeleton variant="text" width="200px" height="28px" className="mx-auto mb-2" />
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

// Call to Action Skeleton
const CallToActionSkeleton = () => (
  <section className="py-10 bg-gray-50 dark:bg-gray-900">
    <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
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

const HomePage = () => {
  // Section loading states
  const { loadingStates, setSectionLoading } = useSectionLoading({
    header: false, // Header loads immediately
    about: true,
    socialLinks: true,
    education: true,
    experience: true,
    callToAction: true,
    faq: true
  });

  // Simulate progressive loading of sections
  useEffect(() => {
    const loadSections = async () => {
      try {
        // Simulate loading different sections at different times
        await new Promise(resolve => setTimeout(resolve, 600));
        setSectionLoading('about', false);
        
        await new Promise(resolve => setTimeout(resolve, 400));
        setSectionLoading('socialLinks', false);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        setSectionLoading('education', false);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        setSectionLoading('experience', false);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        setSectionLoading('callToAction', false);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        setSectionLoading('faq', false);
      } catch (error) {
        console.error('Error loading sections:', error);
        // In case of error, show all sections
        setSectionLoading('about', false);
        setSectionLoading('socialLinks', false);
        setSectionLoading('education', false);
        setSectionLoading('experience', false);
        setSectionLoading('callToAction', false);
        setSectionLoading('faq', false);
      }
    };
    
    loadSections();
  }, [setSectionLoading]);

  return (
    <div className='min-h-screen bg-slate-100 dark:bg-gray-900 transition-colors duration-300'>
      {/* Header always loads immediately */}
      <Header />
      
      {/* About Section */}
      <div aria-busy={loadingStates.about} aria-label={loadingStates.about ? "Loading about section" : undefined}>
        {loadingStates.about ? <AboutSectionSkeleton /> : <AboutSection />}
      </div>
      
      {/* Social Links */}
      <div aria-busy={loadingStates.socialLinks} aria-label={loadingStates.socialLinks ? "Loading social links" : undefined}>
        {loadingStates.socialLinks ? <SocialLinksSkeleton /> : <SocialLinks />}
      </div>
      
      {/* Education */}
      <div aria-busy={loadingStates.education} aria-label={loadingStates.education ? "Loading education section" : undefined}>
        {loadingStates.education ? <EducationSectionSkeleton /> : <Education />}
      </div>
      
      {/* Work Experience */}
      <div aria-busy={loadingStates.experience} aria-label={loadingStates.experience ? "Loading work experience" : undefined}>
        {loadingStates.experience ? <WorkExperienceSkeleton /> : <WorkExperience />}
      </div>
      
      {/* Call to Action */}
      <div aria-busy={loadingStates.callToAction} aria-label={loadingStates.callToAction ? "Loading call to action" : undefined}>
        {loadingStates.callToAction ? <CallToActionSkeleton /> : <CallToAction />}
      </div>
      
      {/* FAQ */}
      <div aria-busy={loadingStates.faq} aria-label={loadingStates.faq ? "Loading FAQ section" : undefined}>
        {loadingStates.faq ? <FAQAccordionSkeleton /> : <FAQAccordion />}
      </div>
    </div>
  );
};

export default HomePage;