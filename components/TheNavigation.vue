<template>
  <div id="the-navigation">
    <nuxt-link to="/"> <button>Hem</button></nuxt-link>
    <button @click="$store.dispatch('addToWillysCart')">
      Lägg till produkter
    </button>
    <CartIcon />
    <ProfileImage />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#the-navigation {
  background: lightgrey;
}
</style>
