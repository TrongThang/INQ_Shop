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

// Library Script
// import './resource/lib/wow/wow.min.js'
// import './resource/lib/easing/easing.min.js'
// import './resource/lib/waypoints/waypoints.min.js'
// import './resource/lib/counterup/counterup.min.js'
// import './resource/lib/lightbox/js/lightbox.min.js'
// import './resource/lib/owlcarousel/owl.carousel.min.js'
// import DeviceCard from './component/Shared/deviceCard';
// import AreaSearch from './component/SearchPage/areaSearch';

import Header from './component/User/LayoutCustomer/Header/header';
import Footer from './component/User/LayoutCustomer/Footer/footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonPage from './component/buttonPage';

import LoginAdmin from './component/Admin/Login/login';
import Contact from './pages/user/contact';
import ManaCustomer from './pages/admin/manaCustomer';
import ManaEmployee from './pages/admin/manaEmployee';
import ManaProduct from './pages/admin/manaProduct';
import ManaOrders from './pages/admin/manaOrders';

import CrudCustomer from './pages/admin/crudCustomer';
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

function App() {

  const [page, setPage] = useState('');

  return (
    <div className='App'>
      <Header />
      <ButtonPage setPage={setPage} />
      { page === 'search' && <SearchPage />} 
      { page === 'checkout' && <CheckoutPage />} 
      { page === 'detail' && <DetailDevicePage />} 
      { page === 'cart' && <CartPage />} 
      {page === 'loginAdmin' && <LoginAdmin />} 
      
      { page === 'login' && <Login />}
      <Contact />
      <ManaCustomer/>
      <ManaEmployee/>
      <ManaProduct/>
      <ManaOrders/>
      <CrudCustomer/>
      <Footer />
    </div>
  );
}

export default App;
