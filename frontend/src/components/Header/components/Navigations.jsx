import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigations() {
  const navigate = useNavigate();
  return (
    <>
      <img
        src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/brand-logo-1.PNG"
        onClick={() => navigate("/")}
        className="brand-logo"
        alt="brand_logo"
      />
      <div className="header-nav">
        <div
          onClick={() => navigate("/")}
          className={
            window.location.pathname === "/"
              ? "header-nav__items header-nav__items--active"
              : "header-nav__items"
          }
        >
          - Home
        </div>
        <div
          onClick={() => navigate("/newarrivals")}
          className={
            window.location.pathname === "/newarrivals"
              ? "header-nav__items header-nav__items--active"
              : "header-nav__items"
          }
        >
          - New Arrivals
        </div>
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/shop");
          }}
          className={
            window.location.pathname === "/shop"
              ? "header-nav__items header-nav__items--active"
              : "header-nav__items"
          }
        >
          - All Products
        </div>
      </div>
    </>
  );
}
