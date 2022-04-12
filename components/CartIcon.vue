<template>
  <div class="flex flex-row z-50">
    <nuxt-link to="/cart" class="flex flex-row cart-icon p-4 rounded-full">
      <MaterialIconCartOutline />
      <div class=""></div>
      <div
        class="badge flex justify-center items-center px-2 py-0 rounded-full"
      >
        {{ itemsInCart }}
      </div></nuxt-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    itemsInCart() {
      let total = 0
      const cart = this.$store.getters.getCart
      for (const value of Object.values(cart)) {
        total += value
      }
      return total
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-icon {
  background: white;
}
.badge {
  margin: -16px 0 0 20px;
  background: red;
  color: white;

  position: absolute;
}
</style>
