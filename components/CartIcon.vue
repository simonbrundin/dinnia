<template>
  <div class="flex flex-row z-50">
    <nuxt-link
      to="/cart"
      class="flex flex-row cart-icon p-4 rounded-full drop-shadow-md"
    >
      <!-- <nuxt-icon name="ChevronUp" /> -->

      <!-- <MaterialIconCartOutline /> -->
      <div class=""></div>
      <div
        class="badge flex justify-center items-center px-2 py-0 rounded-full"
      >
        {{ itemsInCart }}
      </div></nuxt-link
    >
  </div>
</template>

<script setup>
import { useStore } from '~/stores/global'
import { computed } from 'vue'
const itemsInCart = computed(() => {
  let total = 0
  const store = useStore()
  const cart = store.cart
  for (const value of Object.values(cart)) {
    total += value
  }
  return total
})
</script>

<style scoped>
.cart-icon {
  background: white;
}
.badge {
  background: red;
  color: white;
}
</style>
