import {
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
} from "../slices/orderSlice";
import axios from 'axios';


export const startStripeCheckOut = (order) => {
  // create-checkout-session
  return async (dispatch, getState) => {
    try {
      let {user} = getState();
      user = user.userInfo;
      order['customerID'] = user._id;
      const config = {
        headers: {
          'Content-Type' : 'application/json',
          'Bearer': `${user.token}`
        }
      }
      
      const {data} = await axios.post(
        'http://localhost:5000/stripe/create-checkout-session',
        order,
        config
      )

      window.location = data.url
    } catch(error) {
      console.log(error.message)
    }
  }
}


export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderCreateRequest())

      let {user} = getState();
      user = user.userInfo;

      const config = {
        headers: {
          'Content-Type' : 'application/json',
          'Bearer': `${user.token}`
        }
      }

      const {data} = await axios.post(
        'http://localhost:5000/api/orders',
        order,
        config
      )

      dispatch(orderCreateSuccess(data))
    } catch(error) {
      dispatch(
        orderCreateFailed(
          error.response && error.response.data.message?
          error.response.data.message:
          error.message
        )
      )
    }
  }
}

export const getOrderDetail = (id, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderPayRequest())

      let {user} = getState();
      user = user.userInfo;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Bearer': `${user.token}`
        }
      }

      const {data} = await axios.put(
        `http://localhost:5000/api/orders/${id}/pay`,
        paymentResult,
        config
      )

      dispatch(getOrderDetailSuccess(data))
    } catch(error) {
      dispatch(
        getOrderDetailFailed(
          error.response && error.response.data.message?
          error.response.data.message:
          error.message
        )
      )
    }
  }
}



export const payOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(getOrderDetailRequest())

      let {user} = getState();
      user = user.userInfo;

      const config = {
        headers: {
          'Bearer': `${user.token}`
        }
      }
      const {data} = await axios.get(
        `http://localhost:5000/api/orders/${id}`,
        config
      )

      dispatch(orderPaySuccess(data))
    } catch(error) {
      dispatch(
        orderPayFailed(
          error.response && error.response.data.message?
          error.response.data.message:
          error.message
        )
      )
    }
  }
}