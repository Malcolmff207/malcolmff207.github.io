import React, { useState, useEffect, forwardRef } from 'react';
import { TbWorldWww } from "react-icons/tb";
import { FaLinkedin, FaCar, FaCalendarDay, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Resume = forwardRef((props, ref) => {
  const [animatedBars, setAnimatedBars] = useState(new Set());

  const personalInfo = {
    name: "Malcolm Fenech",
    title: "Software Developer",
    description: `Completed a Bachelor of Science (Honours) in Multimedia Software Development at MCAST this year, with recent experience as an Apprentice Full Stack Developer at IIGU. Practical experience in full-stack development and UI/UX design, and proficient in modern web technologies such as HTML, CSS, JavaScript, React.js, Next.js, and Tailwind. Strong foundation in teamwork and problem-solving skills, developed through technical projects and prior hospitality work. As I enter the field of professional development, I'm passionate about developing intuitive user interfaces and looking for chances to contribute to creative development projects.`
  };

  const contactInfo = [
    { icon: <FaPhoneAlt />, text: "+356 9919 4666", type: "phone" },
    { icon: <IoIosMail />, text: "Malcolmff207@gmail.com", type: "email" },
    { icon: <FaLocationDot />, text: "SPB1028 Qawra", type: "address" },
    { icon: <FaCalendarDay /> , text: "18/07/1997", type: "date" },
    { icon: <FaCar />, text: "Valid – Driving Licence", type: "license" },
    { icon: <FaLinkedin />, text: "linkedin.com/in/malcolm-farrugia-81bb6b199", type: "linkedin" },
    { icon: <TbWorldWww />, text: "https://malcolmff207.github.io/", type: "website" }
  ];

  const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "Tailwind", level: 80 },
    { name: "Bootstrap", level: 75 },
    { name: "JavaScript", level: 85 },
    { name: "React.js", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "Postman", level: 75 },
    { name: "C#", level: 70 },
    { name: "Unity", level: 65 },
    { name: "Godot", level: 60 },
    { name: "Blender", level: 55 }
  ];

  const workExperience = [
    {
      title: "Apprentice Full Stack Developer",
      company: "ILGLU, Marsa",
      period: "2024 – 2025",
      description: "Developing full-stack applications with modern technologies. Collaborating with senior developers on real-world projects."
    },
    {
      title: "Head-Bartender",
      company: "Marine Aquatic Limited, San Pawl Il-Bahar",
      period: "Feb 2022 – Nov 2022",
      description: "Led bartending operations and managed team during peak season. Ensured exceptional customer service in fast-paced environment."
    },
    {
      title: "Head-Bartender",
      company: "Hive Leisure LTD, L-Armier",
      period: "2018 – 2021",
      description: "Supervised bartending staff and maintained inventory management. Developed problem-solving skills in high-volume establishment."
    },
    {
      title: "Bartender",
      company: "Barcode Logistics, L-Armier",
      period: "2015 – 2018",
      description: "Provided excellent customer service while learning hospitality fundamentals. Built communication skills in professional environment."
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science (Honours) in Multimedia Software Development.",
      institution: "MCAST, Paola",
      period: "2022 – 2025",
      description: "Advanced studies in software development and multimedia technologies. Focus on modern web development and programming languages."
    },
    {
      degree: "Advanced Diploma in IT (Multimedia Software Development)",
      institution: "MCAST, Paola",
      period: "2019 – 2022",
      description: "Foundation in information technology with multimedia specialization. Gained practical experience in programming and design."
    }
  ];

  const languages = ["Maltese (native speaker)", "English (bilingual)"];
  const interests = ["Website Development", "Problem Solving", "Graphic Design", "UI/UX Design", "JavaScript Frameworks"];
  const certificates = ["Unity"];

  // Animate skill bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBars(new Set(skills.map(skill => skill.name)));
    }, 500);
    
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSkillLevel = (level) => {
    if (level >= 85) return "Expert";
    if (level >= 75) return "Advanced"; 
    if (level >= 65) return "Proficient";
    return "Intermediate";
  };

  const getContactHref = (item) => {
    switch (item.type) {
      case 'phone': return `tel:${item.text}`;
      case 'email': return `https://malcolmff207.github.io/contact`;
      case 'linkedin': return `https://www.linkedin.com/in/malcolm-farrugia-81bb6b199/`;
      case 'website': return `https://malcolmff207.github.io/`;
      default: return '#';
    }
  };

  return (
    <div ref={ref}>
      <style>{`
        /* Animations */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes skillBarFill {
          from { width: 0; }
          to { width: var(--skill-width); }
        }
        
        /* Resume container animation */
        .cv-modal-wrapper.a4-page {
          animation: slideInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        /* Modal-specific animations */
        .cv-modal-wrapper .sidebar {
          animation: slideInLeft 0.8s ease-out 0.6s forwards;
          opacity: 0;
          position: relative;
          z-index: 1;
        }
        
        .cv-modal-wrapper .main-content {
          animation: slideInRight 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }
        
        .cv-modal-wrapper .contact-item {
          transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .cv-modal-wrapper .contact-item:hover {
          transform: translateX(5px);
          color: #87ceeb;
        }
        
        .cv-modal-wrapper .contact-item a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .cv-modal-wrapper .contact-item a:hover {
          text-decoration: underline;
        }
        
        .cv-modal-wrapper .skill-item {
          transition: transform 0.3s ease;
          position: relative;
          overflow: visible;
        }
        
        .cv-modal-wrapper .skill-item:hover {
          transform: translateX(8px);
        }
        
        .cv-modal-wrapper .skill-item:hover::after {
          content: attr(data-skill-level);
          position: absolute;
          top: -25px;
          left: 75%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          animation: fadeIn 0.3s ease;
          pointer-events: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        .cv-modal-wrapper .skill-progress {
          transition: width 1.5s ease-out;
          position: relative;
          background: linear-gradient(45deg, #87ceeb, #5bc0de);
        }
        
        .cv-modal-wrapper .skill-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .cv-modal-wrapper .list-item {
          transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .cv-modal-wrapper .list-item:hover {
          transform: translateX(5px);
          color: #87ceeb;
        }
        
        .cv-modal-wrapper .experience-item {
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .cv-modal-wrapper .experience-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          background: #ffffff !important;
        }
        
        /* Print-specific styles to remove animations */
        @media print {
          .cv-modal-wrapper * {
            animation: none !important;
            transition: none !important;
          }
          
          .cv-modal-wrapper .skill-progress::after {
            display: none !important;
          }
          
          .cv-modal-wrapper.a4-page,
          .cv-modal-wrapper .sidebar,
          .cv-modal-wrapper .main-content,
          .cv-modal-wrapper .skill-item {
            opacity: 1 !important;
            animation: none !important;
          }
          
          /* Fix skill bar widths for print */
          .cv-modal-wrapper .skill-item:nth-child(1) .skill-progress { width: 90% !important; }
          .cv-modal-wrapper .skill-item:nth-child(2) .skill-progress { width: 85% !important; }
          .cv-modal-wrapper .skill-item:nth-child(3) .skill-progress { width: 80% !important; }
          .cv-modal-wrapper .skill-item:nth-child(4) .skill-progress { width: 75% !important; }
          .cv-modal-wrapper .skill-item:nth-child(5) .skill-progress { width: 85% !important; }
          .cv-modal-wrapper .skill-item:nth-child(6) .skill-progress { width: 80% !important; }
          .cv-modal-wrapper .skill-item:nth-child(7) .skill-progress { width: 75% !important; }
          .cv-modal-wrapper .skill-item:nth-child(8) .skill-progress { width: 70% !important; }
          .cv-modal-wrapper .skill-item:nth-child(9) .skill-progress { width: 75% !important; }
          .cv-modal-wrapper .skill-item:nth-child(10) .skill-progress { width: 70% !important; }
          .cv-modal-wrapper .skill-item:nth-child(11) .skill-progress { width: 65% !important; }
          .cv-modal-wrapper .skill-item:nth-child(12) .skill-progress { width: 60% !important; }
          .cv-modal-wrapper .skill-item:nth-child(13) .skill-progress { width: 55% !important; }
          
          .cv-modal-wrapper.a4-page {
            box-shadow: none !important;
          }
          
          .cv-modal-wrapper .experience-item {
            box-shadow: none !important;
          }
          
          .cv-modal-wrapper .experience-item:hover {
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      
      <div className="a4-page cv-modal-wrapper" style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        backgroundColor: 'white',
        display: 'flex',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s ease',
        overflow: 'visible'
      }}>
        {/* Sidebar - 35% width */}
        <div className="sidebar" style={{
          width: '35%',
          backgroundColor: '#0f4c81',
          padding: '30px 20px',
          color: '#fff',
          overflow: 'visible'
        }}>
          {/* Contact Info */}
          <div style={{ marginBottom: '30px' }}>
            {contactInfo.map((c, i) => (
              <div key={i} className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                fontSize: '13px',
                color: '#e8f4ff',
                cursor: 'pointer'
              }}>
                <span style={{ marginRight: '10px' }}>{c.icon}</span>
                {c.type === 'phone' || c.type === 'email' || c.type === 'linkedin' || c.type === 'website' ? (
                  <a href={getContactHref(c)} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {c.text}
                  </a>
                ) : (
                  <span>{c.text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', marginTop: '25px' }}>Skills</h3>
          {skills.map((s, index) => (
            <div 
              key={s.name} 
              className="skill-item" 
              data-skill-level={`${getSkillLevel(s.level)} (${s.level}%)`}
              style={{ 
                marginBottom: '10px', 
                cursor: 'pointer',
                animation: `slideInLeft 0.5s ease-out ${0.8 + (index * 0.1)}s forwards`,
                opacity: 0
              }}
            >
              <div className="skill-name" style={{ fontSize: '13px', marginBottom: '4px', color: '#e8f4ff' }}>{s.name}</div>
              <div className="skill-bar" style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#1a5a9a',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div className="skill-progress" style={{
                  width: animatedBars.has(s.name) ? `${s.level}%` : '0%',
                  '--skill-width': `${s.level}%`,
                  height: '100%',
                  borderRadius: '3px',
                  animationDelay: `${1 + (index * 0.1)}s`
                }} data-skill-width={`${s.level}%`} />
              </div>
            </div>
          ))}

          {/* Languages */}
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '10px' }}>Languages</h3>
          {languages.map((l, i) => (
            <div key={i} className="list-item" style={{ marginBottom: '8px', fontSize: '13px', color: '#e8f4ff', cursor: 'pointer' }}>{l}</div>
          ))}

          {/* Interests */}
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '10px' }}>Interests</h3>
          {interests.map((x, i) => (
            <div key={i} className="list-item" style={{ marginBottom: '8px', fontSize: '13px', color: '#e8f4ff', cursor: 'pointer' }}>{x}</div>
          ))}

          {/* Certificates */}
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '10px' }}>Certificates</h3>
          {certificates.map((c, i) => (
            <div key={i} className="list-item" style={{ marginBottom: '8px', fontSize: '13px', color: '#e8f4ff', cursor: 'pointer' }}>{c}</div>
          ))}
        </div>

        {/* Main Content - 65% width */}
        <div className="main-content" style={{
          flex: 1,
          padding: '30px 30px',
          backgroundColor: 'white'
        }}>
          {/* Header */}
          <h1 style={{ fontSize: '42px', margin: '0 0 5px', fontWeight: '300', color: '#333' }}>
            {personalInfo.name}
          </h1>
          <div className="subtitle" style={{ fontSize: '20px', color: '#0f4c81', marginBottom: '20px' }}>
            {personalInfo.title}
          </div>

          {/* Description */}
          <p className="description" style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#555',
            textAlign: 'justify',
            marginBottom: '25px'
          }}>
            {personalInfo.description}
          </p>

          {/* Work History */}
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            marginTop: '25px',
            marginBottom: '15px',
            paddingBottom: '5px',
            borderBottom: '2px solid #0f4c81',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#0f4c81',
              borderRadius: '50%',
              marginRight: '10px',
              display: 'inline-block'
            }}></span>
            Work History
          </h2>
          {workExperience.map((j, i) => (
            <div key={i} className="experience-item" style={{
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              <div className="experience-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}>
                <div>
                  <div className="experience-title" style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{j.title}</div>
                  <div className="experience-company" style={{ fontSize: '12px', fontStyle: 'italic', color: '#0f4c81' }}>{j.company}</div>
                </div>
                <div className="experience-period" style={{ fontSize: '12px', color: '#888' }}>{j.period}</div>
              </div>
              <p className="experience-description" style={{ margin: 0, fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                {j.description}
              </p>
            </div>
          ))}

          {/* Education */}
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            marginTop: '25px',
            marginBottom: '15px',
            paddingBottom: '5px',
            borderBottom: '2px solid #0f4c81',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#0f4c81',
              borderRadius: '50%',
              marginRight: '10px',
              display: 'inline-block'
            }}></span>
            Education
          </h2>
          {education.map((e, i) => (
            <div key={i} className="experience-item" style={{
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              <div className="experience-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}>
                <div>
                  <div className="experience-title" style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{e.degree}</div>
                  <div className="experience-company" style={{ fontSize: '12px', fontStyle: 'italic', color: '#0f4c81' }}>{e.institution}</div>
                </div>
                <div className="experience-period" style={{ fontSize: '12px', color: '#888' }}>{e.period}</div>
              </div>
              <p className="experience-description" style={{ margin: 0, fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Resume.displayName = 'Resume';

export default Resume;