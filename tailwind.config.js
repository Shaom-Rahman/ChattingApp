/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'BrandColor': '#B0D8DA'
      }
    },
    container:{
      center:true,
    },
    fontFamily:{
      'Popins' : [ "Rubik", "serif" ]

    }
  },
  plugins: [],
}