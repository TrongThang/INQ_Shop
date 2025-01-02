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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ButtonPage from './component/buttonPage';

import User from './pages/user';
import Admin from './pages/admin';


function App() {

  const [page, setPage] = useState('');
  
  return (
    <div className='App'>
      <Admin />

      {/* <User /> */}
    </div>
  );
}

export default App;
