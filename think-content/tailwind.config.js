/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
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
  plugins: [],
  variants: {
    extend: {
      borderRadius: ['hover'],
    },
 },
}
