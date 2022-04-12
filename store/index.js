export const state = () => ({
  grams: 0,
  products: { '101205129_ST': 5, '101223725_ST': 6 },
  cart: {},
})

export const actions = {
  async addToWillysCart() {
    const data = []
    for (const product in this.state.cart) {
      const row = [product, this.state.cart[product]]
      data.push(row)
    }

    const isAdded = await this.$axios.$post('/api/', data)

    console.log(isAdded)
  },
}

export const mutations = {
  addToCart(state, { id, amount }) {
    // Using the spread operator

    if (state.cart[id]) {
      state.cart[id] += amount
    } else {
      state.cart = {
        ...state.cart,
        [id]: amount,
      }
    }
  },
}

export const getters = {
  getCart(state) {
    return state.cart
  },
}
