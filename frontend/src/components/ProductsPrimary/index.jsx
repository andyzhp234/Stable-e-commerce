import React from "react";
import Ratings from "../Ratings";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductsPrimary({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="productCard_primary"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <LazyLoadImage
        width="100%"
        height="75%"
        alt="product_image"
        effect="blur"
        src={product.images[0]}
        placeholderSrc={product.images[0]}
      />
      <h1>{product.name}</h1>
      <Ratings product={product} />
      <h2>$ {product.price / 100}</h2>
      {product.isNewArrival && (
        <div className="productCard__isNewTag">New!</div>
      )}
    </div>
  );
}
