import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      signInErrorMessage: "",
    };
  },
  actions: {},
  getters: {},
});
