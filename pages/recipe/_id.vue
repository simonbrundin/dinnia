<template>
  <div v-if="recipe_by_pk">
    <h1>{{ recipe_by_pk.name }}</h1>
    <img class="recipe-image" :src="recipe_by_pk.image_url" />
    <!-- Ingredienser -->
    <Recipe-IngredientList />
    <button class="add-ingredient" @click="showAddIngredient = true">
      Lägg till ingrediens
    </button>
    <Recipe-AddIngredient
      v-if="showAddIngredient"
      @hideAddIngredient="showAddIngredient = false"
    />
    <!-- Steg -->
    <Recipe-Steps />
    <button class="remove-button" @click="removeRecipe">Radera recept</button>
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql

export default {
  data() {
    return {
      id: this.$route.params.id,
      showAddIngredient: false,
    }
  },
  methods: {
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
    async removeRecipe() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($id: Int!) {
            delete_recipe_by_pk(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: this.id,
        },
      })
      this.$router.push({ path: '/' })
    },
  },
  apollo: {
    recipe_by_pk: {
      query: gql`
        query ($id: Int!) {
          recipe_by_pk(id: $id) {
            added_by
            date_created
            id
            name
            image_url
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

<style scoped>
.recipe-image {
  width: 200px;
}
.remove-button {
  margin: 40px 0 0 0;
}
</style>
