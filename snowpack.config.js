/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    [
      "@snowpack/plugin-run-script",
      {
        "cmd": "postcss src/main.css -o public/main.css",
        "watch": "postcss src/main.css -o public/main.css -w"
      }
    ],
  ],
  routes: [
    /* Example: Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
    open: 'none',
    // output: 'stream'
  },
  buildOptions: {
    /* ... */
  },
};
