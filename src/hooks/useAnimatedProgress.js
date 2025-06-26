import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animating progress values with easing
 * @param {number} targetValue - Target value to animate to (0-100)
 * @param {number} duration - Animation duration in milliseconds (default: 1000)
 * @param {number} delay - Delay before animation starts (default: 0)
 * @param {string} easing - Easing function type (default: 'easeOutCubic')
 * @returns {object} - Current animated value and animation state
 */
export const useAnimatedProgress = (
  targetValue, 
  duration = 1000, 
  delay = 0, 
  easing = 'easeOutCubic'
) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef();
  const targetRef = useRef(targetValue);

  // Easing functions
  const easingFunctions = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
    easeInSine: (t) => 1 - Math.cos(t * Math.PI / 2),
    easeOutSine: (t) => Math.sin(t * Math.PI / 2),
    easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    easeInBounce: (t) => 1 - easingFunctions.easeOutBounce(1 - t),
    easeOutBounce: (t) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  };

  // FIXED: React to target value changes
  useEffect(() => {
    // If target hasn't changed, don't restart animation
    if (targetRef.current === targetValue) return;
    
    targetRef.current = targetValue;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // If target is 0, reset immediately
    if (targetValue === 0) {
      setCurrentValue(0);
      setIsAnimating(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsAnimating(true);
      let startTime = null;
      const startValue = currentValue;
      const valueChange = targetValue - startValue;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing function
        const easingFunction = easingFunctions[easing] || easingFunctions.easeOutCubic;
        const easedProgress = easingFunction(progress);
        
        // Calculate current value
        const newValue = startValue + (valueChange * easedProgress);
        setCurrentValue(newValue);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setCurrentValue(targetValue); // Ensure we end at exact target
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, delay, easing]); // Removed currentValue from dependencies

  return { 
    currentValue: Math.round(currentValue * 100) / 100, // Round to 2 decimal places
    isAnimating,
    progress: targetValue > 0 ? currentValue / targetValue : 0
  };
};

/**
 * Hook for animating multiple progress values
 * @param {object} targets - Object with key-value pairs of progress targets
 * @param {number} duration - Animation duration
 * @param {number} staggerDelay - Delay between each animation start
 * @returns {object} - Object with current values for each target
 */
export const useAnimatedProgressMultiple = (targets, duration = 1000, staggerDelay = 100) => {
  const [values, setValues] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const animationPromises = [];

    Object.entries(targets).forEach(([key, targetValue], index) => {
      const delay = index * staggerDelay;
      
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          let startTime = null;
          const startValue = values[key] || 0;
          const valueChange = targetValue - startValue;
          
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Ease out cubic
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const newValue = startValue + (valueChange * easeOutCubic);
            
            setValues(prev => ({ ...prev, [key]: newValue }));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValues(prev => ({ ...prev, [key]: targetValue }));
              resolve();
            }
          };
          
          requestAnimationFrame(animate);
        }, delay);
      });
      
      animationPromises.push(promise);
    });

    Promise.all(animationPromises).then(() => {
      setIsAnimating(false);
    });
  }, [targets, duration, staggerDelay]);

  return { values, isAnimating };
};

/**
 * Hook for counter animation (numbers)
 * @param {number} target - Target number to count to
 * @param {number} duration - Animation duration
 * @param {number} delay - Delay before starting
 * @returns {object} - Current count value and animation state
 */
export const useAnimatedCounter = (target, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const targetRef = useRef(target);
  const animationRef = useRef();

  useEffect(() => {
    // FIXED: Only animate if target actually changed
    if (targetRef.current === target) return;
    
    targetRef.current = target;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // If target is 0, reset immediately
    if (target === 0) {
      setCount(0);
      setIsAnimating(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsAnimating(true);
      let startTime = null;
      const startValue = count;
      const valueChange = target - startValue;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Ease out exponential for smooth counting
        const easeOut = 1 - Math.pow(2, -10 * progress);
        const newValue = startValue + (valueChange * easeOut);
        
        setCount(Math.round(newValue));
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
          setIsAnimating(false);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, delay]); // Removed count from dependencies

  return { count, isAnimating };
};