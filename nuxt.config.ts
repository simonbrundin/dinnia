// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['~/modules/material-design-icons.js', '@pinia/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  // plugins: ['~/plugins/auth0.js'],
  middleware: ['~/middleware/auth.global.ts'],
})
