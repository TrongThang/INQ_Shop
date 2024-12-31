import React, { useState } from 'react';


import './resource/css/style.css';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
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



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './pages/contact';
import ManaCustomer from './pages/manaCustomer';
import ManaEmployee from './pages/manaEmployee';
import ManaProduct from './pages/manaProduct';
import ManaOrders from './pages/manaOrders';


import Header from './component/user/LayoutCustomer/Header/header';
import Footer from './component/user/LayoutCustomer/Footer/footer';
import Login from './component/Admin/Login/login';

function App() {

  const [page, setPage] = useState('');


  return (
    <div className='App'>
      <Header />
      <Contact />
      <ManaCustomer/>
      <ManaEmployee/>
      <ManaProduct/>
      <ManaOrders/>
      {/* <ButtonPage setPage={setPage} />
      {page === 'search' && <SearchPage />}
      {page === 'checkout' && <CheckoutPage />}
      {page === 'detail' && <DetailDevicePage />}
      {page === 'cart' && <CartPage />}
      {page === 'loginAdmin' && <Login />} */}
      <Footer />
    </div>
  );
}

export default App;
