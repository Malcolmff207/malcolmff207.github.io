// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom gray-750 for better dark mode contrast
        gray: {
          750: '#1f2937', // Between gray-700 and gray-800
        },
        // You can add custom dark mode colors here if needed
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
            muted: '#94a3b8'
          }
        }
      },
      animation: {
        'in': 'in 0.2s ease-out',
        'slide-in-from-top-2': 'slide-in-from-top-2 0.2s ease-out',
        'slide-in-from-bottom-2': 'slide-in-from-bottom-2 0.2s ease-out',
        'slide-in-from-left-2': 'slide-in-from-left-2 0.2s ease-out',
        'slide-in-from-left-4': 'slide-in-from-left-4 0.2s ease-out',
        'slide-in-from-left-8': 'slide-in-from-left-8 0.2s ease-out',
        'slide-in-from-bottom-4': 'slide-in-from-bottom-4 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'zoom-in-95': 'zoom-in-95 0.2s ease-out',
      },
      keyframes: {
        'in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-in-from-top-2': {
          '0%': { transform: 'translateY(-0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-in-from-bottom-2': {
          '0%': { transform: 'translateY(0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-in-from-left-2': {
          '0%': { transform: 'translateX(-0.5rem)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-from-left-4': {
          '0%': { transform: 'translateX(-1rem)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-from-left-8': {
          '0%': { transform: 'translateX(-2rem)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-from-bottom-4': {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'zoom-in-95': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}