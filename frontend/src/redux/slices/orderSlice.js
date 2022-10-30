import {createSlice} from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    pending: false,
    error: false,
    errorMessage: '',
    createSuccess: false,
  },
  reducers: {
    orderCreateRequest: (state) => {
      state.pending = true;
    },
    orderCreateSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.createSuccess = true;
      state.errorMessage = '';
      state.order = action.payload;
    },
    orderCreateFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.createSuccess = false;
      state.errorMessage = action.payload;
    },
    getOrderDetailRequest: (state) => {
      state.pending = true;
    },
    getOrderDetailSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.errorMessage = '';
      state.order = action.payload;
    },
    getOrderDetailFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },

    orderPayRequest: (state) => {
      state.pending = true;
    },
    orderPaySuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.errorMessage = '';
      state.order = action.payload;
    },
    orderPayFailed: (state, action) => {
      state.pending = false;
      state.error = false;
      state.errorMessage = '';
      state.order = action.payload;
    },
    orderPayReset: (state) => {
      // state.pending = true;
    },
  }
})


export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFailed,
  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFailed,
  orderPayRequest,
  orderPaySuccess,
  orderPayFailed,
  orderPayReset,
} = orderSlice.actions;
export default orderSlice.reducer;