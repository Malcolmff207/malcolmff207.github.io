// hooks/useDebounce.js
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to debounce a value
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - Debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook to debounce a callback function
 * @param {function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {array} dependencies - Dependencies array for the callback
 * @returns {function} - Debounced callback function
 */
export const useDebouncedCallback = (callback, delay, dependencies = []) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay, ...dependencies]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Cancel function to manually cancel the debounced call
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Flush function to immediately execute the debounced function
  const flush = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    callback(...args);
  }, [callback]);

  return { debouncedCallback, cancel, flush };
};

/**
 * Hook for debounced search functionality
 * @param {string} searchTerm - Search term to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {number} minLength - Minimum length before search triggers
 * @returns {object} - Search state and controls
 */
export const useDebouncedSearch = (searchTerm, delay = 300, minLength = 2) => {
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm.length < minLength) {
      setDebouncedTerm('');
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsSearching(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay, minLength]);

  return {
    debouncedTerm,
    isSearching,
    shouldSearch: debouncedTerm.length >= minLength
  };
};

/**
 * Hook for debounced form validation
 * @param {object} formData - Form data object
 * @param {function} validator - Validation function
 * @param {number} delay - Delay in milliseconds
 * @returns {object} - Validation state
 */
export const useDebouncedValidation = (formData, validator, delay = 500) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValidating(true);

    const handler = setTimeout(() => {
      const validationErrors = validator(formData);
      setErrors(validationErrors);
      setIsValid(Object.keys(validationErrors).length === 0);
      setIsValidating(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [formData, validator, delay]);

  return { errors, isValidating, isValid };
};

/**
 * Hook for debounced API calls
 * @param {function} apiCall - API function to call
 * @param {any} trigger - Value that triggers the API call
 * @param {number} delay - Delay in milliseconds
 * @param {array} dependencies - Additional dependencies
 * @returns {object} - API call state
 */
export const useDebouncedAPI = (apiCall, trigger, delay = 500, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const handler = setTimeout(async () => {
      try {
        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();
        
        const result = await apiCall(trigger, abortControllerRef.current.signal);
        
        if (!abortControllerRef.current.signal.aborted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!abortControllerRef.current.signal.aborted) {
          setError(err);
          setLoading(false);
        }
      }
    }, delay);

    return () => {
      clearTimeout(handler);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [trigger, delay, ...dependencies]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { data, loading, error };
};

/**
 * Hook for debounced window resize handling
 * @param {function} callback - Callback to execute on resize
 * @param {number} delay - Delay in milliseconds
 * @returns {object} - Window dimensions and loading state
 */
export const useDebouncedResize = (callback, delay = 250) => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [isResizing, setIsResizing] = useState(false);

  const debouncedCallback = useDebouncedCallback(() => {
    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    setDimensions(newDimensions);
    setIsResizing(false);
    
    if (callback) {
      callback(newDimensions);
    }
  }, delay);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsResizing(true);
      debouncedCallback.debouncedCallback();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return { dimensions, isResizing };
};

/**
 * Hook for debounced input with immediate visual feedback
 * @param {string} initialValue - Initial input value
 * @param {number} delay - Delay in milliseconds
 * @returns {object} - Input state and handlers
 */
export const useDebouncedInput = (initialValue = '', delay = 300) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (inputValue === debouncedValue) {
      setIsPending(false);
      return;
    }

    setIsPending(true);

    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, debouncedValue, delay]);

  const handleChange = useCallback((e) => {
    const value = e.target ? e.target.value : e;
    setInputValue(value);
  }, []);

  const reset = useCallback((value = initialValue) => {
    setInputValue(value);
    setDebouncedValue(value);
    setIsPending(false);
  }, [initialValue]);

  return {
    inputValue,
    debouncedValue,
    isPending,
    handleChange,
    reset,
    setValue: setInputValue
  };
};

/**
 * Hook for debounced scroll handling
 * @param {function} callback - Callback to execute on scroll
 * @param {number} delay - Delay in milliseconds
 * @returns {object} - Scroll state
 */
export const useDebouncedScroll = (callback, delay = 100) => {
  const [scrollY, setScrollY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);
  const [isScrolling, setIsScrolling] = useState(false);

  const debouncedCallback = useDebouncedCallback((scrollPosition) => {
    setScrollY(scrollPosition);
    setIsScrolling(false);
    
    if (callback) {
      callback(scrollPosition);
    }
  }, delay);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolling(true);
      debouncedCallback.debouncedCallback(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return { scrollY, isScrolling };
};