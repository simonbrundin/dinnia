<template>
  <div>
    <div v-if="!$auth.loggedIn">Loggar in...</div>
    <RecipeList />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    if (!this.$auth.loggedIn) {
      this.$auth.loginWith('auth0')
    }
  },
}
</script>
