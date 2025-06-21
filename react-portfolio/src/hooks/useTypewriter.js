// hooks/useTypewriter.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for creating typewriter effect
 * @param {string[]} texts - Array of texts to cycle through
 * @param {number} speed - Typing speed in milliseconds (default: 100)
 * @param {number} deleteSpeed - Deleting speed in milliseconds (default: 50)
 * @param {number} pauseTime - Pause time after completing a word (default: 2000)
 * @returns {object} - Returns currentText and isDeleting state
 */
export const useTypewriter = (texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const timeout = setTimeout(() => {
      const current = texts[textIndex];
      
      if (!isDeleting) {
        // Typing phase
        if (currentIndex < current.length) {
          setCurrentText(current.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing, start delete after pause
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setCurrentText(current.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return { 
    currentText, 
    isDeleting,
    currentTextIndex: textIndex
  };
};