/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gemini: {
          blue: '#8ab4f8',
          purple: '#c58af9',
          pink: '#f28b82',
          teal: '#78d9ec',
          green: '#81c995',
          yellow: '#fdd663',
          orange: '#fcad70',
          background: '#0a0a1f',
          card: 'rgba(45, 45, 45, 0.5)',
          surface: 'rgba(56, 56, 56, 0.7)',
          glass: 'rgba(255, 255, 255, 0.05)',
          text: {
            primary: '#ffffff',
            secondary: '#9aa0a6',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'startup-gradient': 'linear-gradient(135deg, #0e95ea 0%, #d83af6 100%)',
        'startup-gradient-hover': 'linear-gradient(135deg, #0277cc 0%, #c11bd9 100%)',
        'gemini-gradient': 'linear-gradient(to right, #8ab4f8, #c58af9, #f28b82)',
        'gemini-gradient-hover': 'linear-gradient(to right, #78a3e7, #b479e8, #e17a71)',
        'gemini-dark-gradient': 'linear-gradient(to right bottom, rgba(45, 45, 45, 0.5), rgba(56, 56, 56, 0.7))',
        'gemini-hero-gradient': 'radial-gradient(100% 100% at 50% 0%, rgba(138, 180, 248, 0.2) 0%, rgba(197, 138, 249, 0.2) 50%, rgba(242, 139, 130, 0.2) 100%), #0a0a1f',
        'gemini-card-gradient': 'linear-gradient(to right bottom, rgba(45, 45, 45, 0.5), rgba(52, 52, 52, 0.5))',
        'gemini-button-gradient': 'linear-gradient(to right, #8ab4f8, #c58af9)',
        'gemini-button-gradient-hover': 'linear-gradient(to right, #78a3e7, #b479e8)',
        'gemini-glow': 'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 50px -12px rgba(138, 180, 248, 0.25)',
        'glow-hover': '0 0 50px -6px rgba(138, 180, 248, 0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
