import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationText({ text, url }) {
  const navigate = useNavigate();

  function navigateHandler() {
    window.scrollTo(0, 0);
    navigate(url);
  }

  return (
    <div
      className="navigation margin-inline-start-20"
      onClick={navigateHandler}
    >
      <h1>{text}</h1>
    </div>
  );
}
