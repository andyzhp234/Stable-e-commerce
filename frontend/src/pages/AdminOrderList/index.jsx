import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetOrders } from "../../lib/axiosAPI";
import { logout } from "../../redux/action/apiUserAction";
import Paginate from "../../components/Paginate/index.jsx";
import { useSearchParams } from "react-router-dom";
import DisplayPending from "../../components/DisplayPending";

export default function AdminOrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currPageQuery = searchParams.get("currPage");
  let { userInfo } = useSelector((state) => state.user);
  let [orders, setOrders] = React.useState([]);
  let [pending, setPending] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    adminGetOrders(userInfo, currPageQuery)
      .then(function (res) {
        setOrders(res.data);
        setPending(false);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          console.log(error.message);
        }
      });
  }, [userInfo, dispatch, currPageQuery]);

  return (
    <div className="admin__userlist">
      <DisplayPending pending={pending} />
      <div className="admin_userlist__container">
        <div className="admin__userlist__title">Orders</div>
        <div className="admin__userlist__list">
          <div className="admin__userlist__list__title">
            <div>OrderID</div>
            <div>UserID</div>
            <div>Date</div>
            <div>Total</div>
            <div>Delivered</div>
            <div></div>
          </div>

          {orders.orders?.map((order) => {
            return (
              <div key={order._id} className="admin__userlist__list__user">
                <div>{order._id}</div>
                <div>{order.user}</div>
                <div>
                  {new Date(order.createdAt).toISOString().split("T")[0]}
                </div>
                <div>$ {order.totalPrice / 100}</div>
                <div>{order.isDelivered ? <div>Yes</div> : <div>No</div>}</div>
                <div
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => navigate(`/admin/orderdetails/${order._id}`)}
                >
                  Details
                </div>
              </div>
            );
          })}
        </div>
        <Paginate page={orders.page} pages={orders.pages} />
      </div>
    </div>
  );
}
