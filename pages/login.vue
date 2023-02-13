<template>
  <!-- <input type="email" name="email" v-model="email" placeholder="Epostadress" />
  <input
    type="password"
    name="password"
    v-model="password"
    placeholder="Lösenord"
  /> -->
  <button @click="login()">Logga in med Google</button>
  <!-- <button @click="signUpWithEmail()">Registrera</button>
  <button @click="resetPasswordForEmail()">Återställ lösenord</button> -->
</template>

<script setup lang="ts">
const email = ref();
const password = ref();
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();
// Login method using providers
const login = async () => {
  const { error } = await client.auth.signInWithOAuth({ provider: "google" });
  if (error) {
    return alert("Something went wrong !");
  }
  router.push("/recipe/1");
};
</script>

<style scoped></style>
