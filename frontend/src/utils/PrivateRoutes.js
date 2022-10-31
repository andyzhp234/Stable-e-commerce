import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  let {pathname} = useLocation()
  let user = useSelector((state) => state.user);

  return(
    user.userInfo? <Outlet /> : <Navigate to={`/login?redirect=${pathname.split('/')[1]}`} />
  )
}

export default PrivateRoutes