import { vue3Debounce } from "vue-debounce";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("debounce", vue3Debounce({ lock: true }));
});
