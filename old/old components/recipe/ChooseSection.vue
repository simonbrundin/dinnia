<template>
  <Modal v-if="store_section">
    <button @click="$emit('hideChooseSection')">Tillbaka</button>
    <!-- TODO Knappar med sektioner -->
    <div
      v-for="section in store_section"
      :key="section.id"
      @click="$emit('updateSection', section.id)"
    >
      <button>{{ section.name }}</button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
const emit = defineEmits(['hideChooseSection', 'updateGrams'])
const grams = useState('grams', () => 0)

// TODO Graphqlfråga som hämtar alla sektioner
const updateGrams = () => {
  emit('hideChooseSection')
  emit('updateGrams', grams)
}
const { data } = await useAsyncGql({
  operation: 'StoreSections',
})
const store_section = data.store_section
</script>

<style scoped></style>
