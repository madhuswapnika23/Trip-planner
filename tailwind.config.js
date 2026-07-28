/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0A0F',
          surface: '#13131A',
          elevated: '#1C1C27',
          border: '#2A2A3A',
        },
        voyagr: {
          blue: '#4F7EFF',
          amber: '#F5A623',
          teal: '#36D9C4',
          coral: '#FF6B6B',
        },
        text: {
          primary: '#F0F0F8',
          secondary: '#8888AA',
          tertiary: '#55556A',
        },
        tod: {
          morning: '#FF9F43',
          afternoon: '#4F7EFF',
          evening: '#7C5CBF',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['11px', '1.4'],
        sm: ['13px', '1.5'],
        base: ['15px', '1.6'],
        md: ['17px', '1.5'],
        lg: ['22px', '1.4'],
        xl: ['28px', '1.3'],
        '2xl': ['38px', '1.2'],
        '3xl': ['52px', '1.1'],
      },
      spacing: {
        18: '72px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.96)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(-8px)' },
          '50%': { transform: 'translateX(8px)' },
        },
        pulseOnce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
        fadeIn: 'fadeIn 300ms ease-out',
        slideUp: 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        scaleIn: 'scaleIn 200ms ease-out',
        drift: 'drift 6s ease-in-out infinite',
        pulseOnce: 'pulseOnce 300ms ease-out',
        shake: 'shake 200ms ease-in-out',
      },
    },
  },
  plugins: [],
};