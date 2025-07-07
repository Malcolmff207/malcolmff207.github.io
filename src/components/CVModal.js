import React, { useRef } from 'react';
import { FaDownload, FaPrint, FaTimes } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import Resume from './Resume';

const CVModal = ({ isOpen, onClose }) => {
  const printRef = useRef();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open(
      '',
      '',
      'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
    );

    windowPrint.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Malcolm Fenech – Resume</title>
          <style>
            /* Reset and A4 setup */
            @page { 
              size: A4; 
              margin: 0;
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            html, body {
              margin: 0;
              padding: 0;
              width: 210mm;
              height: 297mm;
            }
            
            /* A4 dimensions */
            .a4-page {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              background: white;
              display: flex;
            }
            
            /* Sidebar styling */
            .sidebar {
              width: 35%;
              background-color: #0f4c81;
              color: white;
              padding: 20px;
              height: 297mm;
            }
            
            /* Main content */
            .main-content {
              width: 65%;
              padding: 20px 25px;
              height: 297mm;
              overflow: hidden;
            }
            
            /* Typography */
            h1 {
              font-size: 42px;
              font-weight: 300;
              margin-bottom: 5px;
              color: #333;
            }
            
            .subtitle {
              font-size: 20px;
              color: #0f4c81;
              margin-bottom: 20px;
            }
            
            h2 {
              font-size: 18px;
              font-weight: 600;
              color: #333;
              margin: 20px 0 15px 0;
              padding-bottom: 5px;
              border-bottom: 2px solid #0f4c81;
              display: flex;
              align-items: center;
            }
            
            h2::before {
              content: '';
              width: 10px;
              height: 10px;
              background-color: #0f4c81;
              border-radius: 50%;
              margin-right: 10px;
            }
            
            h3 {
              font-size: 16px;
              font-weight: 600;
              margin: 20px 0 10px 0;
              color: white;
            }
            
            /* Contact info */
            .contact-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              font-size: 12px;
              color: #e8f4ff;
            }
            
            .contact-item span:first-child {
              margin-right: 8px;
            }
            
            /* Skills */
            .skill-item {
              margin-bottom: 10px;
            }
            
            .skill-name {
              font-size: 12px;
              color: #e8f4ff;
              margin-bottom: 3px;
            }
            
            .skill-bar {
              width: 100%;
              height: 6px;
              background-color: #1a5a9a;
              border-radius: 3px;
              overflow: hidden;
            }
            
            .skill-progress {
              height: 100%;
              background-color: #87ceeb;
              border-radius: 3px;
            }
            
            /* Lists */
            .list-item {
              font-size: 12px;
              color: #e8f4ff;
              margin-bottom: 6px;
            }
            
            /* Work and Education items */
            .experience-item {
              background-color: #f8f9fa;
              padding: 12px;
              margin-bottom: 12px;
              border-radius: 6px;
            }
            
            .experience-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 6px;
            }
            
            .experience-title {
              font-size: 14px;
              font-weight: 600;
              color: #333;
            }
            
            .experience-company {
              font-size: 12px;
              color: #0f4c81;
              font-style: italic;
            }
            
            .experience-period {
              font-size: 12px;
              color: #888;
            }
            
            .experience-description {
              font-size: 12px;
              color: #666;
              line-height: 1.4;
            }
            
            .description {
              font-size: 13px;
              line-height: 1.5;
              color: #555;
              text-align: justify;
              margin-bottom: 20px;
            }
            
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              
              .a4-page {
                page-break-after: avoid;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 250);
  };

    const handleDownload = () => {
        const fileName = 'Malcolm Fenech Resume.pdf';
        const link = document.createElement('a');
        
        link.href = '/Resume.pdf';
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="flex items-center justify-center min-h-full p-4">
        <div className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/70 transition-colors duration-300" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Resume Preview</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">View and download your professional resume</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handlePrint} 
                className="flex items-center bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <FaPrint className="mr-2" />Print
              </button>
              <button 
                onClick={handleDownload} 
                className="flex items-center bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
              >
                <FaDownload className="mr-2" />Download PDF
              </button>
              <button 
                onClick={onClose} 
                className="p-2 text-gray-400 dark:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-5 overflow-y-auto max-h-[80vh] transition-colors duration-300">
            <Resume ref={printRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVModal;