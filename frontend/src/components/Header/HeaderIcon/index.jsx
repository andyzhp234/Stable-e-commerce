import React from "react";

export default function HeaderIcon({ src, onClick }) {
  return (
    <img
      className="icon-medium cursor-pointer margin-inline-end-20"
      src={src}
      alt="icon"
      onClick={onClick}
    />
  );
}
