import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './categorySlice';
import productSlice from './productSlice';
import orderSlice from './orderSlice';
import cartSlice from './cartSlice';
import checkoutSlice from './checkoutSlice';

const Store = configureStore({
  reducer: {
    categories: categorySlice,
    products: productSlice,
    orders: orderSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
  },
})

export default Store;
