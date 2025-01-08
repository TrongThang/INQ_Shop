import React, { useState } from 'react';


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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ButtonPage from './component/buttonPage';

import User from './pages/user';
import Admin from './pages/admin';
import HomePage from './pages/user/homePage'
import DetailDevicePage from './pages/user/detailDevicePage';
import LoginPage from './pages/user/Account/loginPage';

import CartPage from './pages/user/cartPage';
import SearchPage from "./pages/user/searchPage";
import ProfileCustomer from "./pages/user/Profile/accountCustomerPage";

import OrdersPage from "./pages/user/Profile/ordersPage";
import { CartProvider } from './context/CartContext';
import { InfoWebsiteProvider } from './context/settingWebContext';




function App() {

  return (
    <InfoWebsiteProvider>
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
              </CartProvider>
              }
          >
              <Route path='home' element={<HomePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="login-in" element={<LoginPage />} />
              <Route path="profile" element={<ProfileCustomer />} />
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
    </InfoWebsiteProvider>
      

  );
}

export default App;
