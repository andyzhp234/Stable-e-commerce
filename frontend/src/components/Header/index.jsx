import React from "react";
import NavPage from "./NavPage";
import NavOthers from "./NavOthers";

export default function Header() {
  return (
    <div className="header">
      <NavPage />
      <NavOthers />
    </div>
  );
}
