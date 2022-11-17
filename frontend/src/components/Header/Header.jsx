import React from "react";
import Navigations from "./components/Navigations";
import HeaderUser from "./components/HeaderUser";

export default function Header() {
  return (
    <div className="header">
      <Navigations />
      <HeaderUser />
    </div>
  );
}
