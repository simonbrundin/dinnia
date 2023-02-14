<template>
  <div class="text-white">
    <div>{{ nhost.auth.getUser()?.email }}</div>
    <div>{{ isAuthenticated }}</div>
    <button @click="signOut()" class="text-white">Logga ut</button>
    <button @click="navigateTo('/login')" class="text-white">Logga in</button>
  </div>
</template>

<script setup lang="ts">
const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
</script>

<style scoped>
.knapp {
  color: greenyellow;
}
</style>
