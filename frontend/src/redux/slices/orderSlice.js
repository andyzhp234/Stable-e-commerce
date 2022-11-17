import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    pending: false,
    error: false,
    errorMessage: "",
    createSuccess: false,
  },
  reducers: {
    getOrderDetailRequest: (state) => {
      state.pending = true;
    },
    getOrderDetailSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
      state.order = action.payload;
    },
    getOrderDetailFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    orderReset: (state) => {
      state.order = null;
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
      state.createSuccess = false;
    },
  },
});

export const {
  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFailed,
  orderReset,
} = orderSlice.actions;

export default orderSlice.reducer;
