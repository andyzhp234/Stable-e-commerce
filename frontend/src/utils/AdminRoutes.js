import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  let user = useSelector((state) => state.user);

  return user.userInfo && user.userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={`/`} />
  );
};

export default AdminRoutes;
