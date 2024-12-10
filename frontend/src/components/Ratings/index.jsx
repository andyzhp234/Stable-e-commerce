import React from "react";
import StarFillIcon from "../../assets/icons/star-fill.png";
import StarHalfFillIcon from "../../assets/icons/star-half-fill.png";
import StarUnfillIcon from "../../assets/icons/star-unfill.png";

export default function Ratings(prop) {
  let rating;
  if (prop.rating) {
    rating = prop.rating;
  } else {
    rating = prop.product.rating;
  }
  let starStyle = {
    width: "14px",
    height: "14px",
    marginRight: "4px",
  };

  return (
    <div>
      <img
        src={
          rating > 0
            ? rating > 0.5
              ? StarFillIcon
              : StarHalfFillIcon
            : StarUnfillIcon
        }
        alt="ratings"
        style={starStyle}
      />
      <img
        src={
          rating > 1
            ? rating > 1.5
              ? StarFillIcon
              : StarHalfFillIcon
            : StarUnfillIcon
        }
        alt="ratings"
        style={starStyle}
      />
      <img
        src={
          rating > 2
            ? rating > 2.5
              ? StarFillIcon
              : StarHalfFillIcon
            : StarUnfillIcon
        }
        alt="ratings"
        style={starStyle}
      />
      <img
        src={
          rating > 3
            ? rating > 3.5
              ? StarFillIcon
              : StarHalfFillIcon
            : StarUnfillIcon
        }
        alt="ratings"
        style={starStyle}
      />
      <img
        src={
          rating > 4
            ? rating > 4.5
              ? StarFillIcon
              : StarHalfFillIcon
            : StarUnfillIcon
        }
        alt="ratings"
        style={{ ...starStyle, marginRight: "15px" }}
      />
      {prop.product ? `${prop.product.numReviews} Reviews` : null}
    </div>
  );
}
