import React from "react";
import BrandLogo from "../../../assets/brand-logo.png";
import NavigationText from "./NavigationText";

export default function HeaderLeftMenu() {
  return (
    <div className="header__container">
      <img className="brand-logo" src={BrandLogo} alt="brand-logo" />
      <NavigationText text={"Home"} url="/" />
      <NavigationText text={"New Arrivals"} url="/newarrivals" />
      <NavigationText text={"All Products"} url="/shop" />
    </div>
  );
}
