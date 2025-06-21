import React from 'react';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import CallToAction from '../components/CallToAction';
import SocialLinks from '../components/SocialLinks';
import WorkExperience from '../components/WorkExperience';
import Education from '../components/Education'
import FAQAccordion from '../components/FAQAccordian';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-slate-100'>
        <Header />
        <AboutSection />
        <SocialLinks />
        <Education />
        <WorkExperience />
        <CallToAction />
        <FAQAccordion />
    </div>
  );
};

export default HomePage;