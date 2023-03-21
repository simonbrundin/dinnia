<template>
  <div class="flex items-center justify-center h-screen">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
const redirectIfLoggedIn = async () => {
  const alreadyLoggedIn = () => nhost.auth.isAuthenticatedAsync();
  if (await alreadyLoggedIn()) {
    navigateTo("/");
  }
};
redirectIfLoggedIn();
</script>

<style scoped></style>
