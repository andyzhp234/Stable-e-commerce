import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetAllUsers, adminDeleteUser } from "../../lib/axiosAPI";
import { logout } from "../../redux/action/apiUserAction";
import Paginate from "../../components/Paginate/index.jsx";
import { useSearchParams } from "react-router-dom";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";

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
    <div className="admin-list">
      <DisplayPending pending={pending} />
      <div className="admin-list__container">
        {error ? <Alert severity="error">{error}</Alert> : null}
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.users?.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <span className="color-green-500">Yes</span>
                    ) : (
                      <span className="color-red-500">No</span>
                    )}
                  </td>
                  <td>
                    <img
                      src={EditIcon}
                      alt="edit_icon"
                      onClick={() => navigate(`/admin/editUser/${user._id}`)}
                    />
                    <img
                      onClick={() => handleDelete(user._id)}
                      src={DeleteIcon}
                      alt="edit_icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginate page={users.page} pages={users.pages} />
      </div>
    </div>
  );
}
