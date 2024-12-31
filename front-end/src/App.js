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

import Header from './component/LayoutCustomer/Header/header';
import Footer from './component/LayoutCustomer/Footer/footer';
import SearchPage from './pages/searchPage';
import ButtonPage from './component/buttonPage';
import CheckoutPage from './pages/checkoutPage';
import DetailDevicePage from './pages/detailDevicePage';

function App() {

  const [page, setPage] = useState('');
  

  return (
    <div className='App'>
      <Header />
      <ButtonPage setPage={setPage} />
      { page === 'search' && <SearchPage />} 
      { page === 'checkout' && <CheckoutPage />} 
      { page === 'detail' && <DetailDevicePage />} 
      <Footer />

    </div>
  );
}

export default App;
