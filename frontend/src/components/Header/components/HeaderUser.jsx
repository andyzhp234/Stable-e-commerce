import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderModals from "./HeaderModals";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/action/apiUserAction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HeaderSearch from "./HeaderSearch";
import { MenuItemStyle } from "./HeaderUserStyle";

export default function HeaderUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  // React State
  const anchorEl = React.useRef(null);
  const [openAnchor, setOpenAnchor] = React.useState(false);

  const logoutHandler = (e) => {
    dispatch(logout());
  };

  return (
    <div className="header-userInfos">
      <HeaderSearch />
      <img
        className="icon-medium"
        src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/bag.png"
        alt="cart_icon"
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/cart");
        }}
      />
      {userInfo ? (
        userInfo.isAdmin ? (
          <div
            className="header-userInfos__name"
            ref={anchorEl}
            onClick={() => setOpenAnchor(!openAnchor)}
            sx={{
              marginTop: "10px",
            }}
          >
            {userInfo.name}
            <Menu
              anchorEl={anchorEl.current}
              open={openAnchor}
              onClose={() => setOpenAnchor(false)}
              style={{ marginTop: "10px" }}
            >
              <MenuItem
                onClick={() => navigate("/admin/userlist")}
                sx={MenuItemStyle}
              >
                Users
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/productlist")}
                sx={MenuItemStyle}
              >
                Products
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/orderlist")}
                sx={MenuItemStyle}
              >
                Orders
              </MenuItem>
              <MenuItem onClick={() => navigate("/profile")} sx={MenuItemStyle}>
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler} sx={MenuItemStyle}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div
            className="header-userInfos__name"
            ref={anchorEl}
            onClick={() => setOpenAnchor(!openAnchor)}
          >
            {userInfo.name}
            <Menu
              anchorEl={anchorEl.current}
              open={openAnchor}
              onClose={() => setOpenAnchor(false)}
              sx={{
                marginTop: "10px",
              }}
            >
              <MenuItem onClick={() => navigate("/profile")} sx={MenuItemStyle}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => navigate("/orders")} sx={MenuItemStyle}>
                Orders
              </MenuItem>
              <MenuItem onClick={logoutHandler} sx={MenuItemStyle}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )
      ) : (
        <img
          className="icon-medium"
          src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/account.png"
          alt="account_icon"
          onClick={() => navigate("/login")}
        />
      )}

      <HeaderModals />
    </div>
  );
}
