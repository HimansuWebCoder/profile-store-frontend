/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      borderRadius: {
        '50px': '50px',
      },
      colors: {
        transparent: 'transparent',
      },
      opacity: {
        10: '0.15'
      }
    },
  },
  plugins: [],
};
