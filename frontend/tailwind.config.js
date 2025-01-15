/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Scans all HTML and TS files in src directory
    "./src/app/login/*.{html,ts}",
    "./src/app/signup/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

