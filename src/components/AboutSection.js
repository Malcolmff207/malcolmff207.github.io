import React, { useState, useEffect } from 'react';
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaHeart,
  FaUsers,
  FaLightbulb,
  FaRocket,
  FaDownload,
} from 'react-icons/fa';
import { useAnimatedCounter } from '../hooks/useAnimatedProgress';
import { useLoading } from '../hooks/useLoading';
import { AboutSectionSkeleton } from './skeletons';
import CVModal from './CVModal';

const AboutSection = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const { isLoading, stopLoading } = useLoading(800);

  const [targets, setTargets] = useState({
    yearStarted: 0,
    yearsExperience: 0,
    techCount: 0,
    passionPercent: 0,
  });

  const { count: yearStarted } = useAnimatedCounter(targets.yearStarted, 2000, 200);
  const { count: yearsExperience } = useAnimatedCounter(targets.yearsExperience, 2000, 400);
  const { count: techCount } = useAnimatedCounter(targets.techCount, 2000, 600);
  const { count: passionPercent } = useAnimatedCounter(targets.passionPercent, 2000, 800);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(res => setTimeout(res, 1000));
      stopLoading();
      setTargets({
        yearStarted: 2024,
        yearsExperience: 6,
        techCount: 10,
        passionPercent: 100,
      });
    };
    loadData();
  }, [stopLoading]);

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading about section">
        <span className="sr-only">Loading about section data, please wait…</span>
        <AboutSectionSkeleton />
      </div>
    );
  }

  const stats = [
    { number: yearStarted, suffix: '', label: 'Started Development Journey', icon: FaRocket, color: 'from-blue-500 to-blue-600' },
    { number: yearsExperience, suffix: '+', label: 'Years Leadership Experience', icon: FaUsers, color: 'from-green-500 to-green-600' },
    { number: techCount, suffix: '+', label: 'Technologies Mastered', icon: FaCode, color: 'from-purple-500 to-purple-600' },
    { number: passionPercent, suffix: '%', label: 'Passion for Innovation', icon: FaHeart, color: 'from-red-500 to-red-600' },
  ];

  const skills = [
    {
      category: 'Frontend',
      items: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Next.js', 'Python', 'C#', 'API Development'],
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Unity', 'Godot', 'Blender', 'Postman', 'Problem Solving'],
    },
  ];

  return (
    <>
      <section
        id="about"
        className="pt-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      >
        <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From crafting perfect cocktails to crafting perfect code – discover my unique journey into software development.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Left: Story */}
            <div className="space-y-6 relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-blue-100 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FaLightbulb className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Story</h3>
                </div>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    Hi, I'm <span className="font-semibold text-blue-600 dark:text-blue-400">Malcolm Fenech</span>, a passionate full-stack developer from Malta with a unique background.
                  </p>
                  <p>
                    My journey into software development began while pursuing my <span className="font-semibold">Bachelor of Science in Multimedia Software Development at MCAST</span>. What started as curiosity quickly evolved into a deep passion for creating digital solutions.
                  </p>
                  <p>
                    Before diving into code, I spent over 6 years in the hospitality industry as a Head-Bartender, where I honed my <span className="font-semibold text-blue-600 dark:text-blue-400">leadership skills, problem-solving abilities, and ability to perform under pressure</span>. These experiences taught me the importance of teamwork, attention to detail, and exceptional customer service.
                  </p>
                  <p>
                    During my work as an <span className="font-semibold text-blue-600 dark:text-blue-400">Apprentice Full Stack Developer at ilGLU</span>, where I developed a strong working knowledge of modern technologies like React, Next and Node.js.
                  </p>
                </div>
              </div>

              {/* Started Development Journey - Overlay on story section */}
              <div className="absolute top-[-50px] right-[25px] bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl px-4 py-3 shadow-xl z-30 flex items-center space-x-3 border-2 border-white">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaRocket className="text-sm" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{yearStarted}</div>
                  <div className="text-xs opacity-90 font-medium">Started Development Journey</div>
                </div>
              </div>
            </div>

            {/* Right: Photo Collage */}
            <div className="relative h-[580px] flex items-center justify-center">
              {/* Photo collage container */}
              <div className="relative w-full h-full max-w-md mx-auto">
                
                {/* Main large photo - Takes majority of space */}
                <div className="absolute inset-0 w-full h-[520px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform hover:rotate-[0deg] transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl overflow-hidden border-4 border-white dark:border-gray-700 z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Professional workspace" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Small photo 1 - Top left overlay - INCREASED SIZE */}
                <div className="absolute top-[-10px] left-[-24px] w-36 h-44 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform hover:rotate-[-5deg] transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden border-3 border-white dark:border-gray-700 z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Small photo 2 - Bottom right overlay - INCREASED SIZE */}
                <div className="absolute bottom-10 right-[-24px] w-40 h-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform hover:rotate-[8deg] transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden border-3 border-white dark:border-gray-700 z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Development setup" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Experience badge - Bottom left */}
                <div className="absolute bottom-8 left-8 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl px-4 py-3 shadow-xl z-30 flex items-center space-x-3 border-2 border-white">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaCode className="text-sm" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{yearsExperience}+</div>
                    <div className="text-xs opacity-90 font-medium">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Drives Me Section - Full Width */}
          <div className="mb-16">
            <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-2xl p-8 lg:p-12 text-white shadow-xl">
              
               {/* Passion for Innovation - Overlaid on blue section */}
                <div className="absolute bottom-[-30px] right-8 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl px-4 py-3 shadow-xl z-30 flex items-center space-x-3 border-2 border-white">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaHeart className="text-sm" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{passionPercent}%</div>
                    <div className="text-xs opacity-90 font-medium">Passion for Innovation</div>
                  </div>
                </div>
              
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <FaHeart className="text-3xl" />
                  <h3 className="text-3xl font-bold">What Drives Me</h3>
                </div>
                <p className="text-blue-100 dark:text-blue-50 leading-relaxed text-lg">
                  Both technology and I are constantly changing. The approach to UI/UX design and web development is shaped by my desire to remain up to date and continuously improve. Using technologies like React , Next and Node.js or any other framwork, I'm passionate about developing user-friendly UI/UX, aesthetically appealing applications. I always try to create experiences that make users happy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </>
  );
};

export default AboutSection;