const tailwind = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

const postcssPlugins = [
  tailwind(),
]

if (process.env.NODE_ENV === 'production') postcssPlugins.push(purgecss(require('./purgecss.config.js')))

module.exports = {
  siteName: "Wtsn.dev",
  plugins: [
    {
      use: "@noxify/gridsome-plugin-remote-image",
      options: {
        typeName: "books",
        sourceField: "image",
        targetField: "localImage",
        targetPath: "./src/assets/books",
      },
    },
    {
      use: "@noxify/gridsome-plugin-remote-image",
      options: {
        typeName: "upcomingBooks",
        sourceField: "image",
        targetField: "localImage",
        targetPath: "./src/assets/books",
      },
    },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};