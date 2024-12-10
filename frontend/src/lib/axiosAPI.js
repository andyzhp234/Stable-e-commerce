import axios from "axios";

export const baseURL = "https://stable-e-commerce.up.railway.app/";
// export const baseURL = "https://www.stable-store.com";
// export const baseURL = "http://localhost:5000";

export const getRecommendProducts = async () => {
  return await axios.get(`${baseURL}/api/products/recommend`);
};

export const getNewArrivals = async () => {
  return await axios.get(`${baseURL}/api/products/newarrivals`);
};

export const userGetAllOrders = async (userInfo, currPageQuery) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `${baseURL}/api/orders/myorders?pageNumber=${currPageQuery}`,
    config
  );
};

export const adminCreateProduct = async (userInfo, formData) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post(`${baseURL}/api/products`, formData, config);
};

export const adminGetOrder = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(`${baseURL}/api/orders/${id}`, config);
};

export const adminUpdateOrder = async (userInfo, isDelivered, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  const body = {
    isDelivered: isDelivered,
  };
  return await axios.put(`${baseURL}/api/orders/${id}/deliver`, body, config);
};

export const adminGetProduct = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(`${baseURL}/api/products/${id}`, config);
};

export const adminUpdateProduct = async (userInfo, id, formData) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.put(`${baseURL}/api/products/${id}`, formData, config);
};

export const adminGetUser = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(`${baseURL}/api/users/${id}`, config);
};

export const adminUpdateUser = async (userInfo, id, formData) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.put(`${baseURL}/api/users/${id}`, formData, config);
};

export const adminGetOrders = async (userInfo, pageNumber) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `${baseURL}/api/orders?pageNumber=${pageNumber}`,
    config
  );
};

export const adminGetProducts = async (userInfo, pageNumber) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `${baseURL}/api/products?pageNumber=${pageNumber}`,
    config
  );
};

export const adminDeleteProduct = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.delete(`${baseURL}/api/products/${id}`, config);
};

export const adminGetAllUsers = async (userInfo, pageNumber) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `${baseURL}/api/users?pageNumber=${pageNumber}`,
    config
  );
};

export const adminDeleteUser = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.delete(`${baseURL}/api/users/${id}`, config);
};

export const addProductComment = async (userInfo, id, formData) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.post(
    `${baseURL}/api/products/${id}/reviews`,
    formData,
    config
  );
};
