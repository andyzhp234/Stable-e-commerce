import {createSlice} from '@reduxjs/toolkit';

export const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    productListInfo: [],
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
      state.productListInfo = action.payload
    },
    updateFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload
    }
  }
})

export const {updateStart, updateSuccess, updateFailed} = productListSlice.actions;
export default productListSlice.reducer;