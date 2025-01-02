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
import CRUDSlideshow from './pages/admin/crudSlideshow';

function App() {

  const [page, setPage] = useState('');
  
  return (
    <div className='App'>
      <Header />

      <CRUDSlideshow/>
      
      <Footer />

      {/* <Admin /> */}
    </div>
  );
}

export default App;
