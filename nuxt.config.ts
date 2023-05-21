// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["github:simonbrundin/base-nuxt"],
  ssr: false,

  modules: ["@pinia/nuxt", "@nuxtjs/apollo", "@unocss/nuxt", "@nuxt/devtools"],

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
