// hooks/useClickOutside.js
import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element
 * @param {function} callback - Function to call when click outside is detected
 * @param {boolean} enabled - Whether the hook should be active (default: true)
 * @returns {object} - Ref to attach to the element you want to detect outside clicks for
 */
export const useClickOutside = (callback, enabled = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // For mobile

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, enabled]);

  return ref;
};

/**
 * Hook to detect clicks outside multiple elements
 * @param {function} callback - Function to call when click outside is detected
 * @param {boolean} enabled - Whether the hook should be active
 * @returns {function} - Function that returns a ref for each element
 */
export const useClickOutsideMultiple = (callback, enabled = true) => {
  const refs = useRef([]);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      // Check if the clicked element is outside all referenced elements
      const isOutside = refs.current.every(ref => 
        ref && !ref.contains(event.target)
      );

      if (isOutside) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, enabled]);

  // Return a function that creates and stores refs
  const getRef = (index) => {
    return (element) => {
      if (element) {
        refs.current[index] = element;
      } else {
        refs.current[index] = null;
      }
    };
  };

  return getRef;
};

/**
 * Hook that combines click outside with escape key detection
 * @param {function} callback - Function to call when click outside or escape is detected
 * @param {boolean} enabled - Whether the hook should be active
 * @returns {object} - Ref to attach to the element
 */
export const useClickOutsideAndEscape = (callback, enabled = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event, 'click');
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        callback(event, 'escape');
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [callback, enabled]);

  return ref;
};

/**
 * Hook to detect clicks outside with custom event types
 * @param {function} callback - Function to call when outside event is detected
 * @param {string[]} eventTypes - Array of event types to listen for (default: ['mousedown'])
 * @param {boolean} enabled - Whether the hook should be active
 * @returns {object} - Ref to attach to the element
 */
export const useOutsideEvent = (callback, eventTypes = ['mousedown'], enabled = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleEvent = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    // Add listeners for all specified event types
    eventTypes.forEach(eventType => {
      document.addEventListener(eventType, handleEvent, { passive: false });
    });

    // Cleanup
    return () => {
      eventTypes.forEach(eventType => {
        document.removeEventListener(eventType, handleEvent);
      });
    };
  }, [callback, eventTypes, enabled]);

  return ref;
};