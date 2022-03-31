<template>
  <div v-if="ingredient_by_pk">
    <button @click="$router.go(-1)">Tillbaka</button>
    <br />
    <input v-model="ingredient_by_pk.name" />
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql

export default {
  apollo: {
    ingredient_by_pk: {
      query: gql`
        query ($id: Int!) {
          ingredient_by_pk(id: $id) {
            id
            name
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
