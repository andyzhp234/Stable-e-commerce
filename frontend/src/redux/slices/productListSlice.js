import { createSlice } from "@reduxjs/toolkit";

export const productListSlice = createSlice({
  name: "productList",
  initialState: {
    productListInfo: {},
    pending: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    updateProductStart: (state) => {
      state.pending = true;
    },
    updateProductSuccess: (state, action) => {
      state.pending = false;
      state.productListInfo = action.payload;
    },
    updateProductFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    productListReset: (state) => {
      state.productListInfo = {};
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
    },
  },
});

export const {
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  productListReset,
} = productListSlice.actions;
export default productListSlice.reducer;
