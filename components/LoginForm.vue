<template></template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const showRegister = ref(true);
var support_webauthn = typeof window["PublicKeyCredential"] !== "undefined";
// const login = () => {
//   if (!password.value) {
//     showPassword.value = true;
//     return;
//   }
//   if (true) {
//     signUpWithPasskey(email.value);
//   }
// };
// const authStore = useAuthStore();
// const { signInErrorMessage } = authStore;
// const singInResponse = await signIn(email.value, password.value);
// errorMessage.value = singInResponse as string;
</script>

<style scoped>
.login-form {
  background: hsla(219, 25%, 17%, 1);
}
</style>
