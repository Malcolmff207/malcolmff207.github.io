import { useState, useEffect } from 'react';

/**
 * Custom hook to listen to media query changes
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (SSR compatibility)
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add listener
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        // Fallback for older browsers
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

/**
 * Hook for common breakpoints
 * @returns {object} - Object with boolean values for each breakpoint
 */
export const useBreakpoint = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isSmall = useMediaQuery('(max-width: 768px)');
  const isMedium = useMediaQuery('(min-width: 769px) and (max-width: 1200px)');
  const isLarge = useMediaQuery('(min-width: 1201px)');

  // Tailwind CSS breakpoints
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');
  const is2Xl = useMediaQuery('(min-width: 1536px)');

  return {
    // General breakpoints
    isMobile,
    isTablet,
    isDesktop,
    isSmall,
    isMedium,
    isLarge,
    
    // Tailwind breakpoints
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    
    // Device orientation
    isLandscape: useMediaQuery('(orientation: landscape)'),
    isPortrait: useMediaQuery('(orientation: portrait)'),
    
    // High-DPI displays
    isRetina: useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'),
    
    // Reduced motion preference
    prefersReducedMotion: useMediaQuery('(prefers-reduced-motion: reduce)'),
    
    // Dark mode preference
    prefersDark: useMediaQuery('(prefers-color-scheme: dark)'),
    
    // Print media
    isPrint: useMediaQuery('print')
  };
};

/**
 * Hook to get current screen size category
 * @returns {string} - Screen size category: 'mobile', 'tablet', or 'desktop'
 */
export const useScreenSize = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  
  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
};

/**
 * Hook for container queries (experimental - requires CSS Container Queries support)
 * @param {string} query - Container query string
 * @param {object} containerRef - Ref to the container element
 * @returns {boolean} - Whether the container query matches
 */
export const useContainerQuery = (query, containerRef) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !window.matchMedia) {
      return;
    }

    // This is a simplified implementation
    // Real container queries would need ResizeObserver
    const checkQuery = () => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      
      // Simple width-based matching (extend as needed)
      if (query.includes('min-width')) {
        const minWidth = parseInt(query.match(/min-width:\s*(\d+)px/)?.[1] || '0');
        setMatches(width >= minWidth);
      } else if (query.includes('max-width')) {
        const maxWidth = parseInt(query.match(/max-width:\s*(\d+)px/)?.[1] || '0');
        setMatches(width <= maxWidth);
      }
    };

    // Check initially
    checkQuery();

    // Use ResizeObserver for container size changes
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(checkQuery);
      resizeObserver.observe(containerRef.current);
      
      return () => {
        resizeObserver.disconnect();
      };
    }

    // Fallback to window resize
    window.addEventListener('resize', checkQuery);
    return () => window.removeEventListener('resize', checkQuery);
  }, [query, containerRef]);

  return matches;
};

/**
 * Hook to detect hover capability (touch vs mouse devices)
 * @returns {boolean} - Whether the device supports hover
 */
export const useHoverCapability = () => {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
};

/**
 * Hook for responsive values based on breakpoints
 * @param {object} values - Object with breakpoint keys and corresponding values
 * @returns {any} - Current value based on active breakpoint
 */
export const useResponsiveValue = (values) => {
  const breakpoints = useBreakpoint();
  
  // Priority order: largest to smallest
  if (values['2xl'] !== undefined && breakpoints.is2Xl) return values['2xl'];
  if (values.xl !== undefined && breakpoints.isXl) return values.xl;
  if (values.lg !== undefined && breakpoints.isLg) return values.lg;
  if (values.md !== undefined && breakpoints.isMd) return values.md;
  if (values.sm !== undefined && breakpoints.isSm) return values.sm;
  
  // Default/mobile value
  return values.default || values.mobile || Object.values(values)[0];
};

/**
 * Hook to get window dimensions
 * @returns {object} - Window width and height
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial size
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};