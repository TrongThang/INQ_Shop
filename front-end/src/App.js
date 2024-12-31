import React from 'react';
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



function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main>
          <ModalSearch />
          <ContactForm />
          <ManaCustomer />
          <ManaEmployee />
          <ManaProduct />
          
        </main>
        <Footer />
       
       
      </div>
    </Router>
  );
}

export default App;
