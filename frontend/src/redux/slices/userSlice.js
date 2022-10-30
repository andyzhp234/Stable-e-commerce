import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem('userInfo')?
      JSON.parse(localStorage.getItem('userInfo'))
      :
      null,
    pending: false,
    error: false,
    errorMessage: '',
    updateSuccess: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.errorMessage = '';
      state.userInfo = action.payload;
    },
    loginFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null
    },
    registerRequest: (state) => {
      state.pending = true;
    },
    registerSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.errorMessage = '';
      state.userInfo = action.payload;
    },
    registerFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    updateInfoRequest: (state) => {
      state.pending = true;
    },
    updateInfoSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.errorMessage = '';
      state.updateSuccess = true;
      state.userInfo = action.payload;
    },
    updateInfoFailed: (state, action) => {
      state.pending = false;
      state.updateSuccess = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
  }
})

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  userLogout,
  registerRequest,
  registerSuccess,
  registerFailed,
  updateInfoRequest,
  updateInfoSuccess,
  updateInfoFailed,
} = userSlice.actions;
export default userSlice.reducer;