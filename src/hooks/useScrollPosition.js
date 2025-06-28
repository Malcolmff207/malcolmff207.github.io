import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track scroll position and direction
 * @param {number} throttleMs - Throttle scroll events (default: 100ms)
 * @returns {object} - Scroll position data
 */
export const useScrollPosition = (throttleMs = 100) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const updateScrollPosition = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    
    // Update scroll positions
    setScrollY(currentScrollY);
    setScrollX(currentScrollX);
    
    // Determine if page is scrolled
    setIsScrolled(currentScrollY > 0);
    
    // Determine scroll direction (only if there's significant movement)
    const scrollDifference = currentScrollY - scrollY;
    
    if (Math.abs(scrollDifference) > 5) { // Threshold to avoid micro-movements
      if (scrollDifference > 0) {
        setScrollDirection('down');
        setIsScrollingDown(true);
        setIsScrollingUp(false);
      } else {
        setScrollDirection('up');
        setIsScrollingDown(false);
        setIsScrollingUp(true);
      }
    }
  }, [scrollY]);

  useEffect(() => {
    // Set initial scroll position
    setScrollY(window.scrollY);
    setScrollX(window.scrollX);
    setIsScrolled(window.scrollY > 0);

    let timeoutId = null;

    const handleScroll = () => {
      // Throttle scroll events
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(updateScrollPosition, throttleMs);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateScrollPosition, throttleMs]);

  return {
    scrollY,
    scrollX,
    scrollDirection,
    isScrolled,
    isScrollingDown,
    isScrollingUp
  };
};

/**
 * Hook to detect when user has scrolled past a certain point
 * @param {number} threshold - Y position threshold (default: 100)
 * @returns {boolean} - Whether user has scrolled past threshold
 */
export const useScrollThreshold = (threshold = 100) => {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolledPast(window.scrollY > threshold);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hasScrolledPast;
};

/**
 * Hook to get scroll progress as percentage
 * @returns {number} - Scroll progress from 0 to 100
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    handleScroll(); // Set initial value
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

/**
 * Hook to hide/show element based on scroll direction
 * @param {number} threshold - Minimum scroll distance to trigger hide/show
 * @returns {boolean} - Whether element should be visible
 */
export const useScrollHide = (threshold = 100) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide if near top of page
      if (currentScrollY < threshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true);  // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return isVisible;
};