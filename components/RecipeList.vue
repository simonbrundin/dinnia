<template>
  <div>
    <h2>Mina recept</h2>
    <input v-model="title" type="text" placeholder="Receptnamn" />
    <button @click="addRecipe()">Lägg till recept</button>
    <div v-for="recipe in recipe" :key="recipe.id">
      <div class="flex items-center">
        <nuxt-link :to="{ name: 'recipe-id', params: { id: recipe.id } }">
          {{ recipe.name }}
        </nuxt-link>
        <Recipe-AddToCart />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql
export default {
  data() {
    return {
      title: '',
    }
  },

  methods: {
    async addRecipe() {
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
    recipe: {
      query: gql`
        query {
          recipe {
            id
            name
          }
        }
      `,
    },
  },
}
</script>

<style scoped></style>
