import React from 'react';

const CallToAction = ({ 
  content = {
    title: "Ready to Start My Career Journey?",
    description: "I'm passionate about creating clean, efficient code and eager to contribute to a dynamic development team. Whether you're looking for a junior developer or want to discuss opportunities, I'd love to connect!"
  },
  buttons = {
    email: {
      text: "Email Me",
      href: "mailto:malcolmff207@gmail.com"
    },
    phone: {
      text: "Give Me a Call", 
      href: "tel:+35699194666"
    }
  },
  layout = {
    fullWidth: false,
    className: "",
    sidebarSpacing: "ml-20" // Configurable sidebar spacing
  }
}) => {
  return (
    <section className="py-10">
      <div className={`${layout.sidebarSpacing} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={buttons.email.href}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              {buttons.email.text}
            </a>
            <a 
              href={buttons.phone.href}
              className="px-8 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-semibold border border-gray-300 shadow-md hover:shadow-lg"
            >
              {buttons.phone.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;