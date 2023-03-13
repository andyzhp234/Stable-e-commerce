import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import AllProducts from "./pages/AllProducts";
import SuccessPayment from "./pages/SuccessPayment";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDetailProfile from "./pages/UserDetailProfile";
import UserOrder from "./pages/UserOrder";
import UserOrderDetail from "./pages/UserOrderDetail";
import AdminUserList from "./pages/AdminUserList";
import AdminProductList from "./pages/AdminProductList";
import AdminOrderList from "./pages/AdminOrderList";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminEditUser from "./pages/AdminEditUser";
import AdminEditOrder from "./pages/AdminEditOrder";
import Meta from "./components/Meta";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfServices from "./pages/TermsOfServices";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Meta />
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route path="/" element={<Home />} />
          <Route path="/newarrivals" element={<NewArrivals />} />
          <Route path="/shop" element={<AllProducts />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/successPayment" element={<SuccessPayment />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal" element={<TermsOfServices />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<UserDetailProfile />} />
            <Route path="/orders" element={<UserOrder />} />
            <Route path="/order/:id" element={<UserOrderDetail />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/admin/userlist" element={<AdminUserList />} />
            <Route path="/admin/editUser/:id" element={<AdminEditUser />} />
            <Route path="/admin/productlist/" element={<AdminProductList />} />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProduct />}
            />
            <Route
              path="/admin/createproduct/"
              element={<AdminCreateProduct />}
            />
            <Route path="/admin/orderlist/" element={<AdminOrderList />} />
            <Route
              path="/admin/orderdetails/:id"
              element={<AdminEditOrder />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
