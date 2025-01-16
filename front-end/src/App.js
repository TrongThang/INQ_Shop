import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// <!-- Libraries Stylesheet -->
import './resource/lib/animate/animate.min.css'
import './resource/lib/lightbox/css/lightbox.min.css'
//  <!-- Icon Font Stylesheet -->
// <!-- Customized Bootstrap Stylesheet -->
import './resource/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './resource/css/style.css';


// <!-- Template Stylesheet -->
import './resource/css/inq.css'

import User from './pages/user';
import Admin from './pages/admin';
import HomePage from './pages/user/homePage'
import DetailDevicePage from './pages/user/detailDevicePage';
import LoginPage from './pages/user/Account/loginPage';

import CartPage from './pages/user/cartPage';
import SearchPage from "./pages/user/searchPage";
import AddressPage from "./pages/user/Profile/addressPage";
import ProfileCustomer from "./pages/user/Profile/accountCustomerPage";

import OrdersPage from "./pages/user/Profile/ordersPage";

import ListBlogPage from "./pages/user/Introdution/listBlogPage";
import DetailBlogPage from "./pages/user/Introdution/blogDetailsPage";
import CheckoutPage from "./pages/user/checkoutPage";

import CompanyInfo from './component/user/Introdution/companyInfo';
import Contact from "./pages/user/contact";
import { CartProvider } from './context/CartContext';
import { InfoWebsiteProvider } from './context/settingWebContext';
import ContactPage from './pages/user/contact';
import RegisterPage from './pages/user/Account/registerPage';
import LikedPage from './pages/user/likedDevice';

import ManaConatct from './pages/admin/Contact/manaContact';
import UpdateContact from './pages/admin/Contact/updateContact';

import ManaReviewDevice from './pages/admin/ReviewDevice/manaReviewDevice';
import UpdateReviewDevice from './component/admin/Mana_ReviewDevice/CRUD_ReviewDevice/UpdateReviewDevice';
import DeleteReviewDevice from './component/admin/Mana_ReviewDevice/CRUD_ReviewDevice/DeleteReviewDevice';
import ManaInfoWeb from './pages/admin/Dashboard/manaInfoWebsite';
import UpdateInfoWeb from './component/admin/Mana_InfoWebsite/CRUD_InfoWeb/UpdateInfoWeb';

import Dashboard  from "./pages/admin/Dashboard/dashboard"
import Statistics from "./component/admin/Mana_Statistics/StatisticsTab";

function App() {

  return (
    <InfoWebsiteProvider>
      <Router>
        <Routes>
          {/* ADMIN */}
          <Route path="/admin" element={<Admin />}>
           <Route path="contacts" element={<ManaConatct />} />
          <Route path="contacts/update/:id" element={<UpdateContact />} />


          <Route path="review-device" element={<ManaReviewDevice />} />
          <Route path="review-device/update/:id" element={<UpdateReviewDevice />} />
          <Route path="review-device/delete/:id" element={<DeleteReviewDevice />} />

          

               {/* Route cho Dashboard */}
               <Route path="dashboard" element={<Dashboard />}>
                        {/* Tab Thống kê */}
                    
                        <Route path="statistics" element={<Statistics />} />

                        {/* Tab Quản lý thông tin website */}
                        <Route path="info-web" element={<ManaInfoWeb />} />
                        <Route path="info-web/update/:keyName" element={<UpdateInfoWeb />} />
                       
                    </Route>


          </Route>
          

          {/* USER */}
          <Route path="/"
            element={
              <CartProvider>
                <User />
                <RegisterPage/>
                <LoginPage />
              </CartProvider>
            }
          >
              <Route path='/' element={<HomePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="profile" element={<ProfileCustomer />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="/profile/address" element={<AddressPage />} />
              <Route path="/introdution" element={<CompanyInfo />} />
              <Route path="/blog" element={<ListBlogPage />} />
              <Route path="/blog/:id" element={<DetailBlogPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile/orders" element={<OrdersPage />} />
              <Route path="/search/*" element={<SearchPage />} />
              <Route path="/device/:slug" element={<DetailDevicePage />} />
              <Route path="/likeDevice" element={<LikedPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

        </Routes>
      </Router>
    </InfoWebsiteProvider>
  );
}

export default App;
