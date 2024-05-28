/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/*.{html,js}",
    "./public/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'main-color' : '#1E1E1E',
        'main-color2' : '#262626',
        'claim-green' : '#00B752',
        'main3-green' : '#00FF29',
        'shadow-color' : '#00FF29',
      },
      boxShadow: {
        '20xl-inner': '0 15px 60px 5px #00FF29, inset 0 2px 0px 0px #00FF29'
      }
    },
  },
  plugins: ["tailwindcss","autoprefixer","postcss-100vh-fix"],
}