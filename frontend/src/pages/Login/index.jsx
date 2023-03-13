import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/apiUserAction";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import CustomDivider from "../../components/CustomDivider";

export default function LoginPage() {
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { pending, error, errorMessage, userInfo } = userLogin;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // get query param
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "";

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login(email, password));
  }

  function demoUserHandler(e) {
    e.preventDefault();
    dispatch(login("john@example.com", "123456"));
  }
  function demoAdminHandler(e) {
    e.preventDefault();
    dispatch(login("admin@example.com", "123456"));
  }

  return (
    <div className="auth">
      <Meta title="Login" />
      <DisplayPending pending={pending} />
      <Alert severity="warning" style={{ width: "100%", marginBottom: "20px" }}>
        <strong>Pay attention:</strong> This is not a real e-commerce site. You
        don't need to insert your real credentials (email / password) here!
      </Alert>
      <form className="auth__container" onSubmit={handleLogin}>
        {error ? <Alert severity="error">{errorMessage}</Alert> : null}
        <div className="auth__title">Welcome back!</div>
        <div className="auth__input__container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth__input__container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="auth-button " type="submit">
          Log In
        </button>
        <CustomDivider text={"OR"} />
        <button
          className="auth-button white-button"
          type="button"
          onClick={demoUserHandler}
        >
          Continue with demo user
        </button>
        <button
          className="auth-button white-button"
          type="button"
          onClick={demoAdminHandler}
        >
          Continue with demo admin
        </button>
        <h1 className="auth__navigation">
          Need an account?{" "}
          <span onClick={(e) => navigate(`/register?redirect=${redirect}`)}>
            Register
          </span>
        </h1>
        <h1 className="auth__legal">
          By Logging into QuickChat you agree to our{" "}
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
