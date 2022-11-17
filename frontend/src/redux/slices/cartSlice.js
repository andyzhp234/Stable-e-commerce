import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    cartAddItem: (state, action) => {
      let product = action.payload;
      const existItem = state.cartItems.find(
        (prev) => product._id === prev._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((prev) =>
          prev._id === product._id ? product : prev
        );
      } else {
        state.cartItems.push(product);
      }
    },
    cartDeleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product) => product._id !== action.payload
      );
    },
    cartDeleteAll: (state) => {
      state.cartItems = [];
    },
  },
});

export const { cartAddItem, cartDeleteItem, cartDeleteAll } = cartSlice.actions;
export default cartSlice.reducer;
