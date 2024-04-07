/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        primary: '#1967d2', // Example color
        secondary: {
          100: '#4346DF',
          200: '#6666',
          300: '#484848',
          400: '#ecedf2',
          500:'"#f0f5f7"',
          
          // You can add more shades as needed
        },
        hover: '#0146a6',
        back:'#f0f5f7'
        // Add more colors as needed
      },
    },
  },
  plugins: [],
}
