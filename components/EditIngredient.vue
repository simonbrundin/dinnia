<template>
  <Modal v-if="ingredient.length > 0">
    <div class="flex flex-col">
      <!-- {{ ingredient }} -->
      <div>
        <input v-model="ingredient[0].ingredient.name" type="text" />
      </div>
      <div><input v-model="ingredient[0].grams" type="number" /> gram</div>
      <!-- Butiksinfo -->
      <div
        v-for="store in ingredient[0].ingredient.store_ingredients"
        :key="store.store.name"
        class="flex flex-col"
      >
        <strong
          ><u>{{ store.store.name }}</u></strong
        >
        <strong>Produkturl</strong>
        <input
          v-if="ingredient[0].ingredient.store_ingredients.length > 0"
          v-model="ingredient[0].ingredient.store_ingredients[0].url"
        />
        <strong>Bildurl</strong>
        <input
          v-if="ingredient[0].ingredient.store_ingredients.length > 0"
          v-model="ingredient[0].ingredient.store_ingredients[0].image_url"
        />
        <strong>Enheter i förpackningen</strong>
        <input
          v-if="ingredient[0].ingredient.store_ingredients.length > 0"
          v-model="ingredient[0].ingredient.store_ingredients[0].units"
        />
        <strong>Enhetsnamn</strong>
        <input
          v-if="ingredient[0].ingredient.store_ingredients.length > 0"
          v-model="ingredient[0].ingredient.store_ingredients[0].unit_name"
        />
        <strong>Gram per enhet</strong>
        <input
          v-if="ingredient[0].ingredient.store_ingredients.length > 0"
          v-model="ingredient[0].ingredient.store_ingredients[0].grams_per_unit"
        />
      </div>
      <button @click="showConfirmDelete = true">Radera ingrediens</button>
      <Modal v-if="showConfirmDelete">
        <div>Är du säker?</div>
        <button @click="deleteIngredient(ingredient[0].id)">Ja</button>
        <button @click="showConfirmDelete = false">Nej</button>
      </Modal>
      <button @click="$emit('close')">Stäng</button>
    </div>
  </Modal>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql

export default {
  props: {
    editing: { type: Number, default: 0 },
    ingredientId: { type: Number, default: 0 },
    grams: { type: Number, default: 0 },
  },
  data() {
    return {
      showConfirmDelete: false,

      newGrams: this.grams,
      ingredient: [],
    }
  },
  mounted() {
    this.getIngredient()
  },
  methods: {
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
    async getIngredient() {
      await this.$apollo
        .query({
          query: gql`
            query ($ingredientId: Int!) {
              recipe_ingredient(where: { id: { _eq: $ingredientId } }) {
                grams
                id
                ingredient {
                  id
                  name
                  store_ingredients {
                    grams_per_unit
                    product_code
                    store_id
                    unit_name
                    units
                    image_url
                    url
                    store {
                      name
                    }
                  }
                }
              }
            }
          `,
          variables: {
            ingredientId: this.editing,
          },
        })
        .then((data) => {
          const ingredient = data.data.recipe_ingredient
          if (ingredient === []) {
            return
          }

          this.ingredient.push(ingredient[0])
        })
    },
  },
}
</script>

<style scoped></style>
