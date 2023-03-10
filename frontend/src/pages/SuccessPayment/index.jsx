import React from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { clearCart } from "../../redux/action/apiCart";
import { useDispatch } from "react-redux";
import Meta from "../../components/Meta";

export default function SuccessPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init();
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="successPayment">
      <Meta title="Thank You For Your Payment!" />
      <div
        className="successPayment_container"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <img
          src="https://img.icons8.com/fluency/344/checked.png"
          alt="green_check"
        />
        <div className="successPayment_title">Order Placed, thanks!!</div>
        <div>An order confirmation will be sent to your email</div>

        <div
          className="successPayment_continue_shopping"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </div>
      </div>
    </div>
  );
}
