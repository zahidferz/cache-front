const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.html', './src/**/*.vue'],
  whitelistPatterns: [
    // tailwind classes used with dynamic params and being ignored
    /^bg-avatar/,
    /^border-/,
    // vue multiselect
    /^multiselect/,
    // theme-orange and vdate-time are classes for the calendar option in GxInput, from the 3rd party dependency vue-datetime
    /^theme-orange/,
    /^vdatetime/,
  ],
  extractors: [
    {
      extractor: class TailwindExtractor {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:\/]+/g) || []
        }
      },
      extensions: ['css', 'html', 'vue'],
    },
  ],
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
}
