import React from "react";

export default function HeaderIcon({ src, onClick }) {
  return <img className="header-icon" src={src} alt="icon" onClick={onClick} />;
}
