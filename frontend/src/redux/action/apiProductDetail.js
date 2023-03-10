import {
  updateProductDetailStart,
  updateProductDetailSuccess,
  updateProductDetailFailed,
  productDetailReset,
} from "../slices/productDetailSlice";
import axios from "axios";
import { baseURL } from "../../lib/axiosAPI";

const getProductDetail = async (productID, dispatch) => {
  dispatch(productDetailReset());
  dispatch(updateProductDetailStart());
  try {
    const result = await axios.get(`${baseURL}/api/products/${productID}/`);
    dispatch(updateProductDetailSuccess(result.data));
  } catch (error) {
    dispatch(
      updateProductDetailFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export default getProductDetail;
