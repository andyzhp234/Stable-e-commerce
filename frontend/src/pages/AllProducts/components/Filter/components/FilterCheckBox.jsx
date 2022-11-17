import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function FilterCheckBox({ label, checked }) {
  return (
    <FormControlLabel
      sx={{ width: "100%", height: "100%" }}
      control={<Checkbox />}
      label={label}
      checked={checked}
    />
  );
}
