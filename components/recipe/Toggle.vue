<template>
  <div class="toggle-background flex flex-row justify-center m-auto">
    <div
      :class="{ active: tab === 'ingredients' }"
      class="rounded-full"
      @click="changeTab('ingredients')"
    >
      Ingredienser
    </div>
    <div :class="{ active: tab === 'steps' }" @click="changeTab('steps')">
      Steg
    </div>
  </div>
</template>

<script>
export default {
  props: { tab: { type: String, default: '' } },
  methods: {
    changeTab(tab) {
      this.$emit('showTab', tab)
    },
  },
}
</script>

<style scoped>
.toggle-background {
  background: darkgrey;
  width: fit-content;
  border-radius: 9999px;
}

.toggle-background div {
  padding: 16px 32px;
}
.active {
  background: lightgrey;
  border-radius: 9999px;
  padding: 16px;
}
</style>
