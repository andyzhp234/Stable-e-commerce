import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <ul className="footer">
      <li onClick={() => navigate("/legal")}>Terms of use</li>
      <li onClick={() => navigate("/privacy")}>Privacy</li>
      <li>Copyright © Stable 2023</li>
    </ul>
  );
}
