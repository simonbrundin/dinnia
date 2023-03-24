<template>
  <div class="flex flex-col gap-4 w-72">
    <div class="text-center text-white text-2xl mb-4">
      Återställ ditt lösenord
    </div>

    <input
      type="email"
      name="email"
      v-model="email"
      @keyup.enter="reset()"
      autofocus
      placeholder="Epostadress"
      class="px-4 py-4 rounded-lg text-gray-700"
    />

    <button
      @click="reset()"
      class="bg-blue-500 px-4 py-4 rounded-lg text-slate-50"
    >
      Skicka nytt lösenord
    </button>

    <div
      v-show="useAuthStore().signInErrorMessage"
      class="text-slate-700 bg-red-200 border-red-300 border-4 p-4 rounded-lg"
    >
      {{ useAuthStore().signInErrorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
definePageMeta({ layout: "auth" });

const email = ref("");

const reset = async () => {
  const { error } = await nhost.auth.resetPassword({
    email: email.value,
  });
  if (error) {
    authStore.signInErrorMessage = error.message;
    throw error;
  }

  authStore.signInErrorMessage = "Ett nytt lösenord har skickats till dig";
  return;
};
</script>

<style scoped>
.google-button {
  grid-template-columns: 1fr 3fr 1fr;
}
</style>
