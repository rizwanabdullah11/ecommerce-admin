import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload)
    },
    updateOrderStatus: (state, action) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id)
      if (index !== -1) {
        state.orders[index].status = action.payload.status
      }
    },
    setOrders: (state, action) => {
      state.orders = action.payload
    }
  }
})

export const { addOrder, updateOrderStatus, setOrders } = orderSlice.actions
export default orderSlice.reducer
