import React, { useState } from 'react';


import './resource/css/style.css';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
//bootstrap/dist/css/bootstrap.min.css
import './resource/lib/lightbox/css/lightbox.min.css'
import './resource/lib/owlcarousel/assets/owl.carousel.min.css'
//  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
// <!-- Template Stylesheet -->
import './resource/css/inq.css'

import Header from './component/user/LayoutCustomer/Header/header';
import Footer from './component/user/LayoutCustomer/Footer/footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonPage from './component/buttonPage';

import LoginAdmin from './component/admin/Login/login';
import Contact from './pages/user/contact';
import ManaCustomer from './pages/admin/manaCustomer';
import ManaEmployee from './pages/admin/manaEmployee';
import ManaProduct from './pages/admin/manaProduct';
import ManaOrders from './pages/admin/manaOrders';
import ManageBlogPage from './pages/admin/manageBlogPage';

import SearchPage from './pages/user/searchPage';
import CheckoutPage from './pages/user/checkoutPage';
import DetailDevicePage from './pages/user/detailDevicePage';
import CartPage from './pages/user/cartPage';

import AddressList from './pages/user/addressPage';
import Account from './pages/user/accountCustomerPage';
import ChangePasswordPage from './pages/user/changePasswordPage';
import OrdersPage from './pages/user/ordersPage';
import ListBlogPage from './pages/user/listBlogPage'
import BlogDetailsPage from './pages/user/blogDetailsPage';
import HomePage from './pages/user/homePage';
import Login from './pages/user/loginPage';
import Admin from './pages/admin';

function App() {

  const [page, setPage] = useState('');

  return (
    <div className='App'>
      <Admin />
    </div>
  );
}

export default App;
