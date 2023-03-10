import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IconAccount from "../../../../assets/account.png";
import { logout } from "../../../../redux/action/apiUserAction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MenuItemStyle = {
  fontFamily: "'Source Sans Pro', sans-serif",
  color: "black",
  width: "150px",
  display: "flex",
  justifyContent: "center",
};

export default function AccountIcon() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  // React State
  const anchorEl = React.useRef(null);
  const [openAnchor, setOpenAnchor] = React.useState(false);
  const logoutHandler = (e) => {
    dispatch(logout());
  };

  if (userInfo) {
    if (userInfo.isAdmin) {
      return (
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
      );
    } else {
      return (
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
      );
    }
  } else {
    return (
      <img
        className="icon-medium cursor-pointer"
        src={IconAccount}
        alt="account_icon"
        onClick={() => navigate("/login")}
      />
    );
  }
}
