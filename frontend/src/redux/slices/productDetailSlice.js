import { createSlice } from "@reduxjs/toolkit";

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    productInfo: {},
    pending: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    updateProductDetailStart: (state) => {
      state.pending = true;
    },
    updateProductDetailSuccess: (state, action) => {
      state.pending = false;
      state.productInfo = action.payload;
    },
    updateProductDetailFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    productDetailReset: (state) => {
      state.productInfo = {};
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
    },
  },
});

export const {
  updateProductDetailStart,
  updateProductDetailSuccess,
  updateProductDetailFailed,
  productDetailReset,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;
