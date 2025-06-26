import React from 'react';

/**
 * Base Skeleton component with various variants
 * @param {string} variant - Type of skeleton: 'text', 'circular', 'rectangular', 'rounded'
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 * @param {boolean} animate - Whether to animate the skeleton
 */
const Skeleton = ({ 
  variant = 'text', 
  className = '', 
  style = {},
  animate = true,
  width,
  height,
  count = 1,
  circle = false
}) => {
  const baseClasses = `
    bg-gray-200 dark:bg-gray-700 
    ${animate ? 'animate-pulse' : ''}
    ${className}
  `;

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-md';
      case 'rounded':
        return 'rounded-lg';
      default:
        return 'rounded';
    }
  };

  const getDefaultDimensions = () => {
    switch (variant) {
      case 'text':
        return { width: width || '100%', height: height || '1rem' };
      case 'circular':
        return { width: width || '3rem', height: height || width || '3rem' };
      case 'rectangular':
        return { width: width || '100%', height: height || '10rem' };
      case 'rounded':
        return { width: width || '100%', height: height || '4rem' };
      default:
        return { width: width || '100%', height: height || '1rem' };
    }
  };

  const dimensions = getDefaultDimensions();
  const variantClasses = getVariantClasses();

  // If circle prop is true, make it circular
  const circleStyles = circle ? {
    width: dimensions.width,
    height: dimensions.width, // Make height equal to width for perfect circle
    borderRadius: '50%'
  } : {};

  const combinedStyle = {
    width: dimensions.width,
    height: dimensions.height,
    ...style,
    ...circleStyles
  };

  const combinedClasses = `${baseClasses} ${variantClasses}`;

  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={combinedClasses}
            style={combinedStyle}
          />
        ))}
      </>
    );
  }

  return (
    <div
      className={combinedClasses}
      style={combinedStyle}
    />
  );
};

/**
 * Skeleton container for wrapping multiple skeleton elements
 */
export const SkeletonContainer = ({ children, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Skeleton for card layouts
 */
export const SkeletonCard = ({ className = '', showImage = true }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg dark:shadow-gray-900/50 ${className}`}>
      {showImage && (
        <Skeleton variant="rectangular" height="200px" className="mb-4" />
      )}
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="80%" className="mb-4" />
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  );
};

/**
 * Skeleton for list items
 */
export const SkeletonListItem = ({ showAvatar = true, lines = 2 }) => {
  return (
    <div className="flex items-start space-x-4 p-4">
      {showAvatar && (
        <Skeleton variant="circular" width="48px" height="48px" />
      )}
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="40%" />
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} variant="text" width={index === lines - 1 ? "60%" : "100%"} />
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton for table rows
 */
export const SkeletonTableRow = ({ columns = 4 }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-4">
          <Skeleton variant="text" width="80%" />
        </td>
      ))}
    </tr>
  );
};

export default Skeleton;