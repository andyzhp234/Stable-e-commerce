import React from "react";
import CompanyInfo from "./components/CompanyInfo";
import BuyingInfo from "./components/BuyingInfo";

export default function Footer() {
  return (
    <div className="footer">
      <BuyingInfo />
      <CompanyInfo />
    </div>
  );
}
