import React, { useState } from 'react';


// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
//bootstrap/dist/css/bootstrap.min.css
import './resource/lib/lightbox/css/lightbox.min.css'
//  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
import './resource/css/style.css';

// <!-- Template Stylesheet -->
import './resource/css/inq.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ButtonPage from './component/buttonPage';

import User from './pages/user';
import Admin from './pages/admin';
import Header from './component/user/LayoutCustomer/Header/header';
import Footer from './component/user/LayoutCustomer/Footer/footer';
import HomePage from './pages/User/homePage';
import DetailDevicePage from './pages/User/detailDevicePage';


import CartPage from './pages/user/cartPage';

import Register from "./pages/user/Account/registerPage";
import SearchPage from "./pages/user/searchPage";

import ProfileCustomer from "./pages/user/Profile/accountCustomerPage";
import AddressPage from "./pages/user/Profile/addressPage";
import ChangePassword from "./pages/user/Profile/changePasswordPage";
import OrdersPage from "./pages/user/Profile/ordersPage";
import { CartProvider } from './context/CartContext';

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
            </CartProvider>
            }
          >
            <Route path="cart" element={<CartPage />} />
            {/* <Route path="/profile" element={<ProfileCustomer />} >
              <Route path="address" element={<AddressPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="changePassword" element={<ChangePassword />} />
            </Route> */}
            <Route path="/search/*" element={<SearchPage />} />
          </Route>
      </Routes>
    </Router>
      
  );
}

export default App;
