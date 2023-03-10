import React from "react";
import BrandLogo from "../../../assets/brand-logo.png";
import NavigationText from "./NavigationText";
import { useNavigate } from "react-router-dom";

export default function HeaderLeftMenu() {
  const navigate = useNavigate();

  function navigateHandler(url) {
    window.scrollTo(0, 0);
    navigate(url);
  }

  return (
    <div className="header__container">
      <img
        className="brand-logo"
        src={BrandLogo}
        alt="brand-logo"
        onClick={() => navigateHandler("/")}
      />
      <NavigationText text={"Home"} url="/" />
      <NavigationText text={"New Arrivals"} url="/newarrivals" />
      <NavigationText text={"All Products"} url="/shop" />
    </div>
  );
}
