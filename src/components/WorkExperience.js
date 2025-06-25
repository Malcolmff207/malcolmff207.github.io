// components/WorkExperience.js - Updated with dark mode support
import React, { useState, useEffect } from 'react';
import { BsBriefcase, BsCalendar3, BsGeoAlt, BsEyeSlash, BsEye } from 'react-icons/bs';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WorkExperience = () => {
  // Replace manual state with localStorage hook for persistence
  const [visibleExperiences, setVisibleExperiences] = useLocalStorage('workExperienceVisibility', {});
  const [showAll, setShowAll] = useLocalStorage('workExperienceShowAll', true);

  // Add intersection observer for animations
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const experiences = [
    {
      id: 1,
      title: "Apprentice Full Stack Developer",
      company: "ITGU, Marsa",
      period: "2024 - 2025",
      type: "Apprentice Position",
      description: "Gaining hands-on experience in full-stack development, working with modern web technologies and contributing to real-world projects.",
      technologies: ["React", "Node.js", "JavaScript", "HTML/CSS"]
    },
    {
      id: 2,
      title: "Head-Bartender",
      company: "Marine Aquatic Limited, San Pawl Il-Bahar",
      period: "February 2022 - November 2022",
      type: "Leadership Role",
      description: "Led bar operations, managed team schedules, maintained inventory, and delivered exceptional customer service in a fast-paced hospitality environment.",
      technologies: ["Team Management", "Customer Service", "Problem Solving"]
    },
    {
      id: 3,
      title: "Head-Bartender",
      company: "Hive Leisure LTD, L-Armier",
      period: "2018 - 2021",
      type: "Leadership Role",
      description: "Supervised bar staff, created cocktail menus, handled customer relations, and ensured quality service standards across multiple seasons.",
      technologies: ["Leadership", "Menu Development", "Quality Control"]
    },
    {
      id: 4,
      title: "Bartender",
      company: "Barcode Logistics, L-Armier",
      period: "2015 - 2018",
      type: "Service Role",
      description: "Developed foundational hospitality skills, learned customer service excellence, and built expertise in beverage preparation and service.",
      technologies: ["Customer Service", "Beverage Preparation", "Time Management"]
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Current Position':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Leadership Role':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
      case 'Service Role':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      case 'Apprentice Position':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const toggleExperience = (id) => {
    setVisibleExperiences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAll = () => {
    setShowAll(!showAll);
  };

  const isExperienceVisible = (id) => {
    return visibleExperiences[id] !== undefined ? visibleExperiences[id] : true;
  };

  // Initialize visibility for new experiences
  useEffect(() => {
    const hasUninitializedExperiences = experiences.some(exp => 
      visibleExperiences[exp.id] === undefined
    );
    
    if (hasUninitializedExperiences) {
      const initialVisibility = {};
      experiences.forEach(exp => {
        if (visibleExperiences[exp.id] === undefined) {
          initialVisibility[exp.id] = true;
        }
      });
      
      if (Object.keys(initialVisibility).length > 0) {
        setVisibleExperiences(prev => ({ ...prev, ...initialVisibility }));
      }
    }
  }, [experiences, visibleExperiences, setVisibleExperiences]);

  return (
    <section id="experience" ref={sectionRef} className="bg-white dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-6 lg:ml-24">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl">
                    <BsBriefcase className="w-8 h-8 text-white" />
                </div>
                
                {/* Toggle All Button - positioned near briefcase */}
                <button
                    onClick={toggleAll}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-700 border-2 border-blue-500 dark:border-blue-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:border-blue-600 dark:hover:border-blue-300 group hover:scale-110"
                    title={showAll ? 'Hide all experiences' : 'Show all experiences'}
                >
                    {showAll ? 
                    <BsEyeSlash className="w-4 h-4 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200" /> : 
                    <BsEye className="w-4 h-4 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200" />
                    }
                </button>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Work Experience</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From hospitality leadership to software development - my journey of building skills, 
                solving problems, and delivering exceptional results across diverse industries.
                </p>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400"></div>
                
                {experiences.map((exp, index) => {
                    // Individual intersection observer for each experience
                    const ExperienceCard = () => {
                        const { ref: expRef, hasIntersected: expVisible } = useIntersectionObserver({
                            threshold: 0.3,
                            triggerOnce: true
                        });

                        return (
                            <div 
                                ref={expRef}
                                className={`relative mb-12 last:mb-0 transition-all duration-700 ${
                                    expVisible 
                                        ? 'opacity-100 transform translate-x-0' 
                                        : 'opacity-0 transform translate-x-10'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                {/* Timeline dot with toggle */}
                                <button
                                    onClick={() => toggleExperience(exp.id)}
                                    className="absolute left-4 w-8 h-8 bg-white dark:bg-gray-700 border-4 border-blue-500 dark:border-blue-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:border-blue-600 dark:hover:border-blue-300 group"
                                    title={isExperienceVisible(exp.id) ? 'Hide details' : 'Show details'}
                                >
                                    {isExperienceVisible(exp.id) ? 
                                    <BsEyeSlash className="w-3 h-3 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300" /> : 
                                    <BsEye className="w-3 h-3 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
                                    }
                                </button>
                                
                                {/* Content card */}
                                <div className="ml-20 bg-white dark:bg-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="p-8">
                                    {/* Header - always visible with title, company, role type, and date */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                        <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{exp.title}</h3>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                                            <BsGeoAlt className="w-4 h-4 mr-2" />
                                            <span className="font-medium">{exp.company}</span>
                                        </div>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(exp.type)}`}>
                                            {exp.type}
                                        </span>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <BsCalendar3 className="w-4 h-4 mr-1" />
                                            {exp.period}
                                        </div>
                                        </div>
                                    </div>

                                    {/* Expandable Content - only description and technologies */}
                                    {isExperienceVisible(exp.id) && (
                                        <div className="animate-in fade-in duration-300">
                                        {/* Description */}
                                        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                                        {/* Skills/Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                            ))}
                                        </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        );
                    };

                    return showAll ? <ExperienceCard key={exp.id} /> : null;
                })}
            </div>
        </div>
    </section>
  );
};

export default WorkExperience;