import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import IconAccount from "../../../assets/account.png";
import HeaderAdmin from "./HeaderAdmin";
import HeaderUser from "./HeaderUser";
import HeaderIcon from "../HeaderIcon";

export default function AccountIcon() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  // React State
  const anchorEl = React.useRef(null);
  const [openAnchor, setOpenAnchor] = React.useState(false);

  if (userInfo) {
    if (userInfo.isAdmin) {
      return (
        <HeaderAdmin
          userInfo={userInfo}
          anchorEl={anchorEl}
          openAnchor={openAnchor}
          setOpenAnchor={setOpenAnchor}
        />
      );
    } else {
      return (
        <HeaderUser
          userInfo={userInfo}
          anchorEl={anchorEl}
          openAnchor={openAnchor}
          setOpenAnchor={setOpenAnchor}
        />
      );
    }
  } else {
    return (
      <HeaderIcon
        src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/account-1.png"
        onClick={() => navigate("/login")}
      />
    );
  }
}
