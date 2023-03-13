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
    <div className="auth">
      <Meta title="Sign Up" />
      <DisplayPending pending={pending} />
      <Alert severity="warning" style={{ width: "100%", marginBottom: "20px" }}>
        <strong>Pay attention:</strong> This is not a real e-commerce site. You
        don't need to insert your real credentials (email / password) here!
      </Alert>
      <form className="auth__container" onSubmit={registerHandler}>
        {message ? (
          <Alert severity="error">{message}</Alert>
        ) : error ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : null}
        <div className="auth__title">Create an account</div>

        <div className="auth__input__container">
          <label htmlFor="register_name">Name</label>
          <input
            id="register_name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="auth__input__container">
          <label htmlFor="register_email">Email Address</label>
          <input
            id="register_email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="register_password">Password</label>
          <input
            id="register_password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="register_confirm_password">Confirm Password</label>
          <input
            id="register_confirm_password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-button green-button" type="submit">
          Register
        </button>

        <h1 className="auth__navigation">
          Have an Account?{" "}
          <span onClick={() => navigate(`/login/${redirect}`)}>Sign in</span>
        </h1>
        <h1 className="auth__legal">
          By Signing into QuickChat you agree to our{" "}
          <span
            className="color-blue-600 cursor-pointer"
            onClick={() => navigate("/legal")}
          >
            Terms of Services
          </span>{" "}
          and{" "}
          <span
            className="color-blue-600 cursor-pointer"
            onClick={() => navigate("/privacy")}
          >
            Privacy Policy.
          </span>
        </h1>
      </form>
    </div>
  );
}
