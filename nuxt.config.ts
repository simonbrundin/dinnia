// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/apollo"],

  css: [
    // SCSS file in the project
    "@/assets/css/main.scss",
  ],

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint:
          process.env.GRAPHQL_URL || "http://localhost:8080/v1/graphql",
      },
    },
  },
});
