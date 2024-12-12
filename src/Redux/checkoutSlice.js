import { createSlice } from '@reduxjs/toolkit'

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false
  },
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {

        status: 'Pending',
        ...action.payload
      };
      state.orders.push(newOrder);
      state.currentOrder = newOrder;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  }
});

export const { createOrder, updateOrderStatus, clearCurrentOrder } = checkoutSlice.actions;
export default checkoutSlice.reducer;
