import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useClickOutside } from '../hooks/useClickOutside';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { 
  FaHome,
  FaUser,
  FaBriefcase,
  FaCogs,
  FaEnvelope
} from 'react-icons/fa';

import HorizontalNavbar from './navigation/HorizontalNavbar';
import FloatingSidebar from './navigation/FloatingSidebar';

// Navigation items configuration
const navigationItems = [
  {
    name: 'Home',
    icon: FaHome,
    href: '/'
  },
  {
    name: 'About',
    icon: FaUser,
    href: '/#about',
    dropdown: [
      { name: 'My Story', href: '/#about' },
      { name: 'Experience', href: '/#experience' },
      { name: 'Education', href: '/#education' }
    ]
  },
  {
    name: 'Projects',
    icon: FaBriefcase,
    href: '/projects'
  },
  {
    name: 'Skills',
    icon: FaCogs,
    href: '/Skills'
  },
  {
    name: 'Contact',
    icon: FaEnvelope,
    href: '/contact'
  }
];

const NavigationContainer = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use custom hooks
  const { scrollY } = useScrollPosition(100);
  const dropdownRef = useClickOutside(() => setActiveDropdown(null));
  
  // Check if device is mobile/tablet
  const isMobile = useMediaQuery('(max-width: 1024px)');
  
  // Determine if sidebar should be shown (only on desktop when scrolled)
  const isSidebarMode = !isMobile && scrollY > 150;

  // Smart navigation handler
  const handleNavigation = (href) => {
    // Debug log
    console.log('Navigating to:', href);
    
    // Close any open dropdown when navigating
    setActiveDropdown(null);

    // Handle regular page routes (like /contact)
    if (href.startsWith('/') && !href.includes('#')) {
      navigate(href);
      // Ensure we're at the top of the new page
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    // Handle section links (/#section)
    if (href.startsWith('/#')) {
      const hash = href.substring(1); // Remove the leading '/'
      
      if (location.pathname === '/') {
        // Already on home page, just scroll to section
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            // Account for sticky navbar height
            const navbarHeight = 80; // Adjust this based on your navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            console.warn(`Element not found: ${hash}`);
          }
        }, 100); // Small delay to ensure DOM is ready
      } else {
        // Navigate to home page first, then scroll
        navigate('/');
        // Wait for navigation to complete and DOM to update
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            console.warn(`Element not found after navigation: ${hash}`);
          }
        }, 500); // Longer delay for page navigation
      }
    }

    // Handle anchor links on current page (#section)
    else if (href.startsWith('#')) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          console.warn(`Element not found: ${href}`);
        }
      }, 100);
    }
  };

  // Handle initial hash navigation on page load
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash && location.pathname === '/') {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 500); // Increased delay for initial load
      }
    };

    handleInitialHash();

    // Handle hash changes on same page
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && location.pathname === '/') {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location.pathname]);

  return (
    <>
      {/* Always show horizontal navbar on mobile/tablet OR when not scrolled on desktop */}
      {!isSidebarMode && (
        <HorizontalNavbar 
          navigationItems={navigationItems}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onNavigate={handleNavigation}
        />
      )}

      {/* Only show sidebar on desktop when scrolled */}
      {isSidebarMode && (
        <div ref={dropdownRef}>
          <FloatingSidebar 
            navigationItems={navigationItems}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            onNavigate={handleNavigation}
          />
        </div>
      )}
    </>
  );
};

export default NavigationContainer;