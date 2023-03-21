<template>
  <div class="login-form p-16 max-w-48 flex flex-col gap-4">
    <input
      type="email"
      name="email"
      v-model="email"
      @keyup.enter="signIn(email)"
      autofocus
      placeholder="Epostadress"
      class="px-4 py-2 rounded-lg"
    />
    <!-- <input
      v-if="!isBrowerWebAuthnCompatible"
      type="password"
      name="password"
      v-model="password"
      @keyup.enter="signIn(email)"
      autofocus
      placeholder="Epostadress"
      class="px-4 py-2"
    /> -->
    <button
      @click="signIn(email)"
      class="bg-slate-700 px-4 py-4 rounded-lg text-slate-50"
    >
      Fortsätt
    </button>
    <div class="text-white">
      {{ signInErrorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const { signInErrorMessage } = authStore;
// const singInResponse = await signIn(email.value, password.value);
// errorMessage.value = singInResponse as string;
</script>

<style scoped>
.login-form {
  background: hsla(219, 25%, 17%, 1);
}
</style>
