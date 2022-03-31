<template>
  <Modal>
    <button @click="$emit('hideAddIngredient')">Stäng</button>
    <h2>Välj ingrediens</h2>
    <div
      v-for="ingredient in ingredient"
      :key="ingredient.id"
      @click="chooseGrams(ingredient.id)"
    >
      <button>
        {{ ingredient.name }}
      </button>
    </div>
    <input v-model="title" type="text" placeholder="Lägg till ny ingrediens" />
    <button @click="chooseGrams()">Lägg till ingrediens</button>
    <Recipe-ChooseGrams
      v-show="showChooseGrams"
      @hideChooseGrams="showChooseGrams = false"
      @updateGrams="updateGrams"
    />
  </Modal>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql
export default {
  data() {
    return {
      showChooseGrams: false,
      title: '',
      grams: null,
      ingredientId: 0,
    }
  },

  methods: {
    updateGrams(grams) {
      this.grams = grams
    },
    async addIngredient() {
      // Variabel på namnet
      // const name = this.title
      // DONE Välja gram
      // Välja avdelning
      // Skicka graphqlfråga för att lägga till ingrediens till receptet
      // Skicka graphqlfråga för att lägga till ingrediens till användarens ingredienser
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($ingredientId: Int!, $grams: Int!, $recipeId: Int!) {
            insert_recipe_ingredient(
              objects: {
                ingredient_id: $ingredientId
                recipe_id: $recipeId
                grams: $grams
              }
            ) {
              returning {
                id
              }
            }
          }
        `,
        variables: {
          recipeId: this.$route.params.id,
          ingredientId: this.ingredientId,
          grams: this.grams,
        },
      })
      location.reload()
    },
    chooseGrams(id) {
      this.ingredientId = id
      this.showChooseGrams = true
    },
    chooseSection() {
      this.showChooseSection = true
    },
  },
  apollo: {
    ingredient: {
      query: gql`
        query ($id: String!) {
          ingredient(where: { added_by: { _eq: $id } }) {
            name
            id
          }
        }
      `,
      variables() {
        return {
          id: this.$auth.user.sub,
        }
      },
    },
    store_section: {
      query: gql`
        query {
          store_section {
            name
            id
          }
        }
      `,
    },
  },
}
</script>

<style scoped>
input {
  border: 1px solid black;
}
button {
  border: 1px solid black;
  padding: 0 16px;
}
</style>
