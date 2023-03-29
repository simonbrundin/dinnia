<template>
  <div class="text-white">
    <div v-for="recipe in recipes" :key="recipe.id">
      {{ recipe.title }}
    </div>
    <!-- <div v-if="recipes" class="flex flex-col">
      <input
        type="text"
        v-model="ingredient.name"
        class="bg-transparent text-white"
        v-debounce:1s="updateIngredient"
      />
      <input
        type="text"
        v-model="ingredient.standard_unit"
        class="bg-transparent text-white"
        v-debounce:1s="updateIngredient"
      />
    </div> -->
    <NuxtLink to="/">Startsida</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const recipes = await getUserRecipes(nhost.auth.getUser()!.id);
// const updateIngredient = async () => {
//   const { onDone } = await updateIngredientByPk(
//     Number(useRoute().params.id),
//     ingredient.name,
//     ingredient.standard_unit
//   );
//   onDone(() => {
//     console.log("Ingrediens uppdaterad");
//   });
// };
</script>

<style scoped></style>
