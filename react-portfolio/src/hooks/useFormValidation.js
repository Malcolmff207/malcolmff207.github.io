// hooks/useFormValidation.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for form validation and state management
 * @param {object} initialValues - Initial form values
 * @param {object} validationRules - Validation rules for each field
 * @returns {object} - Form state and handlers
 */
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return '';
  }, [validationRules]);

  // Validate all fields
  const validateAllFields = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error when user starts typing (only if field was touched)
    if (touched[name] && errors[name]) {
      const fieldError = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  }, [errors, touched, validateField]);

  // Handle input blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  }, [validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (submitFunction) => {
    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!validateAllFields()) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await submitFunction(values);
      setSubmitStatus('success');
      return true;
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateAllFields, initialValues]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitStatus('');
    setIsSubmitting(false);
  }, [initialValues]);

  // Set a specific field value
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate if field was already touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  }, [touched, validateField]);

  // Get field props for easier integration
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : '',
    hasError: !!(touched[name] && errors[name])
  }), [values, handleChange, handleBlur, errors, touched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setSubmitStatus,
    getFieldProps,
    isValid: Object.keys(errors).length === 0
  };
};

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message;
    }
    return '';
  },
  
  email: (message = 'Please enter a valid email address') => (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return message;
    }
    return '';
  },
  
  minLength: (min, message) => (value) => {
    if (!message) {
      message = `Must be at least ${min} characters`;
    }
    if (value && value.length < min) {
      return message;
    }
    return '';
  },
  
  maxLength: (max, message) => (value) => {
    if (!message) {
      message = `Must be no more than ${max} characters`;
    }
    if (value && value.length > max) {
      return message;
    }
    return '';
  },
  
  pattern: (regex, message = 'Invalid format') => (value) => {
    if (value && !regex.test(value)) {
      return message;
    }
    return '';
  },
  
  phone: (message = 'Please enter a valid phone number') => (value) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
      return message;
    }
    return '';
  }
};