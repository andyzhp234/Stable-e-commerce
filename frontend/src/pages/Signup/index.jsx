import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { register } from "../../redux/action/apiUserAction";
import { resetUserState } from "../../redux/slices/userSlice";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function SignupPage() {
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.user);
  const { pending, error, errorMessage, userInfo } = userRegister;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);

  // get query param
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "";

  React.useEffect(() => {
    dispatch(resetUserState());
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect, dispatch]);

  function registerHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  }

  return (
    <div className="signup_container">
      <Meta title="Sign Up" />
      <DisplayPending pending={pending} />
      <Alert severity="warning" style={{ width: "100%", marginBottom: "20px" }}>
        <strong>Pay attention:</strong> This is not a real e-commerce site. You
        don't need to insert your real credentials (email / password) here!
      </Alert>
      <form className="signup_input_container" onSubmit={registerHandler}>
        {message ? (
          <Alert severity="error">{message}</Alert>
        ) : error ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : null}
        <div className="signup_title">Sign Up</div>
        <label className="signup_label" htmlFor="register_name">
          Name
        </label>
        <input
          id="register_name"
          placeholder="Enter name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="signup_label" htmlFor="register_email">
          Email Address
        </label>
        <input
          id="register_email"
          placeholder="Enter email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
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
          required
        />

        <label className="signup_label" htmlFor="register_confirm_password">
          Confirm Password
        </label>
        <input
          id="register_confirm_password"
          placeholder="Confirm password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <div className="register_back_to_login">
          Have an Account?
          <div onClick={() => navigate(`/login/${redirect}`)}>Sign in</div>
        </div>
      </form>
    </div>
  );
}
