import React from 'react';

const ContactInfo = () => {
  // Icon components using SVG
  const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const LocationIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const CodeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const contactDetails = [
    {
      icon: MailIcon,
      label: "Email",
      value: "malcolmff207@gmail.com",
      href: "mailto:malcolmff207@gmail.com",
      isLink: true
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: "+356 9919 4666",
      href: "tel:+35699194666",
      isLink: true
    },
    {
      icon: LocationIcon,
      label: "Location",
      value: "Malta",
      isLink: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-blue-600 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
        
        <div className="space-y-4">
          {contactDetails.map((contact, index) => {
            const IconComponent = contact.icon;
            
            return (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <IconComponent />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">{contact.label}</p>
                  {contact.isLink ? (
                    <a 
                      href={contact.href} 
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-white">{contact.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Connect */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
            <HeartIcon />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Why Connect?</h3>
        </div>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm">Passionate about clean, efficient code</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm">6+ years of leadership experience</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm">Ready to contribute from day one</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;