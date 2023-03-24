<template>
  <div class="text-white flex flex-col gap-4 justify-center items-center">
    <div>{{ nhost.auth.getUser()?.email }}</div>
    <!-- <div>{{ isAuthenticated }}</div> -->

    <div class="flex gap-4">
      <button
        @click="signOut()"
        class="bg-slate-700 px-4 py-4 rounded-lg text-slate-50"
      >
        Logga ut
      </button>
    </div>
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
