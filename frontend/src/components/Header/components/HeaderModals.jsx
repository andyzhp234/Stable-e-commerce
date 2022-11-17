import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AOS from "aos";

export default function HeaderModals() {
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init();
  }, []);

  const [openModal, setOpenModal] = React.useState(false);

  let modalStyle = {
    width: "100%",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "20px",
    fontWeight: "600",
    backgroundColor: "#CAE9E0",
    borderBottom: "1px solid",
    cursor: "pointer",
  };

  return (
    <>
      <img
        className="icon-medium header-userInfos__modal"
        src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/menu.png"
        alt="menu_icon"
        onClick={() => setOpenModal(true)}
      />
      <Modal
        open={openModal}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        onClose={() => setOpenModal(false)}
        aria-labelledby="header-modal"
        aria-describedby="header-modal"
      >
        <>
          <div
            style={modalStyle}
            data-aos="fade-down"
            data-aos-duration="700"
            onClick={() => setOpenModal(false)}
          >
            <img
              style={{
                width: "30px",
                height: "30px",
              }}
              src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/close.png"
              alt="close_modal"
            />
          </div>
          <div
            style={modalStyle}
            data-aos="fade-down"
            data-aos-duration="800"
            onClick={() => {
              setOpenModal(false);
              navigate("/");
            }}
          >
            Home
          </div>
          <div
            style={modalStyle}
            data-aos="fade-down"
            data-aos-duration="900"
            onClick={() => {
              setOpenModal(false);
              navigate("/newarrivals");
            }}
          >
            New Products
          </div>
          <div
            style={modalStyle}
            data-aos="fade-down"
            data-aos-duration="1000"
            onClick={() => {
              setOpenModal(false);
              navigate("/shop");
            }}
          >
            All Products
          </div>
        </>
      </Modal>
    </>
  );
}
