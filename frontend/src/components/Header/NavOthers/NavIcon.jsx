import React from "react";

export default function NavIcon({ imgSrc, onClick }) {
  return (
    <img
      className="icon-large cursor-pointer"
      src={imgSrc}
      alt="icon"
      onClick={onClick}
    />
  );
}
