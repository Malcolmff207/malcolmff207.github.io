import React, { useEffect, useState } from 'react';
import { BsBook, BsCalendar3, BsGeoAlt, BsAward, BsTrophy } from 'react-icons/bs';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { EducationSectionSkeleton } from './skeletons';

const Education = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Science (Honours) in Multimedia Software Development",
      institution: "MCAST, Paola",
      period: "2022 - Current",
      status: "Final Year Student",
      type: "Bachelor's Degree",
      description: "Comprehensive program covering full-stack development, UI/UX design, and modern web technologies. Gaining expertise in software engineering principles and practical project development.",
      subjects: ["Web Development", "Software Engineering", "UI/UX Design", "Database Management", "Mobile Development"],
      icon: "🎓",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      degree: "Advanced Diploma in IT (Multimedia Software Development)",
      institution: "MCAST, Paola",
      period: "2019 - 2022",
      status: "Completed",
      type: "Advanced Diploma",
      description: "Foundation in programming concepts, web technologies, and multimedia development. Built strong technical skills and understanding of software development lifecycle.",
      subjects: ["Programming Fundamentals", "Web Technologies", "Multimedia Design", "Database Systems", "Project Management"],
      icon: "📚",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 3,
      degree: "Unity Certification",
      institution: "Unity Technologies",
      period: "2023",
      status: "Certified",
      type: "Professional Certification",
      description: "Specialized certification in Unity game development, covering 3D programming, physics, and interactive application development.",
      subjects: ["Unity Engine", "C# Programming", "3D Development", "Game Physics", "Interactive Design"],
      icon: "🎮",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Final Year Student':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'Completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700';
      case 'Certified':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadEducationData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (isMounted) {
          setIsLoading(false);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error('Error loading education data:', error);
        if (isMounted) {
          setIsLoading(false);
          setDataLoaded(true);
        }
      }
    };

    loadEducationData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading education section">
        <span className="sr-only">Loading education and certifications data, please wait...</span>
        <EducationSectionSkeleton />
      </div>
    );
  }

  if (!dataLoaded) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-6 lg:ml-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Education & Certifications</h2>
            <p className="text-gray-600 dark:text-gray-400">Unable to load education data. Please refresh the page.</p>
          </div>
        </div>
      </section>
    );
  }

  const EducationCard = ({ edu, index }) => {
    const { ref: cardRef, hasIntersected: cardVisible } = useIntersectionObserver({
      threshold: 0.3,
      triggerOnce: true
    });

    return (
      <div
        ref={cardRef}
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-700 transform hover:-translate-y-2 group animate-in fade-in scale-in ${
          cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <div className={`bg-gradient-to-br ${edu.color} p-6 rounded-t-2xl relative overflow-hidden`}>
          <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12 translate-x-4 -translate-y-2">
            {edu.icon}
          </div>
          <div className="relative z-10">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 border ${getStatusColor(edu.status)}`}>
              {edu.status}
            </span>
            <h3 className="text-lg font-bold text-white leading-tight mb-2">{edu.degree}</h3>
            <div className="flex items-center text-blue-100 mb-2">
              <BsGeoAlt className="w-4 h-4 mr-2" />
              <span className="text-sm">{edu.institution}</span>
            </div>
            <div className="flex items-center text-blue-100">
              <BsCalendar3 className="w-4 h-4 mr-2" />
              <span className="text-sm">{edu.period}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <BsAward className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{edu.type}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">{edu.description}</p>

          <div className="space-y-3">
            <div className="flex items-center">
              <BsTrophy className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Subjects</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {edu.subjects.slice(0, 3).map((subject, subjectIndex) => (
                <span
                  key={subjectIndex}
                  className="px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200 dark:border-blue-700 animate-in fade-in"
                  style={{ animationDelay: `${(index * 200) + (subjectIndex * 50)}ms` }}
                >
                  {subject}
                </span>
              ))}
              {edu.subjects.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600 animate-in fade-in"
                  style={{ animationDelay: `${(index * 200) + 150}ms` }}
                >
                  +{edu.subjects.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="education" className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-6 lg:ml-24 transition-all duration-1000 animate-in fade-in slide-in-from-bottom opacity-100 transform translate-y-0">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl mb-6 transition-all duration-700 scale-in scale-100 rotate-0">
            <BsBook className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 opacity-100 translate-y-0 transition-all duration-700 delay-200">
            Education & Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto opacity-100 translate-y-0 transition-all duration-700 delay-300">
            My academic journey and professional certifications that shaped my expertise in software development and modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {educationData.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;