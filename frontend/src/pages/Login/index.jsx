import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/apiUserAction";
import { useSearchParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

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
    <div className="login_container">
      <Meta title="Login" />
      <DisplayPending pending={pending} />

      <form className="login_input_container" onSubmit={handleLogin}>
        {error ? <Alert severity="error">{errorMessage}</Alert> : null}
        <div className="login_input_container__title">Sign In to Stable</div>
        <input
          placeholder="Email Address"
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <button
          type="button"
          style={{
            backgroundColor: "#5B5B5B",
          }}
          onClick={demoUserHandler}
        >
          Demo User
        </button>
        <button
          type="button"
          style={{
            backgroundColor: "#7C7C7C",
          }}
          onClick={demoAdminHandler}
        >
          Demo Admin
        </button>

        <div className="no_account_divider">
          <Divider style={{ width: "25%", backgroundColor: "black" }} />
          <div>Don't have an Account?</div>
          <Divider style={{ width: "25%", backgroundColor: "black" }} />
        </div>
        <button
          id="create_account_button"
          onClick={(e) => navigate(`/register?redirect=${redirect}`)}
          type="button"
        >
          Create an Account
        </button>
      </form>
    </div>
  );
}
