<template>
  <div class="card">
    <h1>Ändra mängd</h1>

    <input v-model="newGrams" type="number" />
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql

export default {
  props: {
    ingredientId: { type: Number, default: 0 },
    grams: { type: Number, default: 0 },
  },
  data() {
    return {
      newGrams: this.grams,
    }
  },
  apollo: {
    ingredient: {
      query: gql`
        query ($id: Int!) {
          ingredient_by_pk(id: $id) {
            name
            image_url
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
    },
  },
}
</script>

<style scoped></style>
