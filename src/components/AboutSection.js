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
    { number: yearStarted, suffix: '', label: 'Started Development Journey', icon: FaRocket },
    { number: yearsExperience, suffix: '+', label: 'Years Leadership Experience', icon: FaUsers },
    { number: techCount, suffix: '+', label: 'Technologies Mastered', icon: FaCode },
    { number: passionPercent, suffix: '%', label: 'Passion for Innovation', icon: FaHeart },
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

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left: Story */}
            <div className="space-y-6">
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
                    Currently, I'm working as an <span className="font-semibold text-blue-600 dark:text-blue-400">Apprentice Full Stack Developer at ITGU</span>, building intuitive and efficient applications using modern technologies like React and Node.js.
                  </p>
                </div>
              </div>

              {/* ✅ What Drives Me Section */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-2xl p-8 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <FaHeart className="text-2xl" />
                  <h3 className="text-2xl font-bold">What Drives Me</h3>
                </div>
                <p className="text-blue-100 dark:text-blue-50 leading-relaxed">
                  I believe that great software is born from understanding people's needs and solving their problems elegantly.
                  My background in hospitality gives me a unique perspective on user experience — I know what it means to anticipate
                  needs and deliver exceptional service. This translates into my approach to development, where I focus on creating
                  applications that are not just functional, but delightful to use.
                </p>
              </div>
            </div>

            {/* Right: Stats and Skills */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ number, suffix, label, icon: Icon }, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Icon className="text-white text-xl" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                      {number}{suffix}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-blue-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                  <FaCode className="text-blue-500 mr-3" />
                  Technical Skills
                </h3>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm border border-blue-200 dark:border-blue-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CV Modal Trigger */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-gray-700 text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Want to Know More?</h3>
                <button
                  onClick={() => setIsCVModalOpen(true)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <FaDownload />
                  <span>View My Resume</span>
                </button>
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