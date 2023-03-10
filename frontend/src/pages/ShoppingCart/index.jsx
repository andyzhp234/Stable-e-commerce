import React from "react";
import Meta from "../../components/Meta";
import Alert from "@mui/material/Alert";
import Cart from "./Cart";
import Checkout from "./Checkout.jsx";
import { useSelector } from "react-redux";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <Meta title="Shopping Cart" />
      <Alert severity="info" style={{ width: "100%", marginBottom: "20px" }}>
        Checkout Info: Use card number 4242 4242 4242 4242, An Valid Furture
        Date, and Any three-digit CVC.
      </Alert>
      <div className="shoppingCart">
        <h1 className="shoppingCart__title">Shopping Cart</h1>
        <Cart cartItems={cartItems} />
        {cartItems.length > 0 && (
          <Checkout cartItems={cartItems} userInfo={userInfo} />
        )}
      </div>
    </>
  );
}
