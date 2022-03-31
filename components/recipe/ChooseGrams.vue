<template>
  <Modal>
    <button @click="$emit('hideChooseGrams')">Tillbaka</button>
    <input v-model="grams" type="number" placeholder="Hur många gram?" /><button
      @click="updateGrams()"
    >
      Lägg till ingrediens
    </button>
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      grams: 0,
    }
  },
  methods: {
    updateGrams() {
      this.$emit('hideChooseGrams')
      this.$emit('updateGrams', this.grams)
    },
  },
}
</script>

<style scoped></style>
