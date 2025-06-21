// hooks/index.js
// Export all custom hooks from a single file for easier imports

// Animation and UI Hooks
export { useTypewriter } from './useTypewriter';
export { 
  useAnimatedProgress, 
  useAnimatedProgressMultiple, 
  useAnimatedCounter 
} from './useAnimatedProgress';

// Form and Validation Hooks
export { 
  useFormValidation, 
  validationRules 
} from './useFormValidation';

// Scroll and Position Hooks
export { 
  useScrollPosition, 
  useScrollThreshold, 
  useScrollProgress, 
  useScrollHide 
} from './useScrollPosition';

// Intersection Observer Hooks
export { 
  useIntersectionObserver, 
  useIntersectionObserverMultiple, 
  useIntersectionAnimation, 
  useLazyLoad, 
  useViewportAnimation 
} from './useIntersectionObserver';

// Click and Event Hooks
export { 
  useClickOutside, 
  useClickOutsideMultiple, 
  useClickOutsideAndEscape, 
  useOutsideEvent 
} from './useClickOutside';

// Media Query and Responsive Hooks
export { 
  useMediaQuery, 
  useBreakpoint, 
  useScreenSize, 
  useContainerQuery, 
  useHoverCapability, 
  useResponsiveValue, 
  useWindowSize 
} from './useMediaQuery';

// Storage Hooks
export { 
  useLocalStorage, 
  useLocalStorageAdvanced, 
  useLocalStorageObject, 
  useLocalStorageQuota 
} from './useLocalStorage';

// Debounce Hooks
export { 
  useDebounce, 
  useDebouncedCallback, 
  useDebouncedSearch, 
  useDebouncedValidation, 
  useDebouncedAPI, 
  useDebouncedResize, 
  useDebouncedInput, 
  useDebouncedScroll 
} from './useDebounce';

// Re-export all hooks as named exports for convenience
export * from './useTypewriter';
export * from './useAnimatedProgress';
export * from './useFormValidation';
export * from './useScrollPosition';
export * from './useIntersectionObserver';
export * from './useClickOutside';
export * from './useMediaQuery';
export * from './useLocalStorage';
export * from './useDebounce';