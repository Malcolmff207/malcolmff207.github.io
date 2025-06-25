import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FAQAccordion = () => {
  // Persist which FAQs are open across browser sessions
  const [openItems, setOpenItems] = useLocalStorage('faqOpenItems', {});
  
  // Intersection observer for scroll animations
  const { ref: sectionRef, hasIntersected: sectionVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const faqData = [
    {
      id: 'tech-stack',
      question: "What's your preferred tech stack?",
      answer: "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) with Python for backend development. My go-to tools include Tailwind CSS for styling, Git for version control, and VS Code for development. I'm also experienced with Unity for game development and have hands-on experience with cloud platforms like AWS."
    },
    {
      id: 'development-process',
      question: "What's your development process?",
      answer: "I follow agile methodologies and best practices learned during my studies and apprenticeship. My process includes: requirements gathering, planning and wireframing, iterative development with regular testing, code reviews, and continuous deployment. I believe in clean, maintainable code and thorough documentation."
    },
    {
      id: 'availability',
      question: "Are you available for freelance work?",
      answer: "I'm currently focused on securing a full-time position to start my career in software development. However, I'm open to discussing interesting projects or opportunities that align with my learning goals and could provide valuable experience in real-world development scenarios."
    },
    {
      id: 'career-transition',
      question: "Why did you transition from bartending to development?",
      answer: "My hospitality background taught me invaluable problem-solving skills, attention to detail, and how to work under pressure. While bartending, I discovered my passion for technology and creating digital solutions. I realized that the same customer-focused mindset and leadership skills that made me successful in hospitality would translate perfectly to creating exceptional user experiences in software development."
    },
    {
      id: 'unique-value',
      question: "What makes you different from other developers?",
      answer: "My unique combination of 6+ years of leadership experience in hospitality and technical skills in software development. This background gives me a deep understanding of user needs, excellent communication skills, and the ability to work effectively under pressure. I approach development with a service-oriented mindset, always considering the end-user experience."
    },
    {
      id: 'teamwork',
      question: "Do you work well in teams?",
      answer: "Absolutely! My bartending experience taught me excellent teamwork and communication skills. I've successfully managed teams during peak seasons, collaborated with kitchen staff and management, and learned to adapt quickly to different working styles. I believe great software is built by great teams, and I'm excited to contribute to a collaborative development environment."
    },
    {
      id: 'learning-approach',
      question: "How do you stay updated with technology?",
      answer: "I'm committed to continuous learning through multiple channels: following industry blogs and tech news, taking online courses on platforms like Udemy and freeCodeCamp, participating in coding communities, working on personal projects to experiment with new technologies, and attending tech meetups when possible. I believe staying current is essential in this rapidly evolving field."
    },
    {
      id: 'project-preferences',
      question: "What type of projects do you enjoy working on?",
      answer: "I'm passionate about user-focused applications that solve real-world problems. I particularly enjoy full-stack web applications where I can create intuitive interfaces and robust backend systems. Projects that involve interactive user experiences, data visualization, or e-commerce solutions really excite me. I also have a soft spot for game development projects using Unity."
    },
    {
      id: 'remote-work',
      question: "Are you comfortable with remote work?",
      answer: "Yes, I'm very comfortable with remote work. During my studies and apprenticeship, I've developed strong self-discipline and time management skills. I have experience with collaboration tools like Git, Slack, and project management platforms. My home office is well-equipped, and I understand the importance of clear communication in remote environments."
    },
    {
      id: 'career-goals',
      question: "What are your career goals?",
      answer: "My immediate goal is to secure a junior developer position where I can apply my skills and continue learning from experienced developers. Long-term, I aspire to become a senior full-stack developer and eventually lead development teams. I'm particularly interested in mentoring others who are transitioning into tech, given my own unique journey."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Chevron icon component
  const ChevronIcon = ({ isOpen }) => (
    <svg 
      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <section className="pt-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="faq" ref={sectionRef}>
      <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          sectionVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know more about my background, skills, and approach to development
          </p>
        </div>

        {/* Accordion Container - Centered */}
        <div className="flex justify-center pb-16">
          <div className={`w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-blue-100 dark:border-gray-700 overflow-hidden transition-all duration-1000 delay-200 ${
            sectionVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
          {faqData.map((item, index) => (
            <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              {/* Question Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-6 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700 ${
                  openItems[item.id] ? 'bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700' : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold pr-4">
                    {item.question}
                  </h3>
                  <div className={`transition-colors duration-200 ${
                    openItems[item.id] ? 'text-white' : 'text-blue-500 dark:text-blue-400'
                  }`}>
                    <ChevronIcon isOpen={openItems[item.id]} />
                  </div>
                </div>
              </button>
              
              {/* Answer Content with Smooth Animation */}
              <div 
                className={`bg-gray-50 dark:bg-gray-700 overflow-hidden transition-all duration-500 ease-in-out ${
                  openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;