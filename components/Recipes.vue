<template>
  <div class="content">
    <h1 class="text-center">Mina recept</h1>

    <RecipeCard
      v-for="recipe in userRecipes"
      :key="recipe.id"
      :recipe="recipe"
    />
    <div class="pt-4">
      <input v-model="title" type="text" placeholder="Receptnamn" />
      <button @click="addRecipe()">Lägg till recept</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = useState('title', () => '')
// const recipes = useState('recipes', () => userRecipes)

const addRecipe = async () => {
  const recipe = await useAsyncGql({
    operation: 'AddRecipe',
    variables: {
      added_by: 'auth0|624407dca724e900699885c0',
      name: title,
    },
  })
    .then((data) => data)
    .catch((error) => console.log(error))

  location.reload()
}

const { data: UserRecipes } = await useAsyncGql({
  operation: 'UserRecipes',
})
const userRecipes = UserRecipes.value.recipe
</script>

<style scoped></style>
