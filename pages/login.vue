<template>
  <div>
    <input
      type="email"
      name="email"
      v-model="email"
      @keyup.enter="signUp(email)"
    />
    <button @click="signUp(email)">Fortsätt</button>
    <div>{{}}</div>
  </div>
</template>

<script setup lang="ts">
const email = ref();
</script>

<style scoped></style>
