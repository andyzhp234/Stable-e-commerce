import React from "react";
import { addToCart, deleteFromCart } from "../../redux/action/apiCart.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MinusIcon from "../../assets/icons/minus-icon.png";
import PlusIcon from "../../assets/icons/plus-icon.png";

export default function Cart({ cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function deleteHandler(id) {
    dispatch(deleteFromCart(id));
  }

  function quantityHandler(product, count) {
    if (count > 0) {
      dispatch(
        addToCart(
          {
            ...product,
            images: [product.image],
          },
          count
        )
      );
    }
  }

  return (
    <div className="shoppingCart__container">
      {cartItems.length === 0 ? (
        <h1>Your shopping cart is currently empty.</h1>
      ) : (
        <div>
          {cartItems?.map((product) => {
            return (
              <div className="cart_listing" key={product._id}>
                <img
                  className="cart_listing__image"
                  src={product.image}
                  alt="product_image"
                  onClick={() => navigate(`/product/${product._id}`)}
                />
                <h2
                  className="cart_listing__text cursor-pointer grow-1"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.name}
                </h2>
                <div>
                  <div className="addCount-button">
                    <img
                      src={MinusIcon}
                      alt=""
                      onClick={(e) => quantityHandler(product, product.qty - 1)}
                    />
                    {product.qty}
                    <img
                      src={PlusIcon}
                      alt=""
                      onClick={(e) => quantityHandler(product, product.qty + 1)}
                    />
                  </div>
                </div>

                <h2 className="cart_listing__text">
                  $ {((product.price * product.qty) / 100).toFixed(2)}
                </h2>
                <h2
                  className="cart_listing__remove"
                  onClick={() => deleteHandler(product._id)}
                >
                  Remove
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
