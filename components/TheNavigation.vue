<template>
  <div
    id="the-navigation"
    class="absolute flex flex-row pt-8 px-8 justify-between items-center w-full"
  >
    <div class="p-4 rounded-full back-icon z-50">
      <MaterialIconChevronLeft @click="$router.back()" />
    </div>

    <CartIcon />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#the-navigation {
  background: rgba(0, 0, 0, 0);
  z-index: 90;
}

.back-icon {
  background: white;
}
</style>
