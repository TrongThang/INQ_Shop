import React, { useState } from 'react';
import './resource/css/style.css';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
import './resource/lib/lightbox/css/lightbox.min.css'
import './resource/lib/owlcarousel/assets/owl.carousel.min.css'
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
// <!-- Template Stylesheet -->
import './resource/css/style.css'
import './resource/css/inq.css'

// Library Script
// import './resource/lib/wow/wow.min.js'
// import './resource/lib/easing/easing.min.js'
// import './resource/lib/waypoints/waypoints.min.js'
// import './resource/lib/counterup/counterup.min.js'
// import './resource/lib/lightbox/js/lightbox.min.js'
// import './resource/lib/owlcarousel/owl.carousel.min.js'

import Header from './component/User/LayoutCustomer/Header/header';
import Footer from './component/User/LayoutCustomer/Footer/footer';
import SearchPage from './pages/User/searchPage';
import ButtonPage from './component/User/buttonPage';
import CheckoutPage from './pages/User/checkoutPage';
import DetailDevicePage from './pages/User/detailDevicePage';
import CartPage from './pages/User/cartPage';
import Login from './component/Admin/Login/login';

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
      { page === 'loginAdmin' && <Login />} 
      <Footer />

    </div>
  );
}

export default App;
