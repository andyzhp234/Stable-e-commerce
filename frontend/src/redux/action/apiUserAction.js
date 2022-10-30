import {
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
} from '../slices/userSlice';

import axios from 'axios';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest())
      const config = {
        headers: {
          'Content-Type' : 'application/json'
        }
      }
      const {data} = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        config
      )
      dispatch(loginSuccess(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
      dispatch(
        loginFailed(
          error.response && error.response.data.message?
          error.response.data.message:
          error.message
        )
      )
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(userLogout())
  }
}


export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(registerRequest())
      const config = {
        headers: {
          'Content-Type' : 'application/json'
        }
      }
      const {data} = await axios.post(
        'http://localhost:5000/api/users',
        { name, email, password },
        config
      )
      dispatch(registerSuccess(data))
      dispatch(loginSuccess(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
      dispatch(
        registerFailed(
          error.response && error.response.data.message?
          error.response.data.message:
          error.message
        )
      )
    }
  }
}

export const updateUserInfo = (user) => {
  return async (dispatch) => {
    try {
      dispatch(updateInfoRequest())
      const config = {
        headers: {
          'Content-Type' : 'application/json',
          'Bearer': `${user.token}`
        }
      }
      const {data} = await axios.put('http://localhost:5000/api/users/profile', user, config)
      dispatch(updateInfoSuccess(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(
        updateInfoFailed(
          error.response && error.response.data.message?
          error.response.data.message:
          error.message
        )
      )
    }
  }
}

