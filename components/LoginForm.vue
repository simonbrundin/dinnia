<template>
  <div class="login-form p-16 max-w-48 flex flex-col gap-4">
    <input
      type="email"
      name="email"
      v-model="email"
      @keyup.enter="login(email)"
      autofocus
      placeholder="Epostadress"
      class="px-4 py-2"
    />
    <button
      @click="login(email)"
      class="bg-slate-700 px-8 py-4 rounded-lg text-slate-50"
    >
      Fortsätt
    </button>
    <div class="text-white">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const error = ref();
const login = async (email: string) => {
  const res = await signIn(email);
  // error.value = result?.error?.message;
};
</script>

<style scoped>
.login-form {
  background: hsla(219, 25%, 17%, 1);
}
</style>
