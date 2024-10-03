/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      '3xl': '9rem',
      full: '9999px',
    },
  },
  plugins: [
    require('daisyui'),
  ],
}