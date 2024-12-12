import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {
    addProduct: (state, action) => {
      const isDuplicate = state.products.some(
        prod => prod.name.toLowerCase() === action.payload.name.toLowerCase()
      )
      if (!isDuplicate) {
        state.products.push(action.payload)
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(prod => prod.id !== action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(prod => prod.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    }
  }
})

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions
export default productSlice.reducer
