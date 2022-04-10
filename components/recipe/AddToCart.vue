<template>
  <div>
    <img
      src="@/assets/icons/cart-add.png"
      alt=""
      @click="showPortions = true"
    />
    <Modal v-show="showPortions">
      <h1>Hur många portioner?</h1>
      <input v-model="portions" type="number" name="" />
      <button @click="addToCart">Lägg i kundkorgen</button>
    </Modal>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return { toBuy: [], portions: 1, showPortions: false }
  },
  methods: {
    async addToCart() {
      await this.getIngredients()
      this.showPortions = false
    },
    async getIngredients() {
      this.showPortions = true
      await this.$apollo
        .query({
          query: gql`
            query storeIngredients {
              recipe_ingredient(where: { recipe_id: { _eq: 1 } }) {
                ingredient {
                  store_ingredients(where: {}) {
                    product_code
                    grams_per_unit
                    units
                  }
                }
                grams
              }
            }
          `,
          variables: {
            id: this.$data.id,
          },
        })
        .then((data) => {
          const ingredients = data.data.recipe_ingredient
          if (ingredients === []) {
            return
          }
          for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i]
            if (ingredient.ingredient.store_ingredients.length > 0) {
              const grams = ingredient.grams
              const units = ingredient.ingredient.store_ingredients[0].units
              const productCode =
                ingredient.ingredient.store_ingredients[0].product_code
              const gramsPerUnit =
                ingredient.ingredient.store_ingredients[0].grams_per_unit
              const unitsToBuy = Math.ceil(
                (this.portions * grams) / gramsPerUnit / units
              )

              this.$store.state.cart[productCode] = unitsToBuy
            }
          }
        })
    },
  },
}
</script>

<style scoped>
img {
  height: 32px;
}
</style>
