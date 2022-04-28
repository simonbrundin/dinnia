// Pinia Store
import { defineStore } from 'pinia'

interface State {
  grams: number
  products: Object
  cart: Object
}

export const useStore = defineStore('store', {
  // convert to a function
  state: (): State => ({
    grams: 0,
    products: { '101205129_ST': 5, '101223725_ST': 6 },
    cart: {},
  }),
  getters: {},
  actions: {
    async addToWillysCart() {
      const data = []
      for (const product in state.cart) {
        const row = [product, state.cart[product]]
        data.push(row)
      }

      const isAdded = await this.$axios.$post('/api/', data)

      console.log(isAdded)
    },
  },
})
