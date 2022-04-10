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

<script>
import gql from 'graphql-tag' // Don't forget to import gql

export default {
  data() {
    return {
      grams: 0,
    }
  },
  methods: {
    // TODO Graphqlfråga som hämtar alla sektioner
    updateGrams() {
      this.$emit('hideChooseSection')
      this.$emit('updateGrams', this.grams)
    },
  },
  apollo: {
    store_section: {
      query: gql`
        query {
          store_section {
            name
            id
          }
        }
      `,
    },
  },
}
</script>

<style scoped></style>
