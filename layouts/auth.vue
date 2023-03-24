<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="auth p-16 min-w-96 flex flex-col gap-4 rounded-xl text-white">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.auth {
  background: hsla(219, 25%, 17%, 1);
}
</style>
