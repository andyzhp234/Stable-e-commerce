import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import PrivateRoutes from "./utils/PrivateRoutes";
import './css/app.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import AllItem from "./pages/AllItem";
import ProductPage from './pages/ProductPage';
import FAQ from "./pages/FAQ";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import OrderPage from "./pages/OrderPage";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>          
          <Route path="/" element={<Landing />} />
          <Route path="/shop" element={<AllItem />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </Route>

{/* 
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} /> */}

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
