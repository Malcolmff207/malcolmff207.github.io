import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import CallToAction from '../components/CallToAction';
import SocialLinks from '../components/SocialLinks';
import FAQAccordion from '../components/FAQAccordian';
import { useSectionLoading } from '../hooks/useLoading';
import { 
  ContactFormSkeleton,
  FAQAccordionSkeleton 
} from '../components/skeletons';
import Skeleton from '../components/Skeleton';

// Contact Info Skeleton
const ContactInfoSkeleton = () => (
  <div className="space-y-6">
    {/* Contact Information */}
    <div className="bg-blue-600 dark:bg-blue-700 backdrop-blur-md rounded-2xl p-6">
      <Skeleton variant="text" width="200px" height="28px" className="bg-white/20 mb-6" />
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-3 rounded-xl bg-white/5">
            <Skeleton variant="circular" width="40px" height="40px" className="bg-white/20" />
            <div>
              <Skeleton variant="text" width="60px" className="bg-white/20 mb-1" />
              <Skeleton variant="text" width="150px" className="bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Why Connect */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <Skeleton variant="circular" width="40px" height="40px" className="mr-3" />
        <Skeleton variant="text" width="150px" height="24px" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-2">
            <Skeleton variant="circular" width="8px" height="8px" className="mt-2" />
            <Skeleton variant="text" width="200px" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

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

const ContactPage = () => {
  // Section loading states
  const { loadingStates, setSectionLoading } = useSectionLoading({
    header: false, // Header loads immediately
    contactForm: true,
    contactInfo: true,
    socialLinks: true,
    faq: true,
    callToAction: true
  });

  // Simulate progressive loading of sections
  useEffect(() => {
    const loadSections = async () => {
      try {
        // Load sections progressively
        await new Promise(resolve => setTimeout(resolve, 500));
        setSectionLoading('contactInfo', false);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        setSectionLoading('contactForm', false);
        
        await new Promise(resolve => setTimeout(resolve, 400));
        setSectionLoading('socialLinks', false);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        setSectionLoading('faq', false);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        setSectionLoading('callToAction', false);
      } catch (error) {
        console.error('Error loading contact page sections:', error);
        // In case of error, show all sections
        setSectionLoading('contactForm', false);
        setSectionLoading('contactInfo', false);
        setSectionLoading('socialLinks', false);
        setSectionLoading('faq', false);
        setSectionLoading('callToAction', false);
      }
    };
    
    loadSections();
  }, [setSectionLoading]);

  return (
    <section className="pt-20 bg-slate-100 dark:bg-gray-900 transition-colors duration-300" id="contact">
      <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Always visible */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 transition-colors duration-300">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            I'm actively seeking opportunities to start my career in software development. 
            If you have an exciting role or want to learn more about my skills and passion for coding, I'd love to hear from you!
          </p>
        </div>

        {/* Main Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div 
            className="lg:col-span-2"
            aria-busy={loadingStates.contactForm} 
            aria-label={loadingStates.contactForm ? "Loading contact form" : undefined}
          >
            {loadingStates.contactForm ? <ContactFormSkeleton /> : <ContactForm />}
          </div>
          
          {/* Contact Info */}
          <div 
            aria-busy={loadingStates.contactInfo} 
            aria-label={loadingStates.contactInfo ? "Loading contact information" : undefined}
          >
            {loadingStates.contactInfo ? <ContactInfoSkeleton /> : <ContactInfo />}
          </div>
        </div>
      </div>
      
      {/* Social Links */}
      <div 
        aria-busy={loadingStates.socialLinks} 
        aria-label={loadingStates.socialLinks ? "Loading social links" : undefined}
      >
        {loadingStates.socialLinks ? <SocialLinksSkeleton /> : <SocialLinks />}
      </div>
      
      {/* FAQ Accordion */}
      <div 
        aria-busy={loadingStates.faq} 
        aria-label={loadingStates.faq ? "Loading frequently asked questions" : undefined}
      >
        {loadingStates.faq ? <FAQAccordionSkeleton /> : <FAQAccordion />}
      </div>
      
      {/* Call to Action */}
      <div 
        aria-busy={loadingStates.callToAction} 
        aria-label={loadingStates.callToAction ? "Loading call to action" : undefined}
      >
        {loadingStates.callToAction ? <CallToActionSkeleton /> : <CallToAction />}
      </div>
    </section>
  );
};

export default ContactPage;