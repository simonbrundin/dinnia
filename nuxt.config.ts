// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: "/dinnia/", //Repots namn hos GitHub
  },
  autoImports: {
    dirs: [
      // Scan top-level modules
      "composables",
      "composables/*/*.{ts,js,mjs,mts}",
    ],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/apollo",
    // "nuxt-graphql-client",
  ],
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
        httpEndpoint: "http://localhost:8080/v1/graphql",
        tokenStorage: "localStorage",
        tokenName: "sb-ejztzftnjbhascfunrtq-auth-token",
        authType: "Bearer",
        authHeader: "Authorization",
      },
    },
  },
  "graphql-client": {
    clients: {
      default: {
        host: "http://localhost:8080/v1/graphql",
        // Basic
        tokenStorage: {
          mode: "localStorage",
        },
        // // Advanced
        token: {
          type: "Bearer",
          name: "Authorization",
          // value:
          //   "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsibWUiLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMzYyNTgyOTMtMDFiNy00MDYzLTk5ODItYmMyYTQ4Y2MwMmU1IiwieC1oYXN1cmEtdXNlci1pcy1hbm9ueW1vdXMiOiJmYWxzZSJ9LCJzdWIiOiIzNjI1ODI5My0wMWI3LTQwNjMtOTk4Mi1iYzJhNDhjYzAyZTUiLCJpYXQiOjE2Nzk5MTAzMDAsImV4cCI6MTY3OTkxMTIwMCwiaXNzIjoiaGFzdXJhLWF1dGgifQ.3kSm5jEgTHgzloluFAp7IXAkuhSZMbpbc0yI_iQHIlQ",
        },
      },
    },
  },
});
