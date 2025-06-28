import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with automatic JSON serialization
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {array} - [value, setValue, removeValue] tuple
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to remove the key from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for localStorage with additional features like expiration
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value
 * @param {object} options - Additional options
 * @returns {object} - Object with value, set, remove, and utility methods
 */
export const useLocalStorageAdvanced = (key, initialValue, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    ttl = null, // Time to live in milliseconds
    syncAcrossTabs = false
  } = options;

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsedItem = deserialize(item);
      
      // Check if item has expiration
      if (parsedItem && typeof parsedItem === 'object' && parsedItem.__expires) {
        if (Date.now() > parsedItem.__expires) {
          // Item has expired, remove it
          window.localStorage.removeItem(key);
          return initialValue;
        }
        // Return the actual value without expiration metadata
        return parsedItem.value;
      }
      
      return parsedItem;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        let itemToStore = valueToStore;
        
        // Add expiration if TTL is specified
        if (ttl) {
          itemToStore = {
            value: valueToStore,
            __expires: Date.now() + ttl
          };
        }
        
        window.localStorage.setItem(key, serialize(itemToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, serialize, ttl]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Check if value exists
  const hasValue = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(key) !== null;
  }, [key]);

  // Get size of stored data in bytes
  const getSize = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    const item = window.localStorage.getItem(key);
    return item ? new Blob([item]).size : 0;
  }, [key]);

  // Sync across tabs
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === 'undefined') return;

    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const parsedValue = deserialize(e.newValue);
          
          // Handle expiration
          if (parsedValue && typeof parsedValue === 'object' && parsedValue.__expires) {
            if (Date.now() <= parsedValue.__expires) {
              setStoredValue(parsedValue.value);
            }
          } else {
            setStoredValue(parsedValue);
          }
        } catch (error) {
          console.error('Error syncing localStorage across tabs:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize, syncAcrossTabs]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    hasValue,
    getSize
  };
};

/**
 * Hook for managing multiple localStorage keys as an object
 * @param {object} initialValues - Object with initial values
 * @param {string} prefix - Optional prefix for localStorage keys
 * @returns {object} - Object with values and setter methods
 */
export const useLocalStorageObject = (initialValues, prefix = '') => {
  const [values, setValues] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValues;
    }

    const storedValues = {};
    
    Object.keys(initialValues).forEach(key => {
      const storageKey = prefix ? `${prefix}_${key}` : key;
      try {
        const item = window.localStorage.getItem(storageKey);
        storedValues[key] = item ? JSON.parse(item) : initialValues[key];
      } catch (error) {
        console.error(`Error reading localStorage key "${storageKey}":`, error);
        storedValues[key] = initialValues[key];
      }
    });
    
    return storedValues;
  });

  const setValue = useCallback((key, value) => {
    const storageKey = prefix ? `${prefix}_${key}` : key;
    
    setValues(prev => {
      const newValues = { ...prev, [key]: value };
      
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(storageKey, JSON.stringify(value));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${storageKey}":`, error);
      }
      
      return newValues;
    });
  }, [prefix]);

  const setMultipleValues = useCallback((newValues) => {
    Object.entries(newValues).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [setValue]);

  const removeValue = useCallback((key) => {
    const storageKey = prefix ? `${prefix}_${key}` : key;
    
    setValues(prev => {
      const newValues = { ...prev };
      delete newValues[key];
      
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error(`Error removing localStorage key "${storageKey}":`, error);
      }
      
      return newValues;
    });
  }, [prefix]);

  const clearAll = useCallback(() => {
    Object.keys(values).forEach(key => {
      removeValue(key);
    });
  }, [values, removeValue]);

  return {
    values,
    setValue,
    setMultipleValues,
    removeValue,
    clearAll
  };
};

/**
 * Hook to check localStorage quota and usage
 * @returns {object} - Storage quota information
 */
export const useLocalStorageQuota = () => {
  const [quota, setQuota] = useState({
    used: 0,
    available: 0,
    total: 0,
    percentage: 0
  });

  const updateQuota = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      let used = 0;
      let total = 5 * 1024 * 1024; // Default 5MB assumption

      // Calculate used space
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }

      // Try to get actual quota if supported
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then(estimate => {
          const actualTotal = estimate.quota || total;
          const actualUsed = estimate.usage || used;
          
          setQuota({
            used: actualUsed,
            available: actualTotal - actualUsed,
            total: actualTotal,
            percentage: (actualUsed / actualTotal) * 100
          });
        });
      } else {
        setQuota({
          used,
          available: total - used,
          total,
          percentage: (used / total) * 100
        });
      }
    } catch (error) {
      console.error('Error calculating localStorage quota:', error);
    }
  }, []);

  useEffect(() => {
    updateQuota();
  }, [updateQuota]);

  return { ...quota, updateQuota };
};