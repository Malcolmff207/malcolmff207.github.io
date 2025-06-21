import React from 'react';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaCode, 
  FaHeart,
  FaUsers,
  FaLightbulb,
  FaCoffee,
  FaRocket,
  FaDownload
} from 'react-icons/fa';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useAnimatedCounter } from '../hooks/useAnimatedProgress';

const AboutSection = () => {
  // Add intersection observers for scroll-triggered animations
  const { ref: statsRef, hasIntersected: statsVisible } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });

  // Use animated counters for the stats
  const yearStarted = useAnimatedCounter(statsVisible ? 2024 : 0, 2000, 200);
  const yearsExperience = useAnimatedCounter(statsVisible ? 6 : 0, 2000, 400);
  const techCount = useAnimatedCounter(statsVisible ? 10 : 0, 2000, 600);
  const passionPercent = useAnimatedCounter(statsVisible ? 100 : 0, 2000, 800);

  const stats = [
    { number: yearStarted.count, label: "Started Development Journey", icon: FaRocket },
    { number: `${yearsExperience.count}+`, label: "Years Leadership Experience", icon: FaUsers },
    { number: `${techCount.count}+`, label: "Technologies Mastered", icon: FaCode },
    { number: `${passionPercent.count}%`, label: "Passion for Innovation", icon: FaHeart }
  ];

  const skills = [
    { category: "Frontend", items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
    { category: "Backend", items: ["Node.js", "Next.js", "Python", "C#", "API Development"] },
    { category: "Tools & Others", items: ["Git", "Unity", "Godot", "Blender", "Postman", "Problem Solving"] }
  ];

  const journey = [
    {
      year: "2024-2025",
      title: "Apprentice Full Stack Developer",
      company: "ITGU, Marsà",
      description: "Developing full-stack applications with modern technologies. Collaborating with senior developers on real-world projects.",
      icon: FaCode,
      current: true
    },
    {
      year: "2022-Current",
      title: "Bachelor's Degree Student",
      company: "MCAST, Paola",
      description: "Multimedia Software Development - Advanced studies in software development and multimedia technologies.",
      icon: FaGraduationCap,
      current: true
    },
    {
      year: "2018-2022",
      title: "Head-Bartender",
      company: "Various Establishments",
      description: "Led bartending operations, managed teams during peak seasons, and developed exceptional problem-solving skills in fast-paced environments.",
      icon: FaBriefcase,
      current: false
    }
  ];

  return (
    <section className="pt-20 bg-gradient-to-br from-slate-50 to-blue-50" id="about">
      <div className="ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From crafting perfect cocktails to crafting perfect code - discover my unique journey into the world of software development
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Left Column - Story */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FaLightbulb className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">My Story</h3>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hi, I'm <span className="font-semibold text-blue-600">Malcolm Fenech</span>, a passionate full-stack developer from Malta with a unique background that sets me apart in the tech world.
                </p>
                
                <p>
                  My journey into software development began while pursuing my <span className="font-semibold">Bachelor of Science in Multimedia Software Development at MCAST</span>. What started as curiosity quickly evolved into a deep passion for creating digital solutions that make a real difference.
                </p>
                
                <p>
                  Before diving into code, I spent over 6 years in the hospitality industry as a Head-Bartender, where I honed my <span className="font-semibold text-blue-600">leadership skills, problem-solving abilities, and ability to perform under pressure</span>. These experiences taught me the importance of teamwork, attention to detail, and exceptional customer service - qualities that directly translate to creating outstanding user experiences in software development.
                </p>
                
                <p>
                  Currently, I'm working as an <span className="font-semibold text-blue-600">Apprentice Full Stack Developer at ITGU</span>, where I'm applying my knowledge of modern technologies like React, Node.js, and Python to build innovative web applications. I'm passionate about creating intuitive interfaces and robust backend systems that solve real-world problems.
                </p>
              </div>
            </div>

            {/* What Drives Me */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <FaHeart className="text-2xl" />
                <h3 className="text-2xl font-bold">What Drives Me</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
                I believe that great software is born from understanding people's needs and solving their problems elegantly. 
                My background in hospitality gives me a unique perspective on user experience - I know what it means to 
                anticipate needs and deliver exceptional service. This translates into my approach to development, 
                where I focus on creating applications that are not just functional, but delightful to use.
              </p>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="space-y-8">
            
            {/* Stats Grid - with animated counters */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 text-center hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaCode className="text-blue-500 mr-3" />
                Technical Skills
              </h3>
              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-700 mb-3">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Resume */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Want to Know More?</h3>
              <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:scale-105 shadow-lg">
                <FaDownload />
                <span>Download My Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;