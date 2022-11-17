import React from "react";
import ProductsPrimary from "../../../../components/ProductsPrimary";

export default function Listing({ products }) {
  return (
    <div className="allproducts__products">
      <div className="allproducts__products__grid">
        {products?.map((product) => {
          return <ProductsPrimary key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}
