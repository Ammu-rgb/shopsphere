import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar cart={cart} />

        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* User Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Authentication */}
          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          {/* Products */}
          <Route
            path="/products"
            element={
              <Products
                cart={cart}
                setCart={setCart}
              />
            }
          />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                cart={cart}
                setCart={setCart}
              />
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
              />
            }
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
              />
            }
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* User Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
  path="/orders"
  element={
    <ProtectedAdminRoute>
      <Orders />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedAdminRoute>
      <Admin />
    </ProtectedAdminRoute>
  }
/>

          
          <Route path="/my-orders" element={<MyOrders />} />

            <Route
  path="/order-success"
  element={<OrderSuccess />}
/>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-[80vh]">
                <h1 className="text-4xl font-bold text-red-500">
                  404 Page Not Found
                </h1>
              </div>
            }
          />
        
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;