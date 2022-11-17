import React from "react";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

export default function HeaderSearch() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [searchProduct, setSearch] = React.useState("");

  let modalStyle = {
    width: "100%",
    height: "80px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "50px",
    justifyContent: "flex-start",
    paddingRight: "20px",
    fontWeight: "600",
    backgroundColor: "white",
    borderBottom: "1px solid gainsboro",
    cursor: "pointer",
  };
  let popularSearchStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#F0F0F0",
    paddingTop: "40px",
    paddingLeft: "70px",
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate(`/shop?search=${searchProduct}`);
  };
  return (
    <div>
      <img
        className="icon-medium"
        src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/search.png"
        alt="search_icon"
        onClick={() => setOpenModal(true)}
      />
      <Modal
        open={openModal}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <>
          <form
            style={modalStyle}
            onSubmit={handleSearch}
            data-aos="fade-down"
            data-aos-duration="700"
          >
            <input
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              style={{
                width: "30px",
                height: "30px",
              }}
              src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/close.png"
              alt="close_modal"
              onClick={() => setOpenModal(false)}
            />
          </form>
          <div
            style={popularSearchStyle}
            onSubmit={handleSearch}
            data-aos="fade-down"
            data-aos-duration="700"
          >
            <div>Popular Search</div>
            <div className="popular-search">
              <div
                className="popular-search-items"
                onClick={() => {
                  setOpenModal(false);
                  navigate("/shop?search=chair");
                }}
              >
                chair
              </div>
              <div
                className="popular-search-items"
                onClick={() => {
                  setOpenModal(false);
                  navigate("/shop?search=table");
                }}
              >
                table
              </div>
              <div
                className="popular-search-items"
                onClick={() => {
                  setOpenModal(false);
                  navigate("/shop?search=bench");
                }}
              >
                bench
              </div>
              <div
                className="popular-search-items"
                onClick={() => {
                  setOpenModal(false);
                  navigate("/shop?search=coffee%20table");
                }}
              >
                coffee table
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}
