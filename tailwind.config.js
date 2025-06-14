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
          background: '#1f1f1f',
          card: '#2d2d2d',
          surface: '#383838',
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
        'gemini-dark-gradient': 'linear-gradient(to right bottom, #2d2d2d, #383838)',
        'gemini-hero-gradient': 'radial-gradient(circle at top right, rgba(138, 180, 248, 0.12), rgba(197, 138, 249, 0.12), rgba(242, 139, 130, 0.12)), #1f1f1f',
        'gemini-card-gradient': 'linear-gradient(to right bottom, #2d2d2d, #343434)',
        'gemini-button-gradient': 'linear-gradient(to right, #8ab4f8, #c58af9)',
        'gemini-button-gradient-hover': 'linear-gradient(to right, #78a3e7, #b479e8)',
      }
    },
  },
  plugins: [],
};
