import {
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  productListReset,
} from "../slices/productListSlice";
import axios from "axios";
import { baseURL } from "../../lib/axiosAPI";

export const getProductList = async (
  dispatch,
  search = "",
  pageNumber = "",
  sortBy = "",
  inStockQuery = "",
  categoryQuery = "",
  brandQuery = "",
  minPriceQuery = "",
  maxPriceQuery = ""
) => {
  dispatch(productListReset());
  dispatch(updateProductStart());
  try {
    const result = await axios.get(
      `${baseURL}/api/products?search=${search}&` +
        `pageNumber=${pageNumber}&` +
        `sortBy=${sortBy}&` +
        `inStockQuery=${inStockQuery}&` +
        `categoryQuery=${categoryQuery}&` +
        `brandQuery=${brandQuery}&` +
        `minPriceQuery=${minPriceQuery}&` +
        `maxPriceQuery=${maxPriceQuery}`
    );
    dispatch(updateProductSuccess(result.data));
  } catch (error) {
    dispatch(
      updateProductFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
