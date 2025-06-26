import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing loading states with skeleton loaders
 * @param {number} delay - Minimum loading time in milliseconds (default: 500)
 * @param {boolean} initialLoading - Initial loading state (default: true)
 * @returns {object} - Loading state and controls
 */
export const useLoading = (delay = 500, initialLoading = true) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [startTime] = useState(Date.now());

  const stopLoading = useCallback(() => {
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, delay - elapsed);
    
    if (remainingTime > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    } else {
      setIsLoading(false);
    }
  }, [delay, startTime]);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const setLoadingState = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoadingState
  };
};

/**
 * Hook for simulating data loading with skeleton
 * @param {function} fetchData - Function to fetch data
 * @param {array} dependencies - Dependencies for re-fetching
 * @param {object} options - Additional options
 * @returns {object} - Data, loading state, and error
 */
export const useDataWithSkeleton = (fetchData, dependencies = [], options = {}) => {
  const {
    delay = 300,
    showSkeletonOnRefetch = false,
    cacheTime = 0,
    onSuccess = () => {},
    onError = () => {}
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { isLoading, startLoading, stopLoading } = useLoading(delay, true);

  const fetchDataWithLoading = useCallback(async () => {
    try {
      if (!isInitialLoad && !showSkeletonOnRefetch) {
        // Don't show skeleton on refetch if option is false
        const result = await fetchData();
        setData(result);
        setError(null);
        onSuccess(result);
      } else {
        startLoading();
        const result = await fetchData();
        setData(result);
        setError(null);
        stopLoading();
        onSuccess(result);
        setIsInitialLoad(false);
      }
    } catch (err) {
      setError(err);
      stopLoading();
      onError(err);
      setIsInitialLoad(false);
    }
  }, [fetchData, isInitialLoad, showSkeletonOnRefetch, startLoading, stopLoading, onSuccess, onError]);

  useEffect(() => {
    fetchDataWithLoading();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => {
    fetchDataWithLoading();
  }, [fetchDataWithLoading]);

  return {
    data,
    isLoading: isInitialLoad ? isLoading : (showSkeletonOnRefetch && isLoading),
    error,
    refetch,
    isInitialLoad
  };
};

/**
 * Hook for managing skeleton loading with sections
 * @param {object} sections - Object with section names as keys and loading states as values
 * @returns {object} - Section loading states and controls
 */
export const useSectionLoading = (sections = {}) => {
  const [loadingStates, setLoadingStates] = useState(() => {
    const initialStates = {};
    Object.keys(sections).forEach(section => {
      initialStates[section] = sections[section] || false;
    });
    return initialStates;
  });

  const setSectionLoading = useCallback((section, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [section]: isLoading
    }));
  }, []);

  const setMultipleSectionsLoading = useCallback((updates) => {
    setLoadingStates(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const isAnySectionLoading = Object.values(loadingStates).some(state => state);
  const areAllSectionsLoaded = Object.values(loadingStates).every(state => !state);

  return {
    loadingStates,
    setSectionLoading,
    setMultipleSectionsLoading,
    isAnySectionLoading,
    areAllSectionsLoaded
  };
};

/**
 * Hook for progressive loading with skeleton
 * Shows skeleton while content loads progressively
 */
export const useProgressiveLoading = (items = [], options = {}) => {
  const {
    batchSize = 5,
    batchDelay = 100,
    initialDelay = 300
  } = options;

  const [loadedItems, setLoadedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBatch, setCurrentBatch] = useState(0);

  useEffect(() => {
    if (items.length === 0) {
      setIsLoading(false);
      return;
    }

    // Reset state when items change
    setLoadedItems([]);
    setCurrentBatch(0);
    setIsLoading(true);

    // Initial delay before starting to load
    const initialTimer = setTimeout(() => {
      loadBatch();
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBatch = useCallback(() => {
    const startIndex = currentBatch * batchSize;
    const endIndex = Math.min(startIndex + batchSize, items.length);
    const batch = items.slice(startIndex, endIndex);

    setLoadedItems(prev => [...prev, ...batch]);

    if (endIndex < items.length) {
      setCurrentBatch(prev => prev + 1);
      setTimeout(() => {
        loadBatch();
      }, batchDelay);
    } else {
      setIsLoading(false);
    }
  }, [currentBatch, batchSize, items, batchDelay]);

  return {
    loadedItems,
    isLoading,
    progress: items.length > 0 ? (loadedItems.length / items.length) * 100 : 0
  };
};