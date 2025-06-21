import React from 'react';
import { BsBook, BsCalendar3, BsGeoAlt, BsAward, BsTrophy } from 'react-icons/bs';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Education = () => {
  // Add intersection observer for scroll-triggered animations
  const { ref: sectionRef, hasIntersected: sectionVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

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
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Certified':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="education" ref={sectionRef}>
        <div className={`max-w-6xl mx-auto p-6 ml-24 transition-all duration-1000 ${
          sectionVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-10'
        }`}>
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 transition-all duration-700 ${
                  sectionVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`}>
                <BsBook className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-700 delay-200 ${
                  sectionVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'
                }`}>Education & Certifications</h2>
                <p className={`text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
                  sectionVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'
                }`}>
                My academic journey and professional certifications that shaped my expertise in 
                software development and modern web technologies.
                </p>
            </div>

            {/* Education Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {educationData.map((edu, index) => {
                  // Individual intersection observer for each card
                  const EducationCard = () => {
                    const { ref: cardRef, hasIntersected: cardVisible } = useIntersectionObserver({
                      threshold: 0.3,
                      triggerOnce: true
                    });

                    return (
                      <div
                        key={edu.id}
                        ref={cardRef}
                        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 group ${
                          cardVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                        }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                      >
                        {/* Card Header with Gradient */}
                        <div className={`bg-gradient-to-br ${edu.color} p-6 rounded-t-2xl relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12 translate-x-4 -translate-y-2">
                            {edu.icon}
                        </div>
                        <div className="relative z-10">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusColor(edu.status)}`}>
                            {edu.status}
                            </span>
                            <h3 className="text-lg font-bold text-white leading-tight mb-2">
                            {edu.degree}
                            </h3>
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

                        {/* Card Body */}
                        <div className="p-6">
                        <div className="flex items-center mb-4">
                            <BsAward className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="text-sm font-medium text-gray-600">{edu.type}</span>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            {edu.description}
                        </p>

                        {/* Subjects */}
                        <div className="space-y-3">
                            <div className="flex items-center">
                            <BsTrophy className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Key Subjects</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            {edu.subjects.slice(0, 3).map((subject, subjectIndex) => (
                                <span
                                key={subjectIndex}
                                className="px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                                >
                                {subject}
                                </span>
                            ))}
                            {edu.subjects.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                +{edu.subjects.length - 3} more
                                </span>
                            )}
                            </div>
                        </div>
                        </div>
                      </div>
                    );
                  };

                  return <EducationCard key={edu.id} />;
                })}
            </div>
        </div>
    </section>
  );
};

export default Education;