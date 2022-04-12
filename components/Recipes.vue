<template>
  <div class="content">
    <h1 class="text-center">Mina recept</h1>

    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    <div class="pt-4">
      <input v-model="title" type="text" placeholder="Receptnamn" />
      <button @click="addRecipe()">Lägg till recept</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql
export default {
  data() {
    return {
      title: null,
      recipes: [],
    }
  },
  mounted() {
    this.getRecipes()
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
    async getRecipes() {
      await this.$apollo
        .query({
          query: gql`
            query {
              recipe {
                name
                image_url
                id
                cart_recipes {
                  portions
                }
              }
            }
          `,
          // variables: {
          //   id: this.$data.id,
          // },
        })
        .then((data) => {
          const recipes = data.data.recipe
          if (recipes === []) {
            return
          }
          for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            this.recipes.push(recipe)
          }
        })
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

<style scoped></style>
