<template>
  <div v-if="recipe_by_pk" id="recipe-page" class="flex flex-col">
    <img class="recipe-image -mb-8" :src="recipe_by_pk.image_url" />
    <div class="drawer p-4">
      <h1>{{ recipe_by_pk.name }}</h1>
      <Recipe-Toggle :tab="tab" @showTab="changeTab" />
      <!-- Ingredienser -->
      <Recipe-Ingredients v-show="tab === 'ingredients'" />

      <!-- Steg -->
      <Recipe-Steps v-show="tab === 'steps'" />
      <button class="remove-button" @click="removeRecipe">Radera recept</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql

export default {
  data() {
    return {
      tab: 'ingredients',
      id: this.$route.params.id,
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
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
#recipe-page {
  /* margin-top: -50px; */
}
.drawer {
  background-color: white;
  padding-top: 16px;

  border-radius: 32px;
}
.recipe-image {
  max-width: 100vw;
}
.remove-button {
  margin: 40px 0 0 0;
}
</style>
