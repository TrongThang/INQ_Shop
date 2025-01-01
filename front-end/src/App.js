import React, { useState } from 'react';

// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
//bootstrap/dist/css/bootstrap.min.css
import './resource/lib/lightbox/css/lightbox.min.css'
import './resource/lib/owlcarousel/assets/owl.carousel.min.css'
import './resource/assets/css/bootstrap.min.css'

//  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/assets/css/bootstrap.min.css'

// <!-- Template Stylesheet -->
// import './resource/css/inq.css'
import './resource/css/inq.css'
import './resource/css/style.css'


//Component
// Library Script
// import './resource/lib/wow/wow.min.js'
// import './resource/lib/easing/easing.min.js'
// import './resource/lib/waypoints/waypoints.min.js'
// import './resource/lib/counterup/counterup.min.js'
// import './resource/lib/lightbox/js/lightbox.min.js'
// import './resource/lib/owlcarousel/owl.carousel.min.js'
// import DeviceCard from './component/Shared/deviceCard';
// import AreaSearch from './component/SearchPage/areaSearch';

import Header from './component/user/LayoutCustomer/Header/header';
import Footer from './component/user/LayoutCustomer/Footer/footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonPage from './component/buttonPage';

import LoginAdmin from './component/Admin/Login/login';
import Contact from './pages/User/contact';
import ManaCustomer from './pages/Admin/manaCustomer';
import ManaEmployee from './pages/Admin/manaEmployee';
import ManaProduct from './pages/Admin/manaProduct';
import ManaOrders from './pages/Admin/manaOrders';
import ManageBlogPage from './pages/Admin/manageBlogPage';




import SearchPage from './pages/User/searchPage';
import CheckoutPage from './pages/User/checkoutPage';
import DetailDevicePage from './pages/User/detailDevicePage';
import CartPage from './pages/User/cartPage';

import AddressList from './pages/User/addressPage';
import Account from './pages/User/accountCustomerPage';
import ChangePasswordPage from './pages/User/changePasswordPage';
import OrdersPage from './pages/User/ordersPage';
import ListBlogPage from './pages/User/listBlogPage'
import BlogDetailsPage from './pages/User/blogDetailsPage';
import HomePage from './pages/User/homePage';
import Login from './pages/User/loginPage';
import CRUD_blog from './component/Admin/Mana_blog/CRUD_blog/CRUD_blog';
import CRUD_orders from './component/Admin/Mana_orders/CRUD_orders/crud_Orders';

function App() {

 
  const [page, setPage] = useState('');

  return (
    <div className='App'>
      <Header />
      {/* <ButtonPage setPage={setPage} />
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
      <ManaOrders/> */}
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
