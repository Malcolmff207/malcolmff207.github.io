// import React, { useState, useEffect, forwardRef } from 'react';
// import { 
//   FaPhone, 
//   FaEnvelope, 
//   FaMapMarkerAlt, 
//   FaCalendarAlt, 
//   FaCar, 
//   FaLinkedin,
//   FaDownload,
//   FaPrint,
//   FaEye,
//   FaEyeSlash
// } from 'react-icons/fa';

// const Resume = forwardRef((props, ref) => {
//   const [animatedBars, setAnimatedBars] = useState(new Set());
//   const [visibleSections, setVisibleSections] = useState({
//     contact: true,
//     skills: true,
//     languages: true,
//     interests: true,
//     certificates: true,
//     workHistory: true,
//     education: true
//   });

//   // Personal information
//   const personalInfo = {
//     name: "Malcolm Fenech",
//     title: "Front-end Developer",
//     description: `Final-year student completing a Bachelor of Science (Honours) in Multimedia Software Development at MCAST, with recent experience as an Apprentice Full Stack Developer at IIGU. with practical experience in full-stack development and UI/UX design, and proficient in modern web technologies such as HTML, CSS, JavaScript, React.js, Next.js, and Tailwind. strong foundation in teamwork and problem-solving skills, developed through technical projects and prior hospitality work. As I enter the field of professional development, I'm passionate about developing Intuitive user interfaces and looking for chances to contribute to creative development projects.`
//   };

//   // Contact information with emojis (matching original)
//   const contactInfo = [
//     { icon: "📞", text: "+356 9919 4666", type: "phone" },
//     { icon: "✉", text: "Malcolmff207@gmail.com", type: "email" },
//     { icon: "📍", text: "SPB1028 Qawra", type: "address" },
//     { icon: "📅", text: "18/07/1997", type: "date" },
//     { icon: "🚗", text: "Valid - Driving Licence", type: "license" },
//     { icon: "💼", text: "linkedin.com/in/malcolm-farrugia", type: "linkedin" }
//   ];

//   // Skills data (exactly matching original percentages)
//   const skills = [
//     { name: "HTML", level: 90 },
//     { name: "CSS", level: 85 },
//     { name: "Tailwind", level: 80 },
//     { name: "Bootstrap", level: 75 },
//     { name: "JavaScript", level: 85 },
//     { name: "React.js", level: 80 },
//     { name: "Next.js", level: 75 },
//     { name: "Node.js", level: 70 },
//     { name: "Postman", level: 75 },
//     { name: "C#", level: 70 },
//     { name: "Unity", level: 65 },
//     { name: "Godot", level: 60 },
//     { name: "Blender", level: 55 }
//   ];

//   // Work experience
//   const workExperience = [
//     {
//       title: "Apprentice Full Stack Developer",
//       company: "IIGU, Marsa",
//       period: "2024 - 2025",
//       description: "Developing full-stack applications with modern technologies. Collaborating with senior developers on real-world projects."
//     },
//     {
//       title: "Head-Bartender",
//       company: "Marine Aquatic Limited, San Pawl Il-Bahar",
//       period: "February 2022 - November 2022",
//       description: "Led bartending operations and managed team during peak season. Ensured exceptional customer service in fast-paced environment."
//     },
//     {
//       title: "Head-Bartender",
//       company: "Hive Leisure LTD, L-Armier",
//       period: "2018 - 2021",
//       description: "Supervised bartending staff and maintained inventory management. Developed problem-solving skills in high-volume establishment."
//     },
//     {
//       title: "Bartender",
//       company: "Barcode Logistics, L-Armier",
//       period: "2015 - 2018",
//       description: "Provided excellent customer service while learning hospitality fundamentals. Built communication skills in professional environment."
//     }
//   ];

//   // Education
//   const education = [
//     {
//       degree: "Bachelor of Science (Honours) in Multimedia Software Development",
//       institution: "MCAST, Paola",
//       period: "2022 - Current",
//       description: "Advanced studies in software development and multimedia technologies. Focus on modern web development and programming languages."
//     },
//     {
//       degree: "Advanced Diploma in IT (Multimedia Software Development)",
//       institution: "MCAST, Paola",
//       period: "2019 - 2022",
//       description: "Foundation in information technology with multimedia specialization. Gained practical experience in programming and design."
//     }
//   ];

//   // Additional sections
//   const languages = ["Maltese (native speaker)", "English (bilingual)"];
//   const interests = ["Website Development", "Problem Solving", "Graphic Design", "UI/UX Design", "JavaScript Frameworks"];
//   const certificates = ["Unity"];

//   // Animate skill bars on mount
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setAnimatedBars(new Set(skills.map(skill => skill.name)));
//     }, 500);
    
//     return () => clearTimeout(timer);
//   }, [skills]);

//   const getSkillLevel = (level) => {
//     if (level >= 85) return "Expert";
//     if (level >= 75) return "Advanced"; 
//     if (level >= 65) return "Proficient";
//     return "Intermediate";
//   };

//   const toggleSection = (section) => {
//     setVisibleSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const getContactHref = (item) => {
//     switch (item.type) {
//       case 'phone': return `tel:${item.text}`;
//       case 'email': return `mailto:${item.text}`;
//       case 'linkedin': return `https://${item.text}`;
//       default: return '#';
//     }
//   };

//   return (
//     <div ref={ref} className="cv-print-wrapper">
//       <div className="min-h-screen bg-gray-50 p-5">
//         {/* Exact replica of original CSS styles */}
//         <style jsx>{`
//           @keyframes pageLoad {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }
          
//           @keyframes slideInLeft {
//             from {
//               opacity: 0;
//               transform: translateX(-50px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }
          
//           @keyframes slideInRight {
//             from {
//               opacity: 0;
//               transform: translateX(50px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }
          
//           @keyframes slideInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }
          
//           @keyframes skillBarFill {
//             from { width: 0; }
//             to { width: var(--skill-width); }
//           }
          
//           .resume-container {
//             max-width: 900px;
//             margin: 0 auto;
//             background: white;
//             display: flex;
//             min-height: 800px;
//             box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//             animation: slideInUp 0.8s ease-out 0.4s forwards;
//           }
          
//           .sidebar {
//             width: 300px;
//             background-color: #0f4c81;
//             padding: 30px 25px;
//             color: #ffffff;
//             animation: slideInLeft 0.8s ease-out 0.6s forwards;
//           }
          
//           .main-content {
//             flex: 1;
//             padding: 30px 35px;
//             background: white;
//             animation: slideInRight 0.8s ease-out 0.8s forwards;
//           }
          
//           .contact-item {
//             display: flex;
//             align-items: center;
//             margin-bottom: 12px;
//             font-size: 14px;
//             color: #e8f4ff;
//             transition: transform 0.3s ease, color 0.3s ease;
//           }
          
//           .contact-item:hover {
//             transform: translateX(5px);
//             color: #87ceeb;
//           }
          
//           .contact-icon {
//             width: 20px;
//             margin-right: 10px;
//             color: #87ceeb;
//           }
          
//           .section-title {
//             font-size: 18px;
//             font-weight: 600;
//             color: #ffffff;
//             margin-bottom: 20px;
//             margin-top: 35px;
//           }
          
//           .section-title:first-of-type {
//             margin-top: 0;
//           }
          
//           .skill-item {
//             margin-bottom: 15px;
//             transition: transform 0.3s ease;
//             position: relative;
//             cursor: pointer;
//           }
          
//           .skill-item:hover {
//             transform: translateX(8px);
//           }
          
//           .skill-item:hover::after {
//             content: attr(data-skill-level);
//             position: absolute;
//             top: -15px;
//             left: 75%;
//             transform: translateX(-50%);
//             background: rgba(0, 0, 0, 0.9);
//             color: white;
//             padding: 8px 12px;
//             border-radius: 6px;
//             font-size: 12px;
//             font-weight: 500;
//             white-space: nowrap;
//             z-index: 1000;
//             opacity: 1;
//             box-shadow: 0 2px 8px rgba(0,0,0,0.2);
//           }
          
//           .skill-name {
//             font-size: 14px;
//             color: #e8f4ff;
//             margin-bottom: 5px;
//           }
          
//           .skill-bar {
//             width: 100%;
//             height: 8px;
//             background-color: #1a5a9a;
//             border-radius: 4px;
//             overflow: hidden;
//           }
          
//           .skill-progress {
//             height: 100%;
//             background: linear-gradient(45deg, #87ceeb, #5bc0de);
//             border-radius: 4px;
//             width: 0;
//             animation: skillBarFill 1.5s ease-out forwards;
//             position: relative;
//           }
          
//           .skill-progress::after {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: -100%;
//             width: 100%;
//             height: 100%;
//             background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
//             animation: shimmer 2s infinite;
//           }
          
//           @keyframes shimmer {
//             0% { left: -100%; }
//             100% { left: 100%; }
//           }
          
//           .language-item, .interest-item, .certificate-item {
//             font-size: 14px;
//             color: #e8f4ff;
//             margin-bottom: 8px;
//             transition: transform 0.3s ease, color 0.3s ease;
//           }
          
//           .language-item:hover, .interest-item:hover, .certificate-item:hover {
//             transform: translateX(5px);
//             color: #87ceeb;
//           }
          
//           .main-header h1 {
//             font-size: 48px;
//             font-weight: 300;
//             color: #333;
//             margin-bottom: 5px;
//           }
          
//           .main-header .subtitle {
//             font-size: 20px;
//             color: #0f4c81;
//             margin-bottom: 30px;
//           }
          
//           .description {
//             font-size: 14px;
//             line-height: 1.6;
//             color: #555;
//             text-align: justify;
//             margin-bottom: 35px;
//           }
          
//           .main-section-title {
//             font-size: 20px;
//             font-weight: 600;
//             color: #333;
//             margin-bottom: 25px;
//             display: flex;
//             align-items: center;
//             position: relative;
//             padding-bottom: 10px;
//             border-bottom: 2px solid #0f4c81;
//           }
          
//           .main-section-title::before {
//             content: '';
//             width: 12px;
//             height: 12px;
//             background-color: #0f4c81;
//             border-radius: 50%;
//             margin-right: 15px;
//           }
          
//           .work-item, .education-item {
//             margin-bottom: 8px;
//             background: #f8f9fa;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//             transition: all 0.3s ease;
//           }
          
//           .work-item:hover, .education-item:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 8px 25px rgba(0,0,0,0.15);
//             background: #ffffff;
//           }
          
//           .job-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             margin-bottom: 12px;
//           }
          
//           .job-title {
//             font-size: 16px;
//             font-weight: 600;
//             color: #333;
//             margin-bottom: 5px;
//           }
          
//           .company {
//             font-size: 14px;
//             color: #0f4c81;
//             font-style: italic;
//             font-weight: 500;
//           }
          
//           .job-dates {
//             font-size: 14px;
//             color: #888;
//             text-align: right;
//             line-height: 1.3;
//           }
          
//           .job-description {
//             margin-top: 10px;
//             font-size: 13px;
//             color: #666;
//             line-height: 1.4;
//           }

//           @media print {
//             @page {
//               margin: 0;
//               size: A4;
//             }
            
//             .cv-print-wrapper {
//               display: block !important;
//               position: relative !important;
//               top: auto !important;
//               left: auto !important;
//               width: 100% !important;
//               margin: 0 !important;
//               padding: 0 !important;
//               background: white !important;
//             }
            
//             body {
//               background: white;
//               margin: 0;
//               padding: 0;
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//               font-size: 11px;
//               line-height: 1.3;
//             }
            
//             .resume-container {
//               box-shadow: none;
//               max-width: none;
//               width: 100%;
//               display: flex !important;
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//               min-height: auto;
//               height: auto;
//               page-break-inside: avoid;
//               break-inside: avoid;
//             }
            
//             .sidebar {
//               background-color: #0f4c81 !important;
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//               color: white !important;
//               width: 265px;
//               padding: 23px 21px;
//               page-break-inside: avoid;
//               break-inside: avoid;
//             }
            
//             .main-content {
//               padding: 23px 27px;
//               page-break-inside: avoid;
//               break-inside: avoid;
//             }
            
//             .skill-bar {
//               background-color: #1a5a9a !important;
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//               height: 6px;
//             }
            
//             .skill-progress {
//               background-color: #87ceeb !important;
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//             }
            
//             .contact-icon {
//               color: #87ceeb !important;
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//             }
            
//             .main-section-title::before {
//               background-color: #0f4c81 !important;
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//               width: 10px;
//               height: 10px;
//             }
            
//             .main-header h1 {
//               font-size: 36px;
//               margin-bottom: 7px;
//             }
            
//             .main-header .subtitle {
//               font-size: 17px;
//               margin-bottom: 23px;
//             }
            
//             .description {
//               font-size: 11px;
//               line-height: 1.4;
//               margin-bottom: 26px;
//             }
            
//             .section-title {
//               font-size: 16px;
//               margin-bottom: 16px;
//               margin-top: 25px;
//             }
            
//             .section-title:first-of-type {
//               margin-top: 0;
//             }
            
//             .main-section-title {
//               font-size: 18px;
//               margin-bottom: 12px;
//               margin-top: 20px;
//             }
            
//             .skill-item {
//               margin-bottom: 11px;
//             }
            
//             .work-item, .education-item {
//               margin-bottom: 8px;
//               background: #f8f9fa !important;
//               padding: 15px !important;
//               border-radius: 6px !important;
//               box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
//             }
            
//             .job-description {
//               margin-top: 8px !important;
//               font-size: 10px !important;
//               color: #666 !important;
//               line-height: 1.3 !important;
//             }
            
//             .job-dates {
//               font-size: 11px !important;
//               color: #888 !important;
//               text-align: right !important;
//               line-height: 1.2 !important;
//             }
            
//             .contact-item {
//               margin-bottom: 8px;
//               font-size: 11px;
//             }
            
//             .skill-name, .language-item, .interest-item, .certificate-item {
//               font-size: 11px;
//             }
            
//             .job-title {
//               font-size: 13px;
//             }
            
//             .company {
//               font-size: 11px;
//             }
            
//             .contact-info {
//               margin-bottom: 23px;
//             }
            
//             * {
//               -webkit-print-color-adjust: exact;
//               color-adjust: exact;
//               page-break-inside: avoid;
//               break-inside: avoid;
//             }
//           }
//         `}</style>

//         {/* Resume Container - Exact replica of original HTML structure */}
//         <div className="resume-container">
          
//           {/* Sidebar */}
//           <div className="sidebar">
//             <div className="contact-info">
//               {visibleSections.contact && contactInfo.map((item, index) => (
//                 <div key={index} className="contact-item">
//                   <span className="contact-icon">{item.icon}</span>
//                   {item.type === 'phone' || item.type === 'email' || item.type === 'linkedin' ? (
//                     <a href={getContactHref(item)} className="hover:underline">
//                       {item.text}
//                     </a>
//                   ) : (
//                     <span>{item.text}</span>
//                   )}
//                 </div>
//               ))}
//             </div>
            
//             <h3 className="section-title">Skills</h3>
//             {visibleSections.skills && skills.map((skill, index) => (
//               <div 
//                 key={skill.name} 
//                 className="skill-item" 
//                 data-skill-level={`${getSkillLevel(skill.level)} (${skill.level}%)`}
//               >
//                 <div className="skill-name">{skill.name}</div>
//                 <div className="skill-bar">
//                   <div 
//                     className="skill-progress" 
//                     style={{ 
//                       width: animatedBars.has(skill.name) ? `${skill.level}%` : '0%',
//                       '--skill-width': `${skill.level}%`,
//                       animationDelay: `${2 + (index * 0.1)}s`
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
            
//             <h3 className="section-title">Languages</h3>
//             {visibleSections.languages && languages.map((language, index) => (
//               <div key={index} className="language-item">{language}</div>
//             ))}
            
//             <h3 className="section-title">Interests</h3>
//             {visibleSections.interests && interests.map((interest, index) => (
//               <div key={index} className="interest-item">{interest}</div>
//             ))}
            
//             <h3 className="section-title">Certificates</h3>
//             {visibleSections.certificates && certificates.map((certificate, index) => (
//               <div key={index} className="certificate-item">{certificate}</div>
//             ))}
//           </div>
          
//           {/* Main Content */}
//           <div className="main-content">
//             <div className="main-header">
//               <h1>{personalInfo.name}</h1>
//               <div className="subtitle">{personalInfo.title}</div>
//             </div>
            
//             <div className="description">
//               {personalInfo.description}
//             </div>
            
//             <h2 className="main-section-title">Work history</h2>
            
//             {visibleSections.workHistory && workExperience.map((job, index) => (
//               <div key={index} className="work-item">
//                 <div className="job-header">
//                   <div>
//                     <div className="job-title">{job.title}</div>
//                     <div className="company">{job.company}</div>
//                   </div>
//                   <div className="job-dates" dangerouslySetInnerHTML={{ __html: job.period.replace(' - ', '<br>') }}></div>
//                 </div>
//                 <div className="job-description">
//                   {job.description}
//                 </div>
//               </div>
//             ))}
            
//             <h2 className="main-section-title">Education</h2>
            
//             {visibleSections.education && education.map((edu, index) => (
//               <div key={index} className="education-item">
//                 <div className="job-header">
//                   <div>
//                     <div className="job-title">{edu.degree}</div>
//                     <div className="company">{edu.institution}</div>
//                   </div>
//                   <div className="job-dates" dangerouslySetInnerHTML={{ __html: edu.period.replace(' - ', '<br>') }}></div>
//                 </div>
//                 <div className="job-description">
//                   {edu.description}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// Resume.displayName = 'Resume';

// export default Resume;