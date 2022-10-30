import { updateStart, updateSuccess, updateFailed } from "../slices/productListSlice";
import axios from 'axios';


const getProductList = async (dispatch) => {
  dispatch(updateStart());
  try {
    const result = await axios.get("http://localhost:5000/api/products")
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

export default getProductList;