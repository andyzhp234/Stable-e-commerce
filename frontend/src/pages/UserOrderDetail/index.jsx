import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../redux/action/apiOrder";
import { useParams } from "react-router-dom";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function OrderDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const orderDetail = useSelector((state) => state.order);
  const { order, pending, error, errorMessage } = orderDetail;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getOrderDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="order-detail">
      <Meta title="Order Detail" />
      <DisplayPending pending={pending} />
      {error ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : (
        <>
          <div className="order-detail__container">
            <div className="order-detail__title">Order {order?._id}</div>

            <div className="order-detail__section">
              <div className="order-detail__section__title">Order Items</div>
              {order?.orderItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="order-detail__section__order-items"
                  >
                    <img
                      className="review_img"
                      src={item.image}
                      alt="review_img"
                    />
                    <div>{item.name}</div>
                    <div style={{ marginLeft: "10px" }}>
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
              <div className="order-detail__section__title">
                Shipping Address
              </div>
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
              <div className="order-detail__section__title">
                Shipping Status
              </div>
              {order?.isDelivered ? (
                <div style={{ color: "green" }}>
                  Delivered at:{" "}
                  {new Date(order?.deliveredAt).toISOString().split("T")[0]}
                </div>
              ) : (
                <div style={{ color: "red" }}>On the Way</div>
              )}
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
        </>
      )}
    </div>
  );
}
