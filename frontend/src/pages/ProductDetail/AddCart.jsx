import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action/apiCart.js";

export default function AddCart({ productInfo, count, setCount }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function addToCartHandler(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    dispatch(addToCart(productInfo, count));
    navigate("/cart");
  }

  return (
    <div className="productDetailPage__pricesContainer">
      <div className="productDetailPage__price">
        $ {productInfo.price / 100}
      </div>
      <div className="productDetailPage__addCart">
        {productInfo.countInStock > 0 ? (
          <div className="addCount-button margin-inline-end-16">
            <img
              src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/minus-icon.png"
              alt="minus-button"
              onClick={() =>
                setCount((prevState) => {
                  if (prevState === 1) return prevState;
                  else return prevState - 1;
                })
              }
            />
            <h1>{count}</h1>
            <img
              src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/plus-icon.png"
              alt="plus-button"
              onClick={() => setCount((prevState) => prevState + 1)}
            />
          </div>
        ) : null}
        {productInfo.countInStock > 0 ? (
          <h1 className="black-rounded-button" onClick={addToCartHandler}>
            Add To Cart
          </h1>
        ) : (
          <h1 className="black-rounded-button">Out of Stock</h1>
        )}
      </div>
    </div>
  );
}
