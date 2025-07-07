import React, { useState } from 'react';
import { 
  FaCode,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaDownload
} from 'react-icons/fa';
import CVModal from './CVModal';

const Footer = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    setIsCVModalOpen(true);
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const technologies = [
    { icon: FaReact, name: 'React' },
    { icon: FaNodeJs, name: 'Node.js' },
    { icon: FaPython, name: 'Python' },
    { icon: FaAws, name: 'AWS' },
    { icon: FaDocker, name: 'Docker' },
    { icon: FaGitAlt, name: 'Git' }
  ];

  return (
    <>
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-950 dark:via-gray-900 dark:to-black text-white transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-3">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Scroll to Top Button - Fixed Bottom Right */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white p-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

        <div className="relative z-10">
          {/* Main Footer Content - Added left margin for sidebar */}
          <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl">
                    <FaCode className="text-white text-xl" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-300 dark:to-cyan-300 bg-clip-text text-transparent">
                    Portfolio
                  </span>
                </div>
                <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
                  Passionate full-stack developer from Malta creating exceptional digital experiences with modern technologies. Let's build something amazing together.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors duration-200">
                    <FaEnvelope className="text-blue-400 dark:text-blue-300" />
                    <a href="/contact" className="hover:underline">malcolmff207@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors duration-200">
                    <FaPhone className="text-blue-400 dark:text-blue-300" />
                    <a href="tel:+35699194666" className="hover:underline">+356 9919 4666</a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400">
                    <FaMapMarkerAlt className="text-blue-400 dark:text-blue-300" />
                    <span>Malta</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 dark:bg-blue-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies & Social */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Technologies</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {technologies.map((tech) => (
                    <div 
                      key={tech.name}
                      className="flex flex-col items-center p-3 bg-white/5 dark:bg-white/3 rounded-lg hover:bg-white/10 dark:hover:bg-white/7 transition-all duration-200 group cursor-pointer"
                      title={tech.name}
                    >
                      <tech.icon className="text-2xl text-gray-400 dark:text-gray-500 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-200 mb-1" />
                      <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-gray-300 transition-colors duration-200">{tech.name}</span>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
                <div className="flex justify-center space-x-3 mb-6">
                  <a 
                    href="https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-3 bg-white/10 dark:bg-white/5 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 hover:scale-110 group"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://github.com/Malcolmff207"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-3 bg-white/10 dark:bg-white/5 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 hover:scale-110 group"
                    title="GitHub"
                  >
                    <FaGithub className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-gray-200 transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://www.facebook.com/malcolm.farrugia.37/"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-3 bg-white/10 dark:bg-white/5 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 hover:scale-110 group"
                    title="Facebook"
                  >
                    <FaFacebook className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-200" />
                  </a>
                  <a 
                    href="/contact"
                    className="p-3 bg-white/10 dark:bg-white/5 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 hover:scale-110 group"
                    title="Gmail"
                  >
                    <FaEnvelope className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-red-400 dark:group-hover:text-red-300 transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://www.instagram.com/malc.farrugia/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-3 bg-white/10 dark:bg-white/5 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 hover:scale-110 group"
                    title="Instagram"
                  >
                    <FaInstagram className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-pink-400 dark:group-hover:text-pink-300 transition-colors duration-200" />
                  </a>
                </div>

                {/* Download Resume Button */}
                <button 
                  onClick={handleDownloadResume}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg hover:scale-105"
                >
                  <FaDownload className="text-sm" />
                  <span>View Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Also with left margin */}
          <div className="border-t border-white/10 dark:border-white/5">
            <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-400">
                  <span>&copy; {currentYear} Malcolm Fenech. All rights reserved.</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-400">
                  <span>Made with</span>
                  <FaHeart className="text-red-500 dark:text-red-400 animate-pulse" />
                  <span>using React & Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* CV Modal */}
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </>
  );
};

export default Footer;