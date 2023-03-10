import React from "react";
import HeaderLeftMenu from "./HeaderLeftMenu";
import HeaderRightMenu from "./HeaderRightMenu";

export default function Header() {
  return (
    <div className="header">
      <HeaderLeftMenu />
      <HeaderRightMenu />
    </div>
  );
}
