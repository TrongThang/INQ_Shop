import React, { useState } from 'react';


import './resource/css/style.css';
import './resource/css/index.css';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
//bootstrap/dist/css/bootstrap.min.css
import './resource/lib/lightbox/css/lightbox.min.css'
import './resource/lib/owlcarousel/assets/owl.carousel.min.css'
//  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
// <!-- Template Stylesheet -->
import './resource/css/style.css'
import './resource/css/inq.css'
import './resource/css/login.css';

// Library Script
// import './resource/lib/wow/wow.min.js'
// import './resource/lib/easing/easing.min.js'
// import './resource/lib/waypoints/waypoints.min.js'
// import './resource/lib/counterup/counterup.min.js'
// import './resource/lib/lightbox/js/lightbox.min.js'
// import './resource/lib/owlcarousel/owl.carousel.min.js'
// import DeviceCard from './component/Shared/deviceCard';
import Header from './component/LayoutCustomer/Header/header';
import Footer from './component/LayoutCustomer/Footer/footer';
// import AreaSearch from './component/SearchPage/areaSearch';

import ModalSearch from './component/Contact/modalSearch';
import ContactForm from './component/Contact/contactForm';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManaCustomer from './pages/manaCustomer';
import ManaEmployee from './pages/manaEmployee';
import ManaProduct from './pages/manaProduct';


import Header from './component/User/LayoutCustomer/Header/header';
import Footer from './component/User/LayoutCustomer/Footer/footer';
import SearchPage from './pages/User/searchPage';
import ButtonPage from './component/User/buttonPage';
import CheckoutPage from './pages/User/checkoutPage';
import DetailDevicePage from './pages/User/detailDevicePage';
import CartPage from './pages/User/cartPage';
import LoginAdmin from './component/Admin/Login/login';

import AddressList from './pages/addressPage';
import Account from './pages/accountCustomerPage';
import PasswordFormPage from './pages/passwordFormPage';
import OrdersPage from './pages/ordersPage';
import ListBlogPage from './pages/lisBlogPage'
import BlogDetailsPage from './pages/blogDetailsPage';
import HomePage from './pages/homePage';
import ManageBlogPage from './pages/manageBlogPage';
import Login from './pages/loginPage';

function App() {

  const [page, setPage] = useState('');


  return (
    <div className='App'>
      <Header />
      {/* <ButtonPage setPage={setPage} /> */}
      { page === 'search' && <SearchPage />} 
      { page === 'checkout' && <CheckoutPage />} 
      { page === 'detail' && <DetailDevicePage />} 
      { page === 'cart' && <CartPage />} 
      {page === 'loginAdmin' && <LoginAdmin />} 
      
      { page === 'login' && <Login />}
      <Footer />
    </div>
  );
}

export default App;
