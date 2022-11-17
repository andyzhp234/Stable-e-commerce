import {
  resetUserState,
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
} from "../slices/userSlice";
import { baseURL } from "../../lib/axiosAPI";
import axios from "axios";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(resetUserState());
      dispatch(loginRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseURL}/api/users/login`,
        { email, password },
        config
      );
      dispatch(loginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        loginFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch(resetUserState());
    dispatch(userLogout());
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(resetUserState());
      dispatch(registerRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseURL}/api/users`,
        { name, email, password },
        config
      );
      dispatch(registerSuccess(data));
      dispatch(loginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        registerFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const updateUserInfo = (user) => {
  return async (dispatch) => {
    try {
      dispatch(resetUserState());
      dispatch(updateInfoRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
          Bearer: `${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/api/users/profile`,
        user,
        config
      );
      dispatch(updateInfoSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(updateInfoFailed("Please Login again"));
        dispatch(logout());
      } else {
        dispatch(
          updateInfoFailed(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    }
  };
};
