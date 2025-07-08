import React, { useState, useEffect } from 'react';

// Custom typewriter hook
const useTypewriter = (texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (!texts?.length) return;

    const current = texts[textIndex];
    const isAtEnd = !isDeleting && currentIndex === current.length;
    const isAtStart = isDeleting && currentIndex === 0;

    const delay = isAtEnd
      ? pauseTime
      : isDeleting
      ? deleteSpeed
      : speed;

    const timeout = setTimeout(() => {
      if (isAtEnd) {
        setIsDeleting(true);
      } else if (isAtStart) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      } else {
        setCurrentIndex(prev =>
          isDeleting ? prev - 1 : prev + 1
        );
        setCurrentText(
          current.substring(0, isDeleting ? currentIndex - 1 : currentIndex + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    texts,
    currentIndex,
    isDeleting,
    textIndex,
    speed,
    deleteSpeed,
    pauseTime,
  ]);

  return currentText;
};

const Header = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const texts = [
    'Full-Stack Developer',
    'Front-End Specialist',
    'React Enthusiast',
    'Problem Solver',
    'Digital Innovator',
  ];
  const currentText = useTypewriter(texts, 100, 50, 2000);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent transition-all duration-1000 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Malcolm Fenech
              </h1>

              <div
                className={`text-xl md:text-2xl lg:text-3xl mb-6 h-12 flex items-center justify-center lg:justify-start transition-all duration-1000 delay-300 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <span className="text-blue-400">I'm a</span>
                <span className="text-white ml-2 font-semibold">
                  {currentText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              <p
                className={`text-lg md:text-xl text-gray-300 mb-8 leading-relaxed transition-all duration-1000 delay-500 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Passionate developer from Malta creating exceptional digital experiences
                with modern technologies. Let's build something amazing together.
              </p>

              {/* Tech Stack Preview */}
              <div
                className={`transition-all duration-1000 delay-700 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <p className="text-gray-400 mb-4 text-sm uppercase tracking-wider">
                  Technologies I Work With
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {['React.js', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript', 'Tailwind'].map(
                    (tech, i) => (
                      <span
                        key={tech}
                        className={`px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-500 transform ${
                          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                        style={{ transitionDelay: `${800 + i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Profile Picture */}
            <div
              className={`flex justify-center lg:justify-end order-1 lg:order-2 transition-all duration-1000 transform ${
                isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-90'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <img
                      src="/myPic.png"
                      alt="Malcolm Fenech"
                      className="
                        w-full h-full
                        rounded-3xl
                        rounded-tl-[150px]
                        object-cover
                        border-4 border-white/10
                        shadow-2xl
                      "
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
