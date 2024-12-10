import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { logout } from "../../redux/action/apiUserAction";
import { adminGetOrder, adminUpdateOrder } from "../../lib/axiosAPI";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function AdminEditOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [pending, setPending] = React.useState(true);
  const [error, setError] = React.useState();
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  let { userInfo } = useSelector((state) => state.user);
  let [order, setOrder] = React.useState();

  const updateOrder = (isDelivered) => {
    setPending(true);
    adminUpdateOrder(userInfo, isDelivered, params.id)
      .then(function (res) {
        getOrder();
        setUpdateSuccess(true);
        setPending(false);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
          setUpdateSuccess(false);
        }
      });
  };

  const getOrder = useCallback(() => {
    setPending(true);
    adminGetOrder(userInfo, params.id)
      .then(function (res) {
        setOrder(res.data);
        setPending(false);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  }, [dispatch, params.id, userInfo]);

  const deliveredHandler = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    updateOrder(true);
  };

  const notDeliveredHandler = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    updateOrder(false);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      getOrder();
    }
  }, [dispatch, userInfo, params.id, getOrder]);

  return (
    <div className="order-detail">
      <DisplayPending pending={pending} />
      <div className="order-detail__container">
        <div
          className="black-rounded-button"
          style={{ margin: "0", marginTop: "20px" }}
          onClick={() => navigate("/admin/orderlist")}
        >
          Go Back
        </div>
        <div className="order-detail__title">Order {order?._id}</div>

        <div className="order-detail__section">
          {updateSuccess ? (
            <Alert severity="success">Update Succeed</Alert>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : null}
          <div className="order-detail__section__title">Order Items</div>
          {order?.orderItems?.map((item) => {
            return (
              <div
                key={item._id}
                className="order-detail__section__order-items"
              >
                <img className="review_img" src={item.image} alt="review_img" />
                <div>{item.name}</div>
                <div>
                  {item.qty} x ${item.price} = $
                  {(item.qty * item.price).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-detail__section">
          <div className="order-detail__section__title">Order Summary</div>
          <div>Subtotal: ${order?.subTotalPrice / 100}</div>
          <div>Shipping: ${order?.shippingPrice / 100}</div>
          <div>Tax: ${order?.taxPrice / 100}</div>
          <div>Total: ${order?.totalPrice / 100}</div>
        </div>

        <div className="order-detail__section">
          <div className="order-detail__section__title">Shipping Address</div>
          <div className="order-detail__section__infos">
            <div>{order?.shippingAddress.line1}</div>
            <div>
              {order?.shippingAddress.line2
                ? `${order.shippingAddress.line2}, `
                : ""}
            </div>
            <div>{order?.shippingAddress.city}</div>
            <div>{order?.shippingAddress.postalCode}</div>
            <div>{order?.shippingAddress.country}</div>
          </div>
        </div>

        <div className="order-detail__section">
          <div className="order-detail__section__title">Shipping Status</div>
          {order?.isDelivered ? (
            <div style={{ color: "green" }}>
              Delivered at:{" "}
              {new Date(order?.deliveredAt).toISOString().split("T")[0]}
            </div>
          ) : (
            <div style={{ color: "red" }}>On the Way</div>
          )}
          <div className="mark-delivery-button" onClick={deliveredHandler}>
            Mark As Delivered
          </div>
          <div
            className="mark-delivery-button red-button"
            onClick={notDeliveredHandler}
          >
            Mark As Not Delivered
          </div>
        </div>

        <div className="order-detail__section">
          <div className="order-detail__section__title">Payment Method</div>
          <div>Method: {order?.paymentMethod}</div>
          {order?.isPaid ? (
            <div>{new Date(order.paidAt).toISOString().slice(0, 10)}</div>
          ) : (
            <div style={{ color: "red" }}>Not Paid</div>
          )}
        </div>
      </div>
    </div>
  );
}
