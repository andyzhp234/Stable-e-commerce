import React from "react";
import Ratings from "../../components/Ratings";

export default function SeeComments({ productInfo }) {
  return (
    <div className="product_detail_reviews margin-block-end-36">
      <h1>Reviews</h1>
      {productInfo?.reviews?.map((review) => {
        return (
          <div className="product_detail_reviews_comment" key={review._id}>
            <div className="product_detail_comment__title">
              <h2>{review.name}</h2>
              <h2>{new Date(review.createdAt).toISOString().split("T")[0]}</h2>
            </div>
            <Ratings rating={review.rating} />
            <h2 className="product_detail_comment_paragraph">
              {review.comment}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
