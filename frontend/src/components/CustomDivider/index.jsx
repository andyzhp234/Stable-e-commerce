import React from "react";
import Divider from "@mui/material/Divider";

const dividerStyle = {
  flexGrow: 1,
  backgroundColor: "black",
};

export default function CustomDivider({ text }) {
  return (
    <div className="divider__container">
      <Divider style={dividerStyle} />
      <h1>{text}</h1>
      <Divider style={dividerStyle} />
    </div>
  );
}
