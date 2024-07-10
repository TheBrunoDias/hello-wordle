/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        'wordle-green': '#6AAA64',
        'wordle-yellow': '#D1B036',
        'wordle-grey': '#787c7e',
      },
      animation: {
        letterEnter: 'letterBounce 0.2s',
      },
      keyframes: {
        letterBounce: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};
