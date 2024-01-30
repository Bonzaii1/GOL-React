/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'silkscreen': ['Silkscreen', 'sans-serif']
      },
      gridTemplateColumns: {
        'max': 'repeat(30, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
}

