module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.svelte',
    './src/**/*.css',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'orange': '#fe3e00',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
