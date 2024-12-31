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

function App() {

  const [page, setPage] = useState('');


  return (
    <div className='App'>
      <Header />
      {/* <ButtonPage setPage={setPage} />
      { page === 'search' && <SearchPage />}
      { page === ''}  */}
      <ManageBlogPage />
      <Footer />
    </div>
  );
}

export default App;
