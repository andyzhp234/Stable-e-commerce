import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, deleteFromCart } from "../../redux/action/apiCart.js";
import { startStripeCheckOut } from "../../redux/action/apiOrder.js";
import Meta from "../../components/Meta";
import Alert from "@mui/material/Alert";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

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

  function deleteHandler(id) {
    dispatch(deleteFromCart(id));
  }

  function checkoutHandler(e) {
    e.preventDefault();
    if (!userInfo) {
      navigate("/login?redirect=cart");
    } else if (cartItems.length > 0) {
      // user has more than 1 items in the cart and is logged in
      dispatch(startStripeCheckOut({ orderItems: cart.cartItems }));
    }
  }

  return (
    <div className="cartPage">
      <Meta title="Shopping Cart" />
      <Alert severity="info" style={{ width: "100%", marginBottom: "20px" }}>
        <strong>Checkout Info:</strong> Use card number{" "}
        <strong>4242 4242 4242 4242</strong>, An{" "}
        <strong> Valid Furture Date </strong>, and{" "}
        <strong>Any three-digit CVC</strong>
      </Alert>
      <div className="cart_title">Shopping Cart</div>

      <div className="carts">
        {cartItems.length === 0 ? (
          <div>Your shopping cart is currently empty.</div>
        ) : (
          <div>
            {cartItems.map((product) => {
              return (
                <div className="product_listing" key={product._id}>
                  <img
                    src={product.image}
                    alt="product_image"
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  <div
                    className="product_listing_name"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </div>
                  <div className="product_listing_quantity">
                    <img
                      src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/minus-icon.png"
                      alt=""
                      onClick={(e) => quantityHandler(product, product.qty - 1)}
                    />
                    {product.qty}
                    <img
                      src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/plus-icon.png"
                      alt=""
                      onClick={(e) => quantityHandler(product, product.qty + 1)}
                    />
                  </div>

                  <div className="product_listing_subtotal">
                    <div>
                      $ {((product.price * product.qty) / 100).toFixed(2)}
                    </div>
                    <div
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => deleteHandler(product._id)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="cart_checkout">
        <div className="cart_subtotal">
          Subtotal: $
          {cartItems.length === 0
            ? 0
            : cartItems
                .reduce((init, a) => {
                  return init + (a.price * a.qty) / 100;
                }, 0)
                .toFixed(2)}
        </div>
        <div className="cart_items">Total Items: {cartItems.length}</div>
        <div id="cart_checkout_button" onClick={checkoutHandler}>
          Checkout
        </div>
      </div>
    </div>
  );
}
