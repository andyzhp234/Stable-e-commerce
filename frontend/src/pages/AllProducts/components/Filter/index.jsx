import React from "react";
import Availability from "./components/Availability";
import Category from "./components/Category";
import Brand from "./components/Brand";
import Price from "./components/Price";

export default function Filter() {
  return (
    <div className="allproducts__leftPanelFilter">
      <div className="allproducts__leftPanelFilter__title">Filters</div>
      <Availability />
      <Category />
      <Brand />
      <Price />
    </div>
  );
}
