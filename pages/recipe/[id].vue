<template>
  <div v-if="recipe_by_pk" id="recipe-page" class="flex flex-col">
    <img class="recipe-image -mb-8" :src="recipe_by_pk.image_url" />
    <div class="drawer p-4">
      <h1 class="text-center">{{ recipe_by_pk.name }}</h1>
      <Recipe-Toggle :tab="tab" @showTab="changeTab" />
      <!-- Ingredienser -->
      <Recipe-Ingredients v-show="tab === 'ingredients'" />

      <!-- Steg -->
      <!-- <Recipe-Steps v-show="tab === 'steps'" /> -->
      <button class="remove-button" @click="removeRecipe">Radera recept</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const recipeID = parseInt(route.params.id.toString())
let tab = useState('tab', () => 'ingredients')

console.log(recipeID)

const changeTab = (t) => {
  tab = t
}

const addIngredient = async () => {
  const recipe = await useAsyncGql({
    operation: 'AddRecipe',
    variables: {
      added_by: this.$auth.user.sub,
      name: this.title,
    },
  })
    .then((data) => data.store_section)
    .catch((error) => console.log(error))

  location.reload()
}

const removeRecipe = async () => {
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
  navigateTo('/')
}
const { data: RecipeByID } = await useAsyncGql({
  operation: 'RecipeByID',
  variables: {
    id: recipeID,
  },
})

const recipe_by_pk = RecipeByID.value.recipe_by_pk
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
