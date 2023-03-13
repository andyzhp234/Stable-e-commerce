import React from "react";
import NavigationText from "./NavigationText";
import BrandIcon from "./BrandIcon";
import { useNavigate } from "react-router-dom";

export default function HeaderLeftMenu() {
  const navigate = useNavigate();

  function navigateHandler(url) {
    window.scrollTo(0, 0);
    navigate(url);
  }

  return (
    <div className="header__container">
      <BrandIcon onClick={() => navigateHandler("/")} />
      <NavigationText text={"Home"} url="/" />
      <NavigationText text={"New Arrivals"} url="/newarrivals" />
      <NavigationText text={"All Products"} url="/shop" />
    </div>
  );
}
