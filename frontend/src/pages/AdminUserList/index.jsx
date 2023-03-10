import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetAllUsers, adminDeleteUser } from "../../lib/axiosAPI";
import { logout } from "../../redux/action/apiUserAction";
import Paginate from "../../components/Paginate/index.jsx";
import { useSearchParams } from "react-router-dom";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function AdminUserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { userInfo } = useSelector((state) => state.user);
  let [users, setUsers] = React.useState([]);
  let [pending, setPending] = React.useState(true);
  let [error, setError] = React.useState();
  const [searchParams] = useSearchParams();
  const currPageQuery = searchParams.get("currPage");

  const getAllUsers = useCallback(() => {
    adminGetAllUsers(userInfo, currPageQuery)
      .then(function (res) {
        setUsers(res.data);
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
  }, [dispatch, userInfo, currPageQuery]);

  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const deleteUser = async (userID) => {
    window.scrollTo(0, 0);
    setPending(true);
    adminDeleteUser(userInfo, userID)
      .then(function (res) {
        setPending(false);
        getAllUsers();
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const handleDelete = (userID) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userID);
    }
  };

  return (
    <div className="admin__userlist">
      <DisplayPending pending={pending} />
      <div className="admin_userlist__container">
        {error ? <Alert severity="error">{error}</Alert> : null}
        <div className="admin__userlist__title">Users</div>
        <div className="admin__userlist__list">
          <div className="admin__userlist__list__title">
            <div>ID</div>
            <div>Name</div>
            <div>Email</div>
            <div>Admin</div>
            <div>Edit/Delete</div>
          </div>

          {users.users?.map((user) => {
            return (
              <div key={user._id} className="admin__userlist__list__user">
                <div>{user._id}</div>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>
                  {user.isAdmin ? (
                    <span style={{ color: "green" }}>Yes</span>
                  ) : (
                    <span style={{ color: "red" }}>No</span>
                  )}
                </div>
                <div>
                  <img
                    src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/edit.png"
                    alt="edit_icon"
                    onClick={() => navigate(`/admin/editUser/${user._id}`)}
                  />
                  <img
                    onClick={() => handleDelete(user._id)}
                    src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/delete.png"
                    alt="edit_icon"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Paginate page={users.page} pages={users.pages} />
      </div>
    </div>
  );
}
