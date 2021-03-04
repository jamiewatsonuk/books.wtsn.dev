const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '3/4': '75%'
      },
      colors: {
        gray: colors.warmGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
