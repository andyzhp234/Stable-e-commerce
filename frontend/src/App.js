import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
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
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
