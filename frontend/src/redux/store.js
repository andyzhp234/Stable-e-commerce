import { configureStore } from '@reduxjs/toolkit'
import productListSlice from './slices/productListSlice'
import productDetailSlice from './slices/productDetailSlice'
import cartSlice from './slices/cartSlice'
import userSlice from './slices/userSlice'
import orderSlice from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    productList: productListSlice,
    productDetail: productDetailSlice,
    cart: cartSlice,
    user: userSlice,
    order: orderSlice,
  }
})
