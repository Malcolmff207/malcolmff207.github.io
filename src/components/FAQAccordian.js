import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLoading } from '../hooks/useLoading';
import { FAQAccordionSkeleton } from './skeletons';

const FAQAccordion = () => {
  const [openItems, setOpenItems] = useLocalStorage('faqOpenItems', {});
  const [isLoading, setIsLoading] = useState(true);

  const faqData = [
    {
      id: 'tech-stack',
      question: "What's your preferred tech stack?",
      answer: "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js)..."
    },
    {
      id: 'development-process',
      question: "What's your development process?",
      answer: "I follow agile methodologies and best practices..."
    },
    {
      id: 'availability',
      question: "Are you available for freelance work?",
      answer: "I'm currently focused on securing a full-time position..."
    },
    {
      id: 'career-transition',
      question: "Why did you transition from bartending to development?",
      answer: "My hospitality background taught me invaluable problem-solving skills..."
    },
    {
      id: 'unique-value',
      question: "What makes you different from other developers?",
      answer: "My unique combination of 6+ years of leadership experience..."
    },
    {
      id: 'teamwork',
      question: "Do you work well in teams?",
      answer: "Absolutely! My bartending experience taught me excellent teamwork..."
    },
    {
      id: 'learning-approach',
      question: "How do you stay updated with technology?",
      answer: "I'm committed to continuous learning through multiple channels..."
    },
    {
      id: 'project-preferences',
      question: "What type of projects do you enjoy working on?",
      answer: "I'm passionate about user-focused applications that solve real-world problems..."
    },
    {
      id: 'remote-work',
      question: "Are you comfortable with remote work?",
      answer: "Yes, I'm very comfortable with remote work..."
    },
    {
      id: 'career-goals',
      question: "What are your career goals?",
      answer: "My immediate goal is to secure a junior developer position..."
    }
  ];

  useEffect(() => {
    let isMounted = true;

    const loadFAQData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        if (isMounted) setIsLoading(false);
      } catch (error) {
        console.error('Error loading FAQ data:', error);
        if (isMounted) setIsLoading(false);
      }
    };

    loadFAQData();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading frequently asked questions">
        <span className="sr-only">Loading FAQ content, please wait...</span>
        <FAQAccordionSkeleton />
      </div>
    );
  }

  return (
    <section className="pt-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="faq">
      <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Header is always visible now */}
        <div className="text-center mb-16 transition-all duration-1000 animate-in fade-in slide-in-from-top opacity-100 transform translate-y-0">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know more about my background, skills, and approach to development
          </p>
        </div>

        {/* ✅ Accordion is always visible now */}
        <div className="flex justify-center pb-16">
          <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-blue-100 dark:border-gray-700 overflow-hidden transition-all duration-1000 delay-200 animate-in fade-in scale-in opacity-100 transform translate-y-0">
            {faqData.map((item, index) => (
              <div 
                key={item.id} 
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 animate-in fade-in slide-in-from-right"
                style={{ animationDelay: `${300 + (index * 100)}ms` }}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full text-left p-6 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700 ${
                    openItems[item.id] 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                    <div className={`transition-colors duration-200 ${
                      openItems[item.id] ? 'text-white' : 'text-blue-500 dark:text-blue-400'
                    }`}>
                      <ChevronIcon isOpen={openItems[item.id]} />
                    </div>
                  </div>
                </button>

                {/* Answer Content */}
                <div 
                  className={`bg-gray-50 dark:bg-gray-700 overflow-hidden transition-all duration-500 ease-in-out ${
                    openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed animate-in fade-in slide-in-from-top duration-300">
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