// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseUrl: "/dinnia/", //Repots namn hos GitHub
  },

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
          "https://rzcywmsyykhpunfkygpk.graphql.eu-central-1.nhost.run/v1",
      },
    },
  },
});
