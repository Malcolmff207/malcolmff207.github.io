import React from 'react';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const formValidationRules = {
    name: [
      validationRules.required('Name is required'),
      validationRules.minLength(2, 'Name must be at least 2 characters')
    ],
    email: [
      validationRules.required('Email is required'),
      validationRules.email('Please enter a valid email address')
    ],
    subject: [
      validationRules.required('Subject is required')
    ],
    message: [
      validationRules.required('Message is required'),
      validationRules.minLength(10, 'Message must be at least 10 characters')
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
    setSubmitStatus
  } = useFormValidation(initialValues, formValidationRules);

  const onSubmit = async (formData) => {
    // Simulate form submission - replace with your actual submission logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSubmit(onSubmit);
    if (success) {
      setSubmitStatus('Message sent successfully! I\'ll get back to you soon.');
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  // Icon components using SVG
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

  const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg flex flex-col">
        <div className="flex items-center mb-6">
          <div className="text-blue-600 mr-3">
            <MessageIcon />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>
        </div>
        
        {submitStatus && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <div className="text-green-600 mr-2">
              <CheckIcon />
            </div>
            <p className="text-green-700">{submitStatus}</p>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6 flex-1 flex flex-col">
          <div className="flex-1 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    touched.name && errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    touched.email && errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.subject && errors.subject ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="What's this about?"
              />
              {touched.subject && errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
              )}
            </div>
            
            <div className="flex-1">
              <label className="block text-gray-900 font-medium mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full h-full min-h-[120px] px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  touched.message && errors.message ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Tell me about the role, company culture, or any questions you have about my background..."
              />
              {touched.message && errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center space-x-2 mt-6 ${
              isSubmitting 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <SendIcon />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;