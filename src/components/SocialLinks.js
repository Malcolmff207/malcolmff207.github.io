import React from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter 
} from 'react-icons/fa';

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/malcolmff",
      bgColor: "bg-gray-800 hover:bg-gray-700",
      name: "GitHub"
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/malcolmfenech",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      name: "LinkedIn"
    },
    {
      icon: FaFacebook,
      href: "https://facebook.com/malcolmfenech",
      bgColor: "bg-blue-500 hover:bg-blue-600",
      name: "Facebook"
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/malcolmfenech",
      bgColor: "bg-pink-500 hover:bg-pink-600",
      name: "Instagram"
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/malcolmfenech",
      bgColor: "bg-sky-500 hover:bg-sky-600",
      name: "Twitter"
    }
  ];

  const CodeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  return (
    <section>
      <div className="ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
                <CodeIcon />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Connect Online</h3>
            </div>
            <p className="text-gray-600">
              Follow my journey and check out my projects
            </p>
          </div>
          
          <div className="flex justify-center items-center space-x-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl text-white transition-all duration-200 hover:scale-110 hover:shadow-md ${social.bgColor}`}
                  title={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;