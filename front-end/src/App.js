import React, { useState } from 'react';


import './resource/css/style.css';
import './resource/css/index.css';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
import './resource/lib/lightbox/css/lightbox.min.css'
import './resource/lib/owlcarousel/assets/owl.carousel.min.css'
//  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
// <!-- Template Stylesheet -->
import './resource/css/style.css'
import './resource/css/inq.css'
import './resource/css/mana_blog_details.css'


//Component
// Library Script
// import './resource/lib/wow/wow.min.js'
// import './resource/lib/easing/easing.min.js'
// import './resource/lib/waypoints/waypoints.min.js'
// import './resource/lib/counterup/counterup.min.js'
// import './resource/lib/lightbox/js/lightbox.min.js'
// import './resource/lib/owlcarousel/owl.carousel.min.js'

import Header from './component/LayoutCustomer/Header/header';
import Footer from './component/LayoutCustomer/Footer/footer';

//Page
import SearchPage from './pages/searchPage';
import AddressList from './pages/addressPage';
import Account from './pages/accountCustomerPage';
import PasswordFormPage from './pages/passwordFormPage';
import OrdersPage from './pages/ordersPage';
import ListBlogPage from './pages/lisBlogPage'
import BlogDetailsPage from './pages/blogDetailsPage';
import HomePage from './pages/homePage';
import ManageBlogPage from './pages/manageBlogPage';
import ButtonPage from './component/buttonPage';
import CheckoutPage from './pages/checkoutPage';
import DetailDevicePage from './pages/detailDevicePage';
import CartPage from './pages/cartPage';
import Login from './component/Admin/Login/login';

function App() {

  const [page, setPage] = useState('');


  return (
    <div className='App'>
      <Header />
      {/* <ButtonPage setPage={setPage} />
      { page === 'search' && <SearchPage />}
      { page === ''}  */}
      <ManageBlogPage />
      <ButtonPage setPage={setPage} />
      { page === 'search' && <SearchPage />} 
      { page === 'checkout' && <CheckoutPage />} 
      { page === 'detail' && <DetailDevicePage />} 
      { page === 'cart' && <CartPage />} 
      { page === 'loginAdmin' && <Login />} 
      <Footer />
    </div>
  );
}

export default App;
