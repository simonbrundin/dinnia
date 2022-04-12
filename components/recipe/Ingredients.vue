<template>
  <div v-if="ingredients !== []" class="flex flex-col">
    <!-- <h2>Ingredienser</h2> -->
    <!-- Ingredienser -->
    <div
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :to="{ name: 'ingredient-id', params: { id: ingredient.ingredient.id } }"
      class="flex flex-row justify-between card my-1 p-4 items-center"
      @click="editing = ingredient.id"
    >
      <div class="flex flex-row items-center">
        <img
          v-if="ingredient.ingredient.store_ingredients.length > 0"
          :src="ingredient.ingredient.store_ingredients[0].image_url"
          alt=""
          class="w-8"
        />
        <div
          :class="{
            'incomplete-store-info':
              ingredient.ingredient.store_ingredients.length === 0 ||
              ingredient.ingredient.store_ingredients[0].product_code ===
                undefined,
          }"
        >
          {{ ingredient.ingredient.name }}
        </div>
      </div>
      <div>{{ ingredient.grams }} g</div>
    </div>
    <!-- Ändra -->
    <EditIngredient
      v-if="editing !== 0"
      :editing="editing"
      @close="editing = 0"
    />
    <button class="add-ingredient" @click="showAddIngredient = true">
      Lägg till ingrediens
    </button>
    <Recipe-AddIngredient
      v-if="showAddIngredient"
      @hideAddIngredient="showAddIngredient = false"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql
export default {
  data() {
    return {
      editing: 0,
      title: '',
      id: this.$route.params.id,
      ingredients: [],
      showAddIngredient: false,
    }
  },
  mounted() {
    this.getIngredients()
  },
  methods: {
    async getIngredients() {
      await this.$apollo
        .query({
          query: gql`
            query ($id: Int!) {
              recipe_ingredient(where: { recipe_id: { _eq: $id } }) {
                ingredient {
                  name
                  id
                  store_ingredients {
                    grams_per_unit
                    product_code
                    unit_name
                    units
                    url
                    store_id
                    image_url
                  }
                }
                grams
                id
              }
            }
          `,
          variables: {
            id: this.$data.id,
          },
        })
        .then((data) => {
          const steps = data.data.recipe_ingredient
          if (steps === []) {
            return
          }

          this.ingredients = steps
        })
    },
    async editGrams(id, gram) {
      const grams = prompt('Hur många gram?', gram)
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($id: Int!, $grams: Int!) {
            update_recipe_ingredient(
              where: { id: { _eq: $id } }
              _set: { grams: $grams }
            ) {
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id,
          grams,
        },
      })
      location.reload()
    },

    async addIngredient() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($added_by: String!, $name: String!) {
            insert_recipe_one(object: { added_by: $added_by, name: $name }) {
              id
              name
            }
          }
        `,
        variables: {
          added_by: this.$auth.user.sub,
          name: this.title,
        },
      })
      location.reload()
    },
  },

  // apollo: {
  //   recipe_ingredient: {
  //     query: gql`
  //       query ($id: Int!) {
  //         recipe_ingredient(where: { recipe_id: { _eq: $id } }) {
  //           ingredient {
  //             name
  //             id
  //           }
  //           grams
  //           id
  //         }
  //       }
  //     `,
  //     variables() {
  //       return {
  //         id: this.$data.id,
  //       }
  //     },
  //   },
  // },
}
</script>

<style scoped>
.incomplete-store-info {
  color: red;
}
</style>
