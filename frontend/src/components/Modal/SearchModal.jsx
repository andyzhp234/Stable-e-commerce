import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBody from "./ModalBody";

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

export default function SearchModal({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const [searchProduct, setSearch] = React.useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate(`/shop?search=${searchProduct}`);
  };

  const handleSearchRedirect = (url) => {
    setOpenModal(false);
    navigate(url);
  };

  return (
    <div>
      <ModalBody open={openModal}>
        <>
          <form style={modalStyle} onSubmit={handleSearchInput}>
            <input
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              className="icon-medium"
              src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/close.png"
              alt="close_modal"
              onClick={() => setOpenModal(false)}
            />
          </form>
          <div style={popularSearchStyle}>
            <h1>Popular Search</h1>
            <div className="popular-search">
              <div
                className="popular-search-items"
                onClick={() => handleSearchRedirect("/shop?search=chair")}
              >
                chair
              </div>
              <div
                className="popular-search-items"
                onClick={() => handleSearchRedirect("/shop?search=table")}
              >
                table
              </div>
              <div
                className="popular-search-items"
                onClick={() => handleSearchRedirect("/shop?search=bench")}
              >
                bench
              </div>
              <div
                className="popular-search-items"
                onClick={() =>
                  handleSearchRedirect("/shop?search=coffee%20table")
                }
              >
                coffee table
              </div>
            </div>
          </div>
        </>
      </ModalBody>
    </div>
  );
}
