/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'namibia': {
          'blue': '#003580',
          'red': '#C8102E',
          'green': '#009639',
          'gold': '#FFD100'
        }
      }
    },
  },
  plugins: [],
}