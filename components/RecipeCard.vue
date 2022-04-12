<template>
  <div class="card m-2" :class="{ 'in-cart': recipe.cart_recipes.length > 0 }">
    <div class="flex items-center justify-between">
      <nuxt-link :to="{ name: 'recipe-id', params: { id: recipe.id } }">
        {{ recipe.name }}
      </nuxt-link>
      <div
        class="cart-button p-6 -my-10 -mr-6"
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
    </div>
  </div>
</template>

<script>
// import gql from 'graphql-tag' // Don't forget to import gql

export default {
  props: {
    recipe: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function. The function receives the raw
      // props received by the component as the argument.
      default() {
        // default function receives the raw props object as argument
        return {}
      },
    },
  },
  // apollo: {
  //   recipe: {
  //     query: gql`
  //       query {
  //         recipe {
  //           id
  //           name
  //         }
  //       }
  //     `,
  //   },
  // },
}
</script>

<style scoped>
.cart-button {
  border-left: 1px solid black;
}
.in-cart {
  border: 2px solid green;
}
.portions {
  color: white;
  font-size: 20px;
}
</style>
