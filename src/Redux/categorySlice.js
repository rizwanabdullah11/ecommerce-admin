import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null
  },
  reducers: {
    addCategory: (state, action) => {
      const isDuplicate = state.categories.some(
        cat => cat.name.toLowerCase() === action.payload.name.toLowerCase()
      )
      if (!isDuplicate) {
        state.categories.push(action.payload)
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload)
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id)
      if (index !== -1) {
        state.categories[index] = action.payload
      }
    }
  }
})

export const { addCategory, deleteCategory, updateCategory } = categorySlice.actions
export default categorySlice.reducer
