import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../redux/action/apiUserAction";
import { adminGetUser, adminUpdateUser } from "../../lib/axiosAPI";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function AdminEditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  let { userInfo } = useSelector((state) => state.user);

  let [updateSuccess, setUpdateSuccess] = React.useState(false);
  let [error, setError] = React.useState();

  let [name, setName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [isAdmin, setIsAdmin] = React.useState(false);
  let [pending, setPending] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setPending(true);
    adminGetUser(userInfo, params.id)
      .then(function (res) {
        setName(res.data.name);
        setEmail(res.data.email);
        setIsAdmin(res.data.isAdmin);
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
  }, [dispatch, userInfo, params.id]);

  const userUpdateHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    const body = { name, email, isAdmin };
    adminUpdateUser(userInfo, params.id, body)
      .then(function (res) {
        setUpdateSuccess(true);
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
  };

  return (
    <div className="auth">
      <DisplayPending pending={pending} />
      <form className="auth__container" onSubmit={userUpdateHandler}>
        {updateSuccess ? (
          <Alert severity="success">Update Success</Alert>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : null}
        <div className="auth__title">Edit User</div>
        <div className="auth__input__container">
          <label htmlFor="update_name">Name</label>
          <input
            id="update_name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_email">Email Address</label>
          <input
            id="update_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth__checkbox">
          <input
            id="auth__updateAdmin"
            type="checkbox"
            value={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            checked={isAdmin}
          />
          <label htmlFor="auth__updateAdmin">
            Assign admin role to this user
          </label>
        </div>

        <button className="auth-button green-button" type="submit">
          Update
        </button>
        <button
          className="auth-button"
          type="submit"
          onClick={() => navigate("/admin/userlist")}
        >
          Go Back
        </button>
      </form>
    </div>
  );
}
