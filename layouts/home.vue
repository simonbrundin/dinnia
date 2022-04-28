<template>
  <div>
    <div class="flex flex-row justify-between p-4 -mb-14">
      <ProfileImage />
      <CartIcon />
    </div>
    <Nuxt />
  </div>
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue'
export default { components: { ProfileImage } }
</script>

<style scoped></style>
