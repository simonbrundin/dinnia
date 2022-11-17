// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['~/modules/material-design-icons.js', '@pinia/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      'graphql-client': {
        clients: {
          default: {
            host: 'https://matkasse.hasura.app/v1/graphql',
            token: {
              name: 'x-hasura-admin-secret',
              type: null,
            },
            retainToken: true,
          },
          willys: {
            host: 'https://countries.trevorblades.com/graphql', // process.env.GQL_COUNTRIES_HOST
            token: {
              name: 'X-Custom-Auth', // process.env.GQL_COUNTRIES_TOKEN_NAME
              value: 'your_access_token', // process.env.GQL_COUNTRIES_TOKEN
            },
          },
        },
      },
    },

    // plugins: ['~/plugins/auth0.js'],
    // middleware: ['~/middleware/auth.global.ts'],
  },
})
