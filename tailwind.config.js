/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#dd1e4b',
        'primary-color': '#65FF00',
        'secondary-color': '#ceff1a',
        'secondary': '#ceff1a',
        "globaltext": "#9ca2b1",
        "global": "#999999",
        "header-color": "#111111",
        "white-text": "#F5F5F5",
        "item-color": "#191919",
        "galaxy-from": '#150011',
        "galaxy-to": '#900a64',
        "border-color": '#434341'
      },
      boxShadow: {
        base: '0 0 30px rgb(0 0 0 / 5%)',
        full: ' 0 0 30px 0 rgb(6 30 98 / 8%)',
      },
      height: {
        banner: "calc(100vh - 100px)"
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}

