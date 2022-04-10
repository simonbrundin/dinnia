<template>
  <div v-if="ingredients !== []">
    <h2>Ingredienser</h2>
    <div
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :to="{ name: 'ingredient-id', params: { id: ingredient.ingredient.id } }"
    >
      {{ ingredient.ingredient.name }}
      <button @click="editGrams(ingredient.id, ingredient.gram)">
        {{ ingredient.grams }} g
      </button>
      <button @click="deleteIngredient(ingredient.id)">x</button><br />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql
export default {
  data() {
    return {
      title: '',
      id: this.$route.params.id,
      ingredients: [],
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
    async deleteIngredient(id) {
      // console.log('radering inledd')
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($id: Int!) {
            delete_recipe_ingredient(where: { id: { _eq: $id } }) {
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id,
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

<style scoped></style>
