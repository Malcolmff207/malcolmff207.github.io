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

// Mock hooks for demo
const useAnimatedCounter = (target, duration, delay) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= target) {
            clearInterval(interval);
            return target;
          }
          return Math.min(prev + Math.ceil(target / 50), target);
        });
      }, duration / 50);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  
  return { count };
};

const useLoading = (duration) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  return { isLoading, stopLoading: () => setIsLoading(false) };
};

const AboutSectionSkeleton = () => (
  <div className="animate-pulse p-8">
    <div className="h-8 bg-gray-300 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded"></div>
  </div>
);

const AboutSection = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const { isLoading, stopLoading } = useLoading(800);

  const [targets, setTargets] = useState({
    yearStarted: 0,
    driven: 0,
    techCount: 0,
    passionPercent: 0,
  });

  const { count: yearStarted } = useAnimatedCounter(targets.yearStarted, 2000, 200);
  const { count: driven } = useAnimatedCounter(targets.driven, 2000, 400);
  const { count: techCount } = useAnimatedCounter(targets.techCount, 2000, 600);
  const { count: passionPercent } = useAnimatedCounter(targets.passionPercent, 2000, 800);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(res => setTimeout(res, 1000));
      stopLoading();
      setTargets({
        yearStarted: 2024,
        driven: 100,
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

              {/* Started Development Journey Badge - Responsive positioning */}
              <div className="absolute 
                top-[-20px] right-2 
                sm:top-[-30px] sm:right-4 
                md:top-[-40px] md:right-6 
                lg:top-[-50px] lg:right-[25px] 
                bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl lg:rounded-2xl 
                px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 
                shadow-lg lg:shadow-xl z-30 flex items-center 
                space-x-1 sm:space-x-2 md:space-x-3 
                border border-white lg:border-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center">
                  <FaRocket className="text-xs sm:text-sm" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">{yearStarted}</div>
                  <div className="text-[10px] sm:text-xs opacity-90 font-medium leading-tight">
                    Started Development<br className="sm:hidden" /> Journey
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Photo Collage */}
            <div className="relative h-[400px] sm:h-[480px] md:h-[520px] lg:h-[580px] flex items-center justify-center">
              {/* Photo collage container */}
              <div className="relative w-full h-full max-w-md mx-auto">
                
                {/* Main large photo - Responsive sizing */}
                <div className="absolute inset-0 w-full 
                  h-[360px] sm:h-[440px] md:h-[480px] lg:h-[520px] 
                  bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl 
                  transform hover:rotate-[0deg] transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl 
                  overflow-hidden border-2 lg:border-4 border-white dark:border-gray-700 z-10">
                  <img 
                    src="/developer.jpg" 
                    alt="Professional workspace" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Small photo 1 - Responsive positioning and sizing */}
                <div className="absolute 
                  top-[-5px] left-[-12px] 
                  sm:top-[-8px] sm:left-[-16px] 
                  md:top-[-10px] md:left-[-20px] 
                  lg:top-[-10px] lg:left-[-24px] 
                  w-24 h-28 
                  sm:w-28 sm:h-32 
                  md:w-32 md:h-36 
                  lg:w-36 lg:h-44 
                  bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl 
                  transform hover:rotate-[-5deg] transition-all duration-500 hover:scale-105 hover:shadow-2xl 
                  overflow-hidden border-2 lg:border-3 border-white dark:border-gray-700 z-20">
                  <img 
                    src="/teamwork.jpg" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Small photo 2 - Responsive positioning and sizing */}
                <div className="absolute 
                  bottom-6 right-[-12px] 
                  sm:bottom-8 sm:right-[-16px] 
                  md:bottom-8 md:right-[-20px] 
                  lg:bottom-10 lg:right-[-24px] 
                  w-28 h-32 
                  sm:w-32 sm:h-36 
                  md:w-36 md:h-40 
                  lg:w-40 lg:h-48 
                  bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl 
                  transform hover:rotate-[8deg] transition-all duration-500 hover:scale-105 hover:shadow-2xl 
                  overflow-hidden border-2 lg:border-3 border-white dark:border-gray-700 z-20">
                  <img 
                    src="/developerSuccess.jpeg" 
                    alt="Development setup" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Experience badge - Responsive positioning and sizing */}
                <div className="absolute 
                  bottom-4 left-4 
                  sm:bottom-6 sm:left-6 
                  md:bottom-7 md:left-7 
                  lg:bottom-8 lg:left-8 
                  bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl lg:rounded-2xl 
                  px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 
                  shadow-lg lg:shadow-xl z-30 flex items-center 
                  space-x-1 sm:space-x-2 md:space-x-3 
                  border border-white lg:border-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center">
                    <FaCode className="text-xs sm:text-sm" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{driven}%</div>
                    <div className="text-[10px] sm:text-xs opacity-90 font-medium leading-tight">
                      Driven<br className="sm:hidden" /> & Eager
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Drives Me Section - Full Width */}
          <div className="mb-16">
            <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-2xl p-6 sm:p-8 lg:p-12 text-white shadow-xl">
              
               {/* Passion for Innovation Badge - Responsive positioning and sizing */}
                <div className="absolute 
                  bottom-[-15px] right-2 
                  xs:bottom-[-100px]
                  sm:bottom-[-40px] sm:right-4 
                  md:bottom-[-25px] md:right-6 
                  lg:bottom-[-30px] lg:right-8 
                  bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl lg:rounded-2xl 
                  px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 
                  shadow-lg lg:shadow-xl z-30 flex items-center 
                  space-x-1 sm:space-x-2 md:space-x-3 
                  border border-white lg:border-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center">
                    <FaHeart className="text-xs sm:text-sm" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{passionPercent}%</div>
                    <div className="text-[10px] sm:text-xs opacity-90 font-medium leading-tight">
                      Passion for<br className="sm:hidden" /> Innovation
                    </div>
                  </div>
                </div>
              
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <FaHeart className="text-2xl md:text-3xl" />
                  <h3 className="text-2xl md:text-3xl font-bold">What Drives Me</h3>
                </div>
                <p className="text-blue-100 dark:text-blue-50 leading-relaxed text-base md:text-lg">
                  Both technology and I are constantly changing. The approach to UI/UX design and web development is shaped by my desire to remain up to date and continuously improve. Using technologies like React , Next and Node.js or any other framwork, I'm passionate about developing user-friendly UI/UX, aesthetically appealing applications. I always try to create experiences that make users happy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;