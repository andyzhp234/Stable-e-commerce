import React from "react";
import ProductsPrimary from "../../components/ProductsPrimary";

export default function HomeFeatured({ recommend }) {
  return (
    <div className="home__featured">
      <h1 className="home__about__title">FEATURED PRODUCTS</h1>
      <div className="home__featured__container">
        {recommend.map((item) => (
          <ProductsPrimary key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}
