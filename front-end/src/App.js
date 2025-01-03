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



function App() {

  const [page, setPage] = useState('user');
  
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<User />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/details" element={<DetailDevicePage />} />

      </Routes>
    </Router>
      
  );
}

export default App;
