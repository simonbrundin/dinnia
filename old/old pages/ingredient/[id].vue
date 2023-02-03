<template>
  <div v-if="ingredient_by_pk">
    <button @click="$router.go(-1)">Tillbaka</button>
    <br />
    <input v-model="ingredient_by_pk.name" />
  </div>
</template>

<script setup>
const { data } = await useAsyncGql({
  operation: 'IngredientByID',
  variables: { id: this.$route.params.id },
})
const ingredient_by_pk = data.ingredient_by_pk
</script>

<style scoped></style>
