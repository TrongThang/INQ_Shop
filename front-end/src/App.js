import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
import './resource/lib/lightbox/css/lightbox.min.css'
//  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './resource/css/style.css';

// <!-- Template Stylesheet -->
import './resource/css/inq.css'


import ButtonPage from './component/buttonPage';

import User from './pages/user';
import Admin from './pages/admin';
import HomePage from './pages/user/homePage'
import DetailDevicePage from './pages/user/detailDevicePage';

import CartPage from './pages/user/cartPage';
import SearchPage from "./pages/user/searchPage";

import ProfileCustomer from "./pages/user/Profile/accountCustomerPage";
import AddressPage from "./pages/user/Profile/addressPage";
import OrdersPage from "./pages/user/Profile/ordersPage";

import ChangePassword from "./pages/user/Profile/changePasswordPage";
import AccountCustomerPage from './pages/user/Profile/accountCustomerPage';
import ChangePasswordPage from './pages/user/Profile/changePasswordPage';
import Login from "./pages/user/Account/loginPage";
import Register from "./pages/user/Account/registerPage";




function App() {

  const [page, setPage] = useState('user');

  return (
    <Router>
      <Routes>
        {/* ADMIN */}
        <Route path="/admin" element={<Admin />}>
        </Route>

        {/* USER */}
        <Route path="/"
          element={
            <CartProvider>
              <User />
              <Login />
              <Register />
            </CartProvider>
            }
          >
            <Route path='' element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            
            <Route path="/profile/address" element={<AddressPage />} />
            
            {/* <Route path="/profile" element={<ProfileCustomer />} >
              <Route path="address" element={<AddressPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="changePassword" element={<ChangePassword />} />
            </Route> */}
              <Route path="/profile/orders" element={<OrdersPage />} />
          <Route path="/search/*" element={<SearchPage />} />
            <Route path="/device/:slug" element={<DetailDevicePage />} />
          </Route>
      </Routes>
    </Router>

  );
}

export default App;
