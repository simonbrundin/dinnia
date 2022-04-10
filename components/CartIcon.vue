<template>
  <div>
    {{ itemsInCart }}
  </div>
</template>

<script>
export default {
  computed: {
    itemsInCart() {
      let total = 0
      const cart = this.$store.state.cart
      for (const value of Object.values(cart)) {
        total += value
      }
      console.log(total)
      return total
      // this.$store.state.cart
    },
  },
}
</script>

<style lang="scss" scoped></style>
