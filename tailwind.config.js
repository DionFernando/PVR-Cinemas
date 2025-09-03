/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff7cc',
          200: '#ffe680',
          400: '#ffcc00',   // PVR gold vibe
          600: '#cc9f00',
          900: '#1a1a1a',   // near-black
        },
      },
    },
  },
  plugins: [],
};
