import {
  orderReset,
  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFailed,
} from "../slices/orderSlice";
import { logout } from "./apiUserAction";
import { baseURL } from "../../lib/axiosAPI";
import axios from "axios";

export const startStripeCheckOut = (order) => {
  // create-checkout-session
  return async (dispatch, getState) => {
    try {
      let { user } = getState();
      user = user.userInfo;
      order["customerID"] = user._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Bearer: `${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/stripe/create-checkout-session`,
        order,
        config
      );
      window.location = data.url;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logout());
      } else {
        console.log(error.message);
      }
    }
  };
};

export const getOrderDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderReset());
      dispatch(getOrderDetailRequest());
      let { user } = getState();
      user = user.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Bearer: `${user.token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/api/orders/${id}`, config);
      dispatch(getOrderDetailSuccess(data));
    } catch (error) {
      dispatch(
        getOrderDetailFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
