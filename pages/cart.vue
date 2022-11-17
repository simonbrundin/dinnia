<template>
  <div class="pt-32">
    <div class="flex flex-col pb-8">
      <div
        v-for="item in cart"
        :key="item[0]"
        class="flex flex-row justify-between"
      >
        {{ item[0] }}
        <div>{{ item[1] }} port</div>
      </div>
    </div>
    <div class="grid grid-cols-4">
      <div class="font-bold">Vara</div>

      <div class="font-bold">Behöver</div>

      <div class="font-bold">per st</div>

      <div class="font-bold">Antal</div>
    </div>
    <div
      v-for="ingredient in ingredients"
      :key="ingredient.details[0].product_code"
      class="grid grid-cols-4"
    >
      <div class="flex flex-col">
        <div>{{ ingredient.name }}</div>
      </div>
      <div class="flex flex-col">
        <div>
          {{ ingredient.grams / ingredient.details[0].grams_per_unit }}
          {{ ingredient.details[0].unit_name }}
        </div>
      </div>
      <div class="flex flex-col">
        <div>
          {{ ingredient.details[0].units }}
          {{ ingredient.details[0].unit_name }}
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row">
          <MaterialIconChevronLeft />
          <div>
            {{
              Math.ceil(
                ingredient.grams /
                  ingredient.details[0].grams_per_unit /
                  ingredient.details[0].units
              )
            }}
          </div>
          <MaterialIconChevronRight />
        </div>
      </div>
    </div>
    <button @click="getCartIngredients">Logga</button>
    <button class="mt-8" @click="$store.dispatch('addToWillysCart')">
      Köp
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      ingredients: {},
    }
  },
  mounted() {
    this.getCart()
    this.getCartIngredients()
  },
  methods: {
    async getCart() {
      await this.$apollo
        .query({
          query: gql`
            query ($userId: String!) {
              cart_recipe(where: { user_id: { _eq: $userId } }) {
                recipe {
                  name
                  id
                }
                portions
              }
            }
          `,
          variables: {
            userId: this.$auth.user.sub,
          },
        })
        .then((data) => {
          const items = data.data.cart_recipe
          for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const row = [item.recipe.name, item.portions]
            this.cart.push(row)
          }
        })
    },
    async getCartIngredients() {
      await this.$apollo
        .query({
          query: gql`
            query ($userId: String!) {
              recipe_ingredient(
                where: {
                  recipe: { cart_recipes: { user_id: { _eq: $userId } } }
                }
              ) {
                grams
                ingredient {
                  name
                  store_ingredients {
                    product_code
                    units
                    grams_per_unit
                    unit_name
                  }
                }
              }
            }
          `,
          variables: {
            userId: this.$auth.user.sub,
          },
        })
        .then((data) => {
          const ingredients = data.data.recipe_ingredient
          for (let i = 0; i < ingredients.length; i++) {
            const item = ingredients[i]
            if (item.ingredient.store_ingredients.length === 0) {
              continue
            }
            const productCode =
              item.ingredient.store_ingredients[0].product_code

            console.log('mm')
            const ingredient = {
              name: item.ingredient.name,
              grams: item.grams,
              details: item.ingredient.store_ingredients,
            }
            if (this.ingredients[productCode]) {
              this.ingredients[productCode].grams += item.grams
            } else {
              this.ingredients[productCode] = ingredient
            }
          }

          console.log(this.ingredients)
        })
    },
  },
}
</script>

<style scoped></style>
