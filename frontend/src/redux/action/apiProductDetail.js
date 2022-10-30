import { updateStart, updateSuccess, updateFailed } from "../slices/productDetailSlice";
import axios from 'axios';

const getProductDetail = async (productID, dispatch) => {
  dispatch(updateStart());
  try {
    const result = await axios.get(`http://localhost:5000/api/products/${productID}/`)
    dispatch(updateSuccess(result.data))
  } catch (error) {
    dispatch(
      updateFailed(error.response && error.response.data.message?
        error.response.data.message:
        error.message
      )
    )
  }
}

export default getProductDetail;