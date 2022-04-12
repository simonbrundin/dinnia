export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  proxy: {
    '/api/': {
      target: 'https://simonsrecipes.herokuapp.com/add-products/willys',
      pathRewrite: { '^/api/': '' },
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'supermarket',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/hasura.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '~/modules/material-design-icons.js',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/tailwindcss',
  ],

  router: {
    middleware: ['auth'],
  },
  auth: {
    redirect: {
      login: '/', // redirect user when not connected
      callback: '/auth/signed-in',
    },
    strategies: {
      auth0: {
        domain: 'simonbrundin.eu.auth0.com',
        clientId: 'iCJbdVCxosX2LToHLuQtQrAJUD0NO3CG', // Till Auth0-applikationen
        audience: 'recipes.noomi.land', // Till Auth0-API
      },
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://matkasse.hasura.app/v1/graphql',
        tokenName: 'auth._token.auth0',
      },
    },
    authenticationType: '',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  axios: {
    proxy: true, // Can be also an object with default options
  },
}
