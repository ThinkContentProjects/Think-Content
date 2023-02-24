/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.html"
  ],
  theme: {
    extend: {
      screens:{
        "sm": "480px"
      }
    },
    fontFamily:{
      nunito:[]
    }
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
}
