import React from "react";
import Modal from "@mui/material/Modal";

const modalBodyStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};

export default function ModalBody({ open, children }) {
  return (
    <Modal open={open} style={modalBodyStyle}>
      {children}
    </Modal>
  );
}
