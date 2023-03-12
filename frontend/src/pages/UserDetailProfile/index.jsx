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
    <div className="auth">
      <Meta title="Profile" />
      <DisplayPending pending={pending} />
      <form className="auth__container" onSubmit={userUpdateHandler}>
        {message ? (
          <Alert severity="error">{message}</Alert>
        ) : error ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : updateSuccess ? (
          <Alert severity="success">Update Success!</Alert>
        ) : null}

        <div className="auth__title">User Profile</div>

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
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_password">Password</label>
          <input
            id="update_password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_confirm_password">Confirm Password</label>
          <input
            id="update_confirm_password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className="auth-button green-button" type="submit">
          Update
        </button>

        <button
          className="auth-button"
          type="submit"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </form>
    </div>
  );
}
