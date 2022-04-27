<template>
  <Modal @close="$emit('hideAddIngredient')">
    <!-- Välj butik -->
    <div v-if="step === 3" class="choose-store">
      <div>
        <img
          src="https://d2rfo6yapuixuu.cloudfront.net/he9/h4c/8878098546718/willys_logo.svg"
        />
      </div>
    </div>
    <!-- Välj ingrediens -->
    <h1 class="text-center">Ingrediens</h1>
    <div class="choose-ingredient">
      <div class="flex flex-row m-4 gap-2">
        <input
          v-model="title"
          type="text"
          placeholder="Lägg till ny ingrediens"
        />
        <button @click="chooseGrams()">Lägg till ingrediens</button>
      </div>
      <div class="grid grid-cols-2">
        <div
          v-for="ingredient in ingredient"
          :key="ingredient.id"
          class="card m-2"
          @click="chooseGrams(ingredient.id)"
        >
          {{ ingredient.name }}
        </div>
      </div>
    </div>

    <Recipe-ChooseGrams
      v-show="showChooseGrams"
      @hideChooseGrams="showChooseGrams = false"
      @updateGrams="updateGrams"
    />
    <Recipe-ChooseSection
      v-show="showChooseSection"
      @hideChooseSection="showChooseSection = false"
      @updateSection="updateSection"
    />
    <button @click="$emit('hideAddIngredient')">Stäng</button>
  </Modal>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql
export default {
  data() {
    return {
      step: 1,
      showChooseGrams: false,
      showChooseSection: false,
      title: '',
      grams: 0,
      ingredientId: 0,
      sectionId: 0,
    }
  },
  methods: {
    updateSection(id) {
      this.sectionId = id
      this.showChooseSection = false
      this.addIngredient()
      this.$emit('hideAddIngredient')
    },
    updateGrams(grams) {
      this.grams = parseInt(grams)
      this.showChooseGrams = false
      this.showChooseSection = true
    },
    async addIngredient() {
      // ------ Välja gram
      // ------ Välja avdelning
      const name = () => {
        if (this.title === '') {
          return null
        }
        return this.title
      }
      // Skicka graphqlfråga för att lägga till ingrediens till användarens ingredienser
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation (
              $name: String!
              $store_section_id: Int!
              $added_by: String!
            ) {
              insert_ingredient(
                objects: {
                  name: $name
                  store_section_id: $store_section_id
                  added_by: $added_by
                }
              ) {
                returning {
                  id
                }
              }
            }
          `,
          variables: {
            name,
            store_section_id: this.sectionId,
            added_by: this.$auth.user.sub,
          },
        })
        .then((data) => {
          this.ingredientId = data.data.insert_ingredient.returning[0].id
        })
      // Skicka graphqlfråga för att lägga till ingrediens till receptet
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
          ingredient(
            where: { added_by: { _eq: $id } }
            order_by: { name: asc }
          ) {
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
