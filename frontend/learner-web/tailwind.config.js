/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4096ff",
        secondary: "#00FF00",
        accent: "#6B6A6A",
      },
    },
  },
  plugins: [],
}
