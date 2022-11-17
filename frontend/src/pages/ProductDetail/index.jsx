import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getProductDetail from "../../redux/action/apiProductDetail";
import { useParams } from "react-router-dom";
import Ratings from "../../components/Ratings";
import { addToCart } from "../../redux/action/apiCart.js";
import { logout } from "../../redux/action/apiUserAction";
import { useNavigate } from "react-router-dom";
import { addProductComment } from "../../lib/axiosAPI";
import Meta from "../../components/Meta";

export default function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();

  // Redux
  const productDetail = useSelector((state) => state.productDetail);
  const { userInfo } = useSelector((state) => state.user);
  const { pending, error, errorMessage, productInfo } = productDetail;

  const [currImg, setCurrImg] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const [rating, setRating] = React.useState("");
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetail(params.id, dispatch);
  }, [dispatch, params.id]);

  function addToCartHandler(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    dispatch(addToCart(productInfo, count));
    navigate("/cart");
  }

  function commentHandler(e) {
    e.preventDefault();
    if (rating === "") {
      window.alert("Please select a rating");
    } else if (comment === "") {
      window.alert("Please add a comment");
    } else {
      if (userInfo) {
        const body = {
          rating: rating,
          comment: comment,
        };
        addProductComment(userInfo, params.id, body)
          .then(function (res) {
            window.alert("Successfully commented");
            getProductDetail(params.id, dispatch);
          })
          .catch(function (error) {
            if (error.response.status === 401) {
              dispatch(logout());
              window.alert("Please Login");
            } else {
              console.log(error.message);
            }
          });
      } else {
        navigate("/login");
      }
    }
  }

  return (
    <div>
      <Meta title={productInfo.name} />
      {pending ? (
        <div style={{ height: "90vh" }}>Loading</div>
      ) : error ? (
        <div style={{ height: "90vh" }}>{errorMessage}</div>
      ) : (
        <div className="productPage">
          <img
            className="product_main_img"
            src={productInfo.images?.[currImg]}
            alt="product_images"
          />
          <div className="product_img_paginations">
            {productInfo.images?.map((img, index) => {
              return (
                <img
                  src={img}
                  alt={index}
                  key={index}
                  onClick={(e) => setCurrImg(parseInt(e.target.alt))}
                />
              );
            })}
          </div>

          <div className="product_detail_descriptions">
            <div className="product_detail_title">{productInfo.name}</div>
            <div className="product_detail_rating">
              <Ratings product={productInfo} />
            </div>
            <div className="product_detail_price">
              $ {productInfo.price / 100}
            </div>

            {productInfo.countInStock > 0 ? (
              <div className="product_detail_count">
                <div className="product_detail_count_button">
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
                  <div>{count}</div>
                  <img
                    src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/plus-icon.png"
                    alt="plus-button"
                    onClick={() => setCount((prevState) => prevState + 1)}
                  />
                </div>
              </div>
            ) : null}

            <div className="product_detail_add_cart">
              {productInfo.countInStock > 0 ? (
                <div
                  className="product_detail_add_cart_button"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </div>
              ) : (
                <div className="product_detail_add_cart_button">
                  Out of Stock
                </div>
              )}
            </div>

            <div className="product_detail_description">
              <div style={{ fontWeight: "700", fontSize: "25px" }}>
                Descrption:
              </div>
              <div>{productInfo.description}</div>
            </div>

            <div className="product_detail_reviews">
              <div>Write a Customer Review</div>
              <div className="product_detail_reviews_details">
                <label htmlFor="star-rating">Rating</label>
                <select
                  name="star-rating"
                  id="reviews-rating"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select..</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="product_detail_reviews_details">
                <label htmlFor="reviews-comment">Comment</label>
                <textarea
                  id="reviews-comment"
                  name="reviews-comment"
                  rows="5"
                  cols="33"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="submit_reviews" onClick={commentHandler}>
                Submit
              </div>
            </div>

            <div className="product_detail_reviews">
              <div>Reviews</div>
              {productInfo?.reviews?.map((review) => {
                return (
                  <div
                    className="product_detail_reviews_comment"
                    key={review._id}
                  >
                    <div>{review.name}</div>
                    <Ratings rating={review.rating} />
                    <div>
                      {new Date(review.createdAt).toISOString().split("T")[0]}
                    </div>
                    <div>{review.comment}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
