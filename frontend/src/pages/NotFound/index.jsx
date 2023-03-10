import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not_found_container">
      <div className="not_found_container__title">404</div>
      <div className="not_found_container__description">
        Sorry, Page not Found
      </div>
      <div className="black-rounded-button" onClick={() => navigate("/")}>
        Back to Home
      </div>
    </div>
  );
}
