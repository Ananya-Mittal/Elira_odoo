import "./App.css";
import HomePage from "./components/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetail from "./components/itemDetail/ItemDetail";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import SellerLogin from "./components/auth/SellerLogin";
import SellerSignup from "./components/auth/SellerSignup";
import SellerDashboard from "./components/seller/SellerDashboard";
import Chatbot from "./components/chatbot/chatbot";
import DigitalLearning from "./components/DigitalLearning/DigitalLearning";
import Wishlist from "./components/Wishlist/Wishlist"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
        </div>

        <Routes>
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/DigitalLearning" element={<DigitalLearning />} />
          <Route path="/Wishlist" element={<Wishlist />} />

          {/* Seller Routes */}
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/signup" element={<SellerSignup />} />
           <Route path="/seller/SellerDashboard" element={<SellerDashboard />} />

          {/* Home */}
          <Route path="/" element={<HomePage />} />
        </Routes>

        {/* Global Chatbot (visible on all pages) */}
        <Chatbot />
      </BrowserRouter>
    </div>
  );
}

export default App;





