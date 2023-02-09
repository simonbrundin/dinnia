<template>
  <div class="card m-2" :class="{ 'in-cart': recipe.cart_recipes.length > 0 }">
    <NuxtLink
      :to="{ name: 'recipe-id', params: { id: recipe.id } }"
      class="flex flex-row items-center justify-between"
    >
      {{ recipe.name }}

      <div
        class="cart-button p-6"
        :class="{ 'bg-emerald-500': recipe.cart_recipes.length > 0 }"
      >
        <Recipe-AddToCart v-if="recipe.cart_recipes.length === 0" />
        <div
          v-if="recipe.cart_recipes.length > 0"
          class="portions rounded-full"
        >
          {{ recipe.cart_recipes[0].portions }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps(['recipe'])
</script>

<style scoped>
.card {
  /* background: hsl(131, 100%, 95%); */
}
.cart-button {
  margin: -1.5rem;
  /* border-left: 1px solid black; */
}
.in-cart {
  border: 2px solid green;
}
.portions {
  color: white;
  font-size: 20px;
}
</style>
