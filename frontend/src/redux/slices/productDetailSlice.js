import {createSlice} from '@reduxjs/toolkit';

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    productInfo: {},
    pending: false,
    error: false,
    errorMessage: '',
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.productInfo = action.payload
    },
    updateFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload
    }
  }
})

export const {updateStart, updateSuccess, updateFailed} = productDetailSlice.actions;
export default productDetailSlice.reducer;