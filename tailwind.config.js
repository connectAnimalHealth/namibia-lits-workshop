/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // WOAH Brand Colors
        'woah': {
          'orange': '#ff4815',        // Primary brand orange
          'orange-light': '#ffece8',  // Light orange background
          'orange-dark': '#cc3a11',   // Darker orange for hover
          'gold': '#bf9e51',          // Gold accent
          'gold-light': '#debf61',    // Light gold
          'gold-lighter': '#ead69a',  // Lightest gold
          'gold-dark': '#866d32',     // Dark gold
          'charcoal': '#27282a',      // Main text color
          'gray': '#727f8d',          // Secondary text
          'gray-light': '#c1c8ca',    // Borders
          'gray-lighter': '#f4f1f1',  // Light backgrounds
          'cream': '#efeee9',         // Warm background
          'green': '#009d5e',         // Success/positive
          'blue': '#0879cf',          // Links/info
          'red': '#e21313',           // Error/warning
        },
        // Keep Namibia colors as secondary palette
        'namibia': {
          'blue': '#003580',
          'red': '#C8102E',
          'green': '#009639',
          'gold': '#FFD100'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
