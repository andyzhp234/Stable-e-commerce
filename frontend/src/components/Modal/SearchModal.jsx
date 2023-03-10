import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBody from "./ModalBody";

export default function SearchModal({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const [searchProduct, setSearch] = React.useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate(`/shop?search=${searchProduct}`);
  };

  const handleRedirect = (url) => {
    setOpenModal(false);
    navigate(url);
  };

  return (
    <div>
      <ModalBody open={openModal}>
        <>
          <form className="search-modal__header" onSubmit={handleSearchInput}>
            <input onChange={(e) => setSearch(e.target.value)} />
            <img
              className="icon-medium margin-inline-end-36"
              src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/close.png"
              alt="close_modal"
              onClick={() => setOpenModal(false)}
            />
          </form>
          <div className="search-modal__body">
            <h1>Popular Search</h1>
            <div className="search-modal__popular-search">
              <div onClick={() => handleRedirect("/shop?search=chair")}>
                chair
              </div>
              <div onClick={() => handleRedirect("/shop?search=table")}>
                table
              </div>
              <div onClick={() => handleRedirect("/shop?search=bench")}>
                bench
              </div>
              <div
                onClick={() => handleRedirect("/shop?search=coffee%20table")}
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
