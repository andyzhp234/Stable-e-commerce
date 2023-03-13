import React from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/action/apiCart";
import { useDispatch } from "react-redux";
import Meta from "../../components/Meta";

export default function SuccessPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="successPayment">
      <Meta title="Thank You For Your Payment!" />
      <div className="successPayment__container">
        <img
          src="https://img.icons8.com/fluency/344/checked.png"
          alt="green_check"
        />
        <h1 className="successPayment__title">Order Placed, thanks!!</h1>
        <h2 className="successPayment__description">
          An order confirmation will be sent to your email
        </h2>

        <div className="successPayment__redirect" onClick={() => navigate("/")}>
          Continue Shopping
        </div>
      </div>
    </div>
  );
}
