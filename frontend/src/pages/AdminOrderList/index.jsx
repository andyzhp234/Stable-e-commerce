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
    <div className="admin-list">
      <DisplayPending pending={pending} />
      <div className="admin-list__container">
        <table>
          <thead>
            <tr>
              <th scope="col">OrderID</th>
              <th scope="col">UserID</th>
              <th scope="col">Date</th>
              <th scope="col">Total</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.orders?.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td>
                    {new Date(order.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td>$ {order.totalPrice / 100}</td>
                  <td
                    className="color-blue-600 cursor-pointer"
                    onClick={() => navigate(`/admin/orderdetails/${order._id}`)}
                  >
                    Detail
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginate page={orders.page} pages={orders.pages} />
      </div>
    </div>
  );
}
