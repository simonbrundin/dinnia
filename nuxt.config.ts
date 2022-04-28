import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['~/modules/material-design-icons.js'],
  // Global CSS: https://v3.nuxtjs.org/api/configuration/nuxt.config#css
  css: ['~/assets/css/tailwind.css'],
})
