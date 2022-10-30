import {
  cartAddItem,
  cartDeleteItem,
  cartSaveShippingAddress,
  cartSavePaymentMethod,
} from '../slices/cartSlice.js'

export const addToCart = (product, qty) => {
  return async (dispatch, getState) => {
    dispatch(cartAddItem({
      productID: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: qty
    }))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}


export const deleteFromCart = (id) => {
  return async (dispatch, getState) => {
    dispatch(cartDeleteItem(id))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}

export const saveShippingAddress = (data) => {
  return async (dispatch) => {
    dispatch(cartSaveShippingAddress(data))
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }
}

export const savePaymentMethod = (data) => {
  return async (dispatch) => {
    dispatch(cartSavePaymentMethod(data))
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }
}



