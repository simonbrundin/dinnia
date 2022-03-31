<template>
  <div>
    <div v-if="$auth.loggedIn">
      <button @click="$auth.logout()">Logga ut</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
