<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="login-form p-16 w-96 flex flex-col gap-4 rounded-xl">
      <div class="text-center text-white text-2xl mb-4">
        <div v-if="showRegister">Logga in</div>
        <div v-if="!showRegister">Verifiera epostadress</div>
      </div>

      <button @click="" class="bg-slate-700 px-4 py-4 rounded-lg text-slate-50">
        Öppna epostkonto
      </button>

      <div
        v-show="false"
        class="text-slate-700 bg-red-200 border-red-300 border-4 p-4 rounded-lg"
      >
        {{ useAuthStore().signInErrorMessage }}
      </div>

      <!-- <div>{{ support_webauthn }}</div> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.login-form {
  background: hsla(219, 25%, 17%, 1);
}
</style>
