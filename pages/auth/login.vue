<template>
  <div class="flex flex-col gap-4">
    <div class="text-center text-white text-2xl mb-4" v-if="false">
      <div v-if="showRegister">Fyll i din epostadress</div>
      <div v-if="!showRegister">Registrera konto</div>
    </div>

    <input
      type="email"
      name="email"
      v-model="email"
      @keyup.enter="login()"
      autofocus
      placeholder="Epostadress"
      class="px-4 py-4 rounded-lg text-gray-700"
    />
    <input
      v-show="showPassword"
      type="password"
      name="password"
      v-model="password"
      @keyup.enter="login()"
      autofocus
      placeholder="Lösenord"
      class="px-4 py-4 rounded-lg text-gray-700"
    />
    <button
      @click="login()"
      class="bg-blue-500 px-4 py-4 rounded-lg text-slate-50"
    >
      Fortsätt
    </button>

    <button
      v-show="false"
      @click="signIn(email)"
      class="bg-slate-700 px-4 py-4 rounded-lg text-slate-50"
    >
      Fortsätt med Passkey
    </button>
    <div
      v-show="useAuthStore().signInErrorMessage"
      class="text-slate-700 bg-red-200 border-red-300 border-4 p-4 rounded-lg"
    >
      {{ useAuthStore().signInErrorMessage }}
    </div>
    <div v-show="showReset" @click="reset()" class="text-white">
      Återställ lösenord
    </div>
    <button
      @click="signIn(email, password)"
      class="bg-slate-700 px-4 py-4 rounded-lg text-slate-50 grid google-button items-center"
    >
      <img src="@/assets/images/google-logo.png" class="w-4" srcset="" />
      <div>Fortsätt med Google</div>
    </button>
    <div>
      Saknar du ett konto?
      <nuxt-link to="/auth/register" class="text-blue-500">Registera</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
definePageMeta({ layout: "auth" });

const redirectIfLoggedIn = async () => {
  const alreadyLoggedIn = () => nhost.auth.isAuthenticatedAsync();
  if (await alreadyLoggedIn()) {
    navigateTo("/");
  }
};
redirectIfLoggedIn();
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const showRegister = ref(true);
const showReset = ref(false);
var support_webauthn = typeof window["PublicKeyCredential"] !== "undefined";
const authStore = useAuthStore();
const signUp = async (email: string, password: string) => {
  const { error, session } = await nhost.auth.signUp({
    email,
    password,
  });
  if (error) {
    if (error.status === 409) {
      authStore.signInErrorMessage = "";
      throw error;
    }
    authStore.signInErrorMessage = error.message;
    throw error;
  }
  if (!session) {
    navigateTo("/auth/verify");
    authStore.signInErrorMessage = "Du behöver verifiera din epostadress";
    throw "Du behöver verifiera din epostadress";
  }
  navigateTo("/");
  authStore.signInErrorMessage = "";
  return session;
};
const loginWithPassword = async (email: string, password: string) => {
  const { error, session } = await nhost.auth.signIn({
    email,
    password,
  });
  if (error) {
    if (error.status === 401) {
      showPassword.value = true;
      showReset.value = true;
    }
    authStore.signInErrorMessage = error.message;
    throw error;
  }
  if (!session) {
    navigateTo("/auth/verify");
    authStore.signInErrorMessage = "Du behöver verifiera din epostadress";
    throw "Du behöver verifiera din epostadress";
  }
  navigateTo("/");
  authStore.signInErrorMessage = "";
  return session;
};
const login = () => {
  if (!password.value) {
    showPassword.value = true;
    return;
  }
  try {
    signUp(email.value, password.value);
    loginWithPassword(email.value, password.value);
  } catch (error) {}
};
const reset = async () => {
  const { error } = await nhost.auth.resetPassword({
    email: email.value,
  });
  if (error) {
    authStore.signInErrorMessage = error.message;
    throw error;
  }

  authStore.signInErrorMessage =
    "Kolla din epost för att återställa lösenordet";
  return;
};
</script>

<style scoped>
.google-button {
  grid-template-columns: 1fr 3fr 1fr;
}
</style>
