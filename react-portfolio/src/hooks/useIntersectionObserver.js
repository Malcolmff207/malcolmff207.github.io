// hooks/useIntersectionObserver.js
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Intersection Observer API
 * @param {object} options - Intersection Observer options
 * @returns {object} - Ref, intersection state, and entry details
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: false,
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
        
        // If triggerOnce is true, disconnect after first intersection
        if (defaultOptions.triggerOnce) {
          observer.disconnect();
        }
      }
    }, defaultOptions);

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasIntersected, defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce]);

  // Method to manually disconnect observer
  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  // Method to manually observe an element
  const observe = useCallback((element) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  }, []);

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected,
    entry,
    disconnect,
    observe
  };
};

/**
 * Hook for observing multiple elements
 * @param {object} options - Intersection Observer options
 * @returns {object} - Methods and state for multiple elements
 */
export const useIntersectionObserverMultiple = (options = {}) => {
  const [entries, setEntries] = useState(new Map());
  const observerRef = useRef(null);
  const elementsRef = useRef(new Map());

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  };

  useEffect(() => {
    if (!window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver((observerEntries) => {
      setEntries(prev => {
        const newEntries = new Map(prev);
        observerEntries.forEach(entry => {
          const elementId = entry.target.dataset.observerId;
          if (elementId) {
            newEntries.set(elementId, {
              isIntersecting: entry.isIntersecting,
              entry: entry,
              hasIntersected: prev.get(elementId)?.hasIntersected || entry.isIntersecting
            });
          }
        });
        return newEntries;
      });
    }, defaultOptions);

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [defaultOptions.threshold, defaultOptions.rootMargin]);

  // Method to register an element for observation
  const registerElement = useCallback((id, element) => {
    if (!element || !observerRef.current) return;

    // Set data attribute for identification
    element.dataset.observerId = id;
    
    // Store reference
    elementsRef.current.set(id, element);
    
    // Start observing
    observerRef.current.observe(element);
  }, []);

  // Method to unregister an element
  const unregisterElement = useCallback((id) => {
    const element = elementsRef.current.get(id);
    if (element && observerRef.current) {
      observerRef.current.unobserve(element);
      elementsRef.current.delete(id);
      setEntries(prev => {
        const newEntries = new Map(prev);
        newEntries.delete(id);
        return newEntries;
      });
    }
  }, []);

  // Helper to get ref callback for specific ID
  const getRef = useCallback((id) => {
    return (element) => {
      if (element) {
        registerElement(id, element);
      } else {
        unregisterElement(id);
      }
    };
  }, [registerElement, unregisterElement]);

  // Helper to check if specific element is intersecting
  const isIntersecting = useCallback((id) => {
    return entries.get(id)?.isIntersecting || false;
  }, [entries]);

  // Helper to check if specific element has ever intersected
  const hasIntersected = useCallback((id) => {
    return entries.get(id)?.hasIntersected || false;
  }, [entries]);

  return {
    entries,
    registerElement,
    unregisterElement,
    getRef,
    isIntersecting,
    hasIntersected
  };
};

/**
 * Hook for triggering animations when elements come into view
 * @param {object} options - Intersection Observer options
 * @returns {object} - Animation state and ref
 */
export const useIntersectionAnimation = (options = {}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
    ...options
  });

  useEffect(() => {
    if (hasIntersected) {
      setShouldAnimate(true);
    }
  }, [hasIntersected]);

  return {
    ref,
    shouldAnimate,
    isIntersecting,
    hasIntersected
  };
};

/**
 * Hook for lazy loading images or content
 * @param {string} src - Image source URL
 * @param {object} options - Intersection Observer options
 * @returns {object} - Lazy loading state and ref
 */
export const useLazyLoad = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
    ...options
  });

  useEffect(() => {
    if (hasIntersected && src && !imageSrc) {
      setImageSrc(src);
    }
  }, [hasIntersected, src, imageSrc]);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };
    
    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };
    
    img.src = imageSrc;
  }, [imageSrc]);

  return {
    ref,
    src: imageSrc,
    isLoaded,
    isError,
    hasIntersected
  };
};

/**
 * Hook for viewport-based animations with CSS classes
 * @param {string} animationClass - CSS class to apply when in view
 * @param {object} options - Intersection Observer options
 * @returns {object} - Animation state and ref
 */
export const useViewportAnimation = (animationClass = 'animate-in', options = {}) => {
  const [className, setClassName] = useState('');
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
    ...options
  });

  useEffect(() => {
    if (hasIntersected) {
      setClassName(animationClass);
    }
  }, [hasIntersected, animationClass]);

  return {
    ref,
    className,
    isIntersecting,
    hasIntersected
  };
};