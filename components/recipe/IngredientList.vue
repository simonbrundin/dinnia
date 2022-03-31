<template>
  <div v-if="recipe_ingredient">
    <h2>Ingredienser</h2>
    <div
      v-for="ingredient in recipe_ingredient"
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
    }
  },
  methods: {
    async editGrams(id, gram) {
      console.log('hmm')
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
      console.log('radering inledd')
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

  apollo: {
    recipe_ingredient: {
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
      variables() {
        return {
          id: this.$data.id,
        }
      },
    },
  },
}
</script>

<style scoped></style>
