import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import { useSectionLoading } from '../hooks/useLoading';
import { ContactFormSkeleton } from './skeletons';
import SuccessModal from './SuccessModal';

const ContactForm = () => {
  const { loadingStates, setSectionLoading } = useSectionLoading({
    form: true,
    validation: false
  });

  // State management
  const [lastSubmission, setLastSubmission] = useState(null);
  const [formStartTime, setFormStartTime] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedUserName, setSubmittedUserName] = useState('');

  const RATE_LIMIT_MS = 60000; // 1 minute rate limit

  // EmailJS configuration - Replace with your actual values
  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  };

  // Subject options (these will be the subjects)
  const SUBJECT_OPTIONS = [
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Job Opportunity', label: 'Job Opportunity' },
    { value: 'Feedback', label: 'Feedback' },
    { value: 'Technical Question', label: 'Technical Question' },
    { value: 'Other', label: 'Other' }
  ];

  const initialValues = {
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  };

  const formValidationRules = {
    name: [
      validationRules.required('Name is required'),
      validationRules.minLength(2, 'Name must be at least 2 characters'),
      validationRules.maxLength(50, 'Name must be less than 50 characters')
    ],
    email: [
      validationRules.required('Email is required'),
      validationRules.email('Please enter a valid email address')
    ],
    subject: [
      validationRules.required('Please select a subject')
    ],
    message: [
      validationRules.required('Message is required'),
      validationRules.minLength(20, 'Message must be at least 20 characters'),
      validationRules.maxLength(2000, 'Message must be less than 2000 characters')
    ]
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit,
    setSubmitStatus,
    resetForm
  } = useFormValidation(initialValues, formValidationRules);

  // Track form start time for analytics
  useEffect(() => {
    setFormStartTime(Date.now());
    trackFormEvent('form_start');
  }, []);

  // Simulate loading form configuration
  useEffect(() => {
    const loadFormConfig = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSectionLoading('form', false);
      } catch (error) {
        console.error('Error loading form config:', error);
        setSectionLoading('form', false);
      }
    };
    
    loadFormConfig();
  }, [setSectionLoading]);

  // Rate limiting hook
  const checkRateLimit = () => {
    const now = Date.now();
    if (lastSubmission && (now - lastSubmission) < RATE_LIMIT_MS) {
      const remainingTime = Math.ceil((RATE_LIMIT_MS - (now - lastSubmission)) / 1000);
      throw new Error(`Please wait ${remainingTime} seconds before sending another message.`);
    }
    return true;
  };

  // Form analytics and tracking
  const trackFormEvent = (eventName, data = {}) => {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'contact_form',
        event_label: data.subject || 'unknown',
        value: data.formTime || 0,
        ...data
      });
    }
    
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', eventName, data);
    }
    
    // Custom analytics
    console.log(`Form Event: ${eventName}`, {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...data
    });
  };

  // Form submission
  const onSubmit = async (formData) => {
    try {
      // Check rate limit
      checkRateLimit();

      // Initialize EmailJS if not already done
      if (!emailjs.init) {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      }

      // Calculate form completion time
      const formTime = formStartTime ? Math.round((Date.now() - formStartTime) / 1000) : 0;

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Malcolm Fenech',
        reply_to: formData.email,
        sent_at: new Date().toLocaleString(),
        form_completion_time: `${formTime} seconds`,
        user_agent: navigator.userAgent.substring(0, 100),
        referrer: document.referrer || 'Direct'
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);

      // Track successful submission
      trackFormEvent('form_submit_success', {
        subject: formData.subject,
        formTime: formTime,
        messageLength: formData.message.length
      });

      // Update rate limit
      setLastSubmission(Date.now());
      
      // Store user name for modal
      setSubmittedUserName(formData.name);
      
      return { success: true, message: 'Message sent successfully!' };
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Track form error
      trackFormEvent('form_submit_error', {
        error: error.message,
        errorCode: error.status,
        subject: formData.subject
      });
      
      // Enhanced error handling
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.status === 400) {
        errorMessage = 'Invalid email configuration. Please contact support.';
      } else if (error.status === 401) {
        errorMessage = 'Email service authentication failed.';
      } else if (error.status === 403) {
        errorMessage = 'Email service access denied.';
      } else if (error.status === 413) {
        errorMessage = 'Message too large. Please shorten your message.';
      } else if (error.status === 429) {
        errorMessage = 'Too many requests. Please wait before sending another message.';
      } else if (error.text) {
        errorMessage = error.text;
      } else if (error.message.includes('wait')) {
        errorMessage = error.message; // Rate limit message
      }
      
      throw new Error(errorMessage);
    }
  };

  // Handle form submission with success modal
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const success = await handleSubmit(onSubmit);
      if (success) {
        // Show success modal instead of status message
        setShowSuccessModal(true);
        
        // Reset form after showing modal
        setTimeout(() => {
          resetForm();
          setFormStartTime(Date.now());
        }, 1000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus(`❌ ${error.message || 'Failed to send message. Please try again.'}`);
      setTimeout(() => setSubmitStatus(''), 7000);
    }
  };

  // Fallback email handler
  const handleEmailFallback = () => {
    const emailContent = `
To: malcolmff207@gmail.com
Subject: ${values.subject}

From: ${values.name} (${values.email})

${values.message}
    `.trim();
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailContent).then(() => {
        setSubmitStatus('📋 Email content copied to clipboard. Please paste it into your email client.');
      }).catch(() => {
        openEmailClient();
      });
    } else {
      openEmailClient();
    }
  };

  const openEmailClient = () => {
    const mailtoLink = `mailto:malcolmff207@gmail.com?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(`From: ${values.name} (${values.email})\n\n${values.message}`)}`;
    window.open(mailtoLink);
    setSubmitStatus('📧 Opening your email client...');
  };

  // Icon components
  const SendIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  const MessageIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const ErrorIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const SubjectIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
    </svg>
  );

  // Show skeleton while loading
  if (loadingStates.form) {
    return (
      <div aria-busy="true" aria-label="Loading contact form">
        <span className="sr-only">Loading contact form, please wait...</span>
        <ContactFormSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="lg:col-span-2 animate-in fade-in slide-in-from-left duration-700">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col">
          <div className="flex items-center mb-6">
            <div className="text-blue-600 dark:text-blue-400 mr-3">
              <MessageIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Send a Message</h2>
          </div>
          
          {submitStatus && (
            <div className={`mb-6 p-4 border rounded-lg flex items-start animate-in fade-in slide-in-from-top duration-300 ${
              submitStatus.includes('📋') || submitStatus.includes('📧')
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
                : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700'
            }`}>
              <div className={`mr-3 mt-0.5 ${
                submitStatus.includes('📋') || submitStatus.includes('📧')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <ErrorIcon />
              </div>
              <div className="flex-1">
                <p className={`${
                  submitStatus.includes('📋') || submitStatus.includes('📧')
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {submitStatus}
                </p>
                {submitStatus.includes('❌') && (
                  <button
                    onClick={handleEmailFallback}
                    className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
                  >
                    Try alternative method
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6 flex-1 flex flex-col">
            <div className="flex-1 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="animate-in fade-in slide-in-from-bottom duration-500 animation-delay-100">
                  <label className="block text-gray-900 dark:text-gray-200 font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all ${
                      touched.name && errors.name ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Your full name"
                    disabled={isSubmitting}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-in fade-in">{errors.name}</p>
                  )}
                </div>
                
                <div className="animate-in fade-in slide-in-from-bottom duration-500 animation-delay-200">
                  <label className="block text-gray-900 dark:text-gray-200 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all ${
                      touched.email && errors.email ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-in fade-in">{errors.email}</p>
                  )}
                </div>
              </div>
              
              {/* Subject Selection */}
              <div className="animate-in fade-in slide-in-from-bottom duration-500 animation-delay-300">
                <label className="block text-gray-900 dark:text-gray-200 font-medium mb-2">
                  <div className="flex items-center">
                    <span className="ml-2">Subject *</span>
                  </div>
                </label>
                <select 
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all ${
                    touched.subject && errors.subject ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  disabled={isSubmitting}
                >
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {touched.subject && errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-in fade-in">{errors.subject}</p>
                )}
              </div>
              
              <div className="flex-1 animate-in fade-in slide-in-from-bottom duration-500 animation-delay-400">
                <label className="block text-gray-900 dark:text-gray-200 font-medium mb-2">
                  Message *
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-2">
                    ({values.message.length}/2000 characters)
                  </span>
                </label>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-full min-h-[140px] px-4 py-3 bg-white dark:bg-gray-700 border rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-none ${
                    touched.message && errors.message ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Tell me about the role, company culture, or any questions you have about my background..."
                  disabled={isSubmitting}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-in fade-in">{errors.message}</p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center space-x-2 mt-6 animate-in fade-in scale-in duration-500 animation-delay-500 ${
                isSubmitting 
                  ? 'bg-gray-500 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <SendIcon />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <a 
                href="https://www.emailjs.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xs"
              >
                Powered by EmailJS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        senderName={submittedUserName}
      />
    </>
  );
};

export default ContactForm;