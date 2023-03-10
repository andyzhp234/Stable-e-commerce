import React from "react";
import { useNavigate } from "react-router-dom";
import IconShoppingCart from "../../../assets/shopping-cart.png";
import IconSearch from "../../../assets/search.png";
import SearchModal from "../../Modal/SearchModal";
import AccountIcon from "../AccountIcon";
import HeaderIcon from "../HeaderIcon";

export default function HeaderRightMenu() {
  const navigate = useNavigate();
  const [openSearchModal, setOpenSearchModal] = React.useState(false);

  function navigateHandler(e) {
    window.scrollTo(0, 0);
    navigate("/cart");
  }

  function openSearchHandler(e) {
    setOpenSearchModal((prev) => !prev);
  }

  return (
    <div className="header__container">
      <HeaderIcon src={IconSearch} onClick={openSearchHandler} />
      <HeaderIcon src={IconShoppingCart} onClick={navigateHandler} />
      <AccountIcon />
      <SearchModal
        openModal={openSearchModal}
        setOpenModal={setOpenSearchModal}
      />
    </div>
  );
}
