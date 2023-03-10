import React from "react";
import Ratings from "../Ratings";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductsPrimary(props) {
  const navigate = useNavigate();
  let product = props.product;

  return (
    <div
      className="productCard_primary"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <LazyLoadImage
        width={"100%"}
        height={"75%"}
        alt={"product_image"}
        effect="blur"
        src={product.images[0]}
        placeholderSrc={product.images[0]}
      />
      <div>{product.name}</div>
      <div>
        <Ratings product={product} />
      </div>
      <div style={{ fontSize: "22px" }}>$ {product.price / 100}</div>
    </div>
  );
}
