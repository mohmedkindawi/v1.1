/** @type {import('tailwindcss').Config} */
export default {
  // enable class-based dark mode so we can toggle with a `dark` class on <html>
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#5BBFB5',
          navy: '#1A1B37',
          cream: '#FFF6E9',
        },
        auth: {
          brown: '#8B5E34',
          gold: '#D4AF37',
        }
      },
      backgroundColor: {
        primary: '#5BBFB5',
        secondary: '#1A1B37',
        surface: '#FFF6E9',
      },
      textColor: {
        primary: '#1A1B37',
        secondary: '#5BBFB5',
      },
      borderColor: {
        primary: '#5BBFB5',
        secondary: '#1A1B37',
      }
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
};