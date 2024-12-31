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


import Header from './component/LayoutCustomer/Header/header';
import Footer from './component/LayoutCustomer/Footer/footer';

import ModalSearch from './component/Contact/modalSearch';
import ContactForm from './component/Contact/contactForm';


function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <ModalSearch />
        <ContactForm />
      
      </main>
      <Footer />

    </div>
  );
}

export default App;
