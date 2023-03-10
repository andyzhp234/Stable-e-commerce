import React from "react";
import NavPage from "./components/NavPage";
import NavOthers from "./components/NavOthers";

export default function Header() {
  return (
    <div className="header">
      <NavPage />
      <NavOthers />
    </div>
  );
}
