import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../redux/action/apiUserAction";
import Meta from "../../components/Meta";
import Alert from "@mui/material/Alert";
import DisplayPending from "../../components/DisplayPending";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { pending, error, errorMessage, userInfo, updateSuccess } = user;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);

  function userUpdateHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // Dispatch Update User
      setMessage("");

      let tmpUser = {
        _id: userInfo._id,
        token: userInfo.token,
        name: name,
        email: email,
        password: password,
      };
      dispatch(updateUserInfo(tmpUser));
    }
  }

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, dispatch, userInfo, error, errorMessage]);

  return (
    <div className="profile_container">
      <Meta title="Profile" />
      <DisplayPending pending={pending} />
      <form
        className="signup_input_container"
        style={{ marginTop: "40px" }}
        onSubmit={userUpdateHandler}
      >
        {message ? (
          <Alert severity="error">{message}</Alert>
        ) : error ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : updateSuccess ? (
          <Alert severity="success">Update Success!</Alert>
        ) : null}
        <div className="signup_title">User Profile</div>
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

        <label className="signup_label" htmlFor="register_password">
          Password
        </label>
        <input
          id="register_password"
          placeholder="Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label className="signup_label" htmlFor="register_confirm_password">
          Confirm Password
        </label>
        <input
          id="register_confirm_password"
          placeholder="Confirm password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
