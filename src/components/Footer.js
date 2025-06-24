// components/Footer.js
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

  const services = [
    { name: 'Web Development', href: '#web-dev' },
    { name: 'Frontend Design', href: '#frontend' },
    { name: 'Backend Development', href: '#backend' },
    { name: 'API Integration', href: '#api' },
    { name: 'Cloud Solutions', href: '#cloud' }
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
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
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
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

        <div className="relative z-10">
          {/* Main Footer Content - Added left margin for sidebar */}
          <div className="ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                    <FaCode className="text-white text-xl" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Portfolio
                  </span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Passionate full-stack developer from Malta creating exceptional digital experiences with modern technologies. Let's build something amazing together.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                    <FaEnvelope className="text-blue-400" />
                    <a href="mailto:malcolmff207@gmail.com" className="hover:underline">malcolmff207@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                    <FaPhone className="text-blue-400" />
                    <a href="tel:+35699194666" className="hover:underline">+356 9919 4666</a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FaMapMarkerAlt className="text-blue-400" />
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
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-white">Services</h3>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service.name}>
                      <a 
                        href={service.href}
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {service.name}
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
                      className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                      title={tech.name}
                    >
                      <tech.icon className="text-2xl text-gray-400 group-hover:text-blue-400 transition-colors duration-200 mb-1" />
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-200">{tech.name}</span>
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
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-xl text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                    title="GitHub"
                  >
                    <FaGithub className="text-xl text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                    title="Facebook"
                  >
                    <FaFacebook className="text-xl text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                  </a>
                  <a 
                    href="mailto:malcolmff207@gmail.com"
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                    title="Gmail"
                  >
                    <FaEnvelope className="text-xl text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                    title="Instagram"
                  >
                    <FaInstagram className="text-xl text-gray-400 group-hover:text-pink-400 transition-colors duration-200" />
                  </a>
                </div>

                {/* Download Resume Button */}
                <button 
                  onClick={handleDownloadResume}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg hover:scale-105"
                >
                  <FaDownload className="text-sm" />
                  <span>View Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Also with left margin */}
          <div className="border-t border-white/10">
            <div className="ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-gray-300">
                  <span>&copy; {currentYear} Malcolm Fenech. All rights reserved.</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300">
                  <span>Made with</span>
                  <FaHeart className="text-red-500 animate-pulse" />
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