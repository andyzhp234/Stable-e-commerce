import {
  cartAddItem,
  cartDeleteItem,
  cartDeleteAll,
} from "../slices/cartSlice.js";

export const addToCart = (product, qty) => {
  return (dispatch, getState) => {
    dispatch(
      cartAddItem({
        _id: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        qty: qty,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const deleteFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch(cartDeleteItem(id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch(cartDeleteAll());
    localStorage.setItem("cartItems", []);
  };
};
