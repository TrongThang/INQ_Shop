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

import DeviceCard from './component/Shared/deviceCard';
import Header from './component/LayoutCustomer/Header/header';
import Footer from './component/LayoutCustomer/Footer/footer';
import AreaSearch from './component/SearchPage/AreaSearch/areaSearch';
import AreaSort from './component/SearchPage/areaSort';
import SearchPage from './pages/searchPage';

function App() {

  const [page, setPage] = useState('');
  

  return (
    <div className='App'>
      <Header />
      <button className='btn btn-outline-primary' onClick={() => {setPage('search')}}>Trang Tìm kiếm</button>
      <button className='btn btn-outline-primary' onClick={() => {setPage('cart')}}>Trang Giỏ hàng</button>
      <button className='btn btn-outline-primary' onClick={() => {setPage('checkout')}}>Trang Trang Thanh Toán</button>
      <button className='btn btn-outline-primary' onClick={() => {setPage('detail')}}>Trang Chi tiết SP</button>
      { page === 'search' && <SearchPage />} 
      <Footer />

    </div>
  );
}

export default App;
