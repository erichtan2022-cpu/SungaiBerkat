/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffef7',
          100: '#fffbea',
          200: '#fff4c4',
          300: '#ffe89e',
          400: '#ffd152',
          500: '#d4af37',
          600: '#b8952f',
          700: '#9c7b27',
          800: '#80611f',
          900: '#644717',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
