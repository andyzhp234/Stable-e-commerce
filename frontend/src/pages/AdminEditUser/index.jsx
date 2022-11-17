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
    const body = {
      name: name,
      email: email,
      isAdmin: isAdmin,
    };
    adminUpdateUser(userInfo, params.id, body)
      .then(function (res) {
        setUpdateSuccess(true);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="profile_container">
      <DisplayPending pending={pending} />
      <form
        className="signup_input_container"
        style={{ marginTop: "40px" }}
        onSubmit={userUpdateHandler}
      >
        {updateSuccess ? (
          <Alert severity="success">Update Success</Alert>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : null}
        <div className="signup_title">Edit User</div>
        <label className="signup_label" htmlFor="register_name">
          Name
        </label>
        <input
          id="register_name"
          placeholder="Enter name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <label className="signup_label" htmlFor="register_email">
          Email Address
        </label>
        <input
          id="register_email"
          placeholder="Enter email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <div className="admin_edit_user__isadmin">
          <input
            id="admin_edit_user__isadmin-checkbox"
            type="checkbox"
            onChange={(e) => setIsAdmin(!isAdmin)}
            checked={isAdmin}
          />
          <label htmlFor="admin_edit_user__isadmin-checkbox">Is Admin</label>
        </div>

        <button type="submit">Update</button>
        <button
          style={{
            marginTop: "0",
            backgroundColor: "#E1E1E1",
            color: "black",
          }}
          type="button"
          onClick={() => navigate("/admin/userlist")}
        >
          Go Back
        </button>
      </form>
    </div>
  );
}
