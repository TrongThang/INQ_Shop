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

//USER
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
import ReviewDevice from './pages/user/reviewDevice'

//ADMIN
import ManaOrder from './pages/admin/Order/manaOrders';
import UpdateOrder from './component/admin/Mana_orders/CRUD_orders/updateOrderForm';
import ManaProduct from './pages/admin/Product/manaProduct';


import ManaCategory from './pages/admin/Categories/manaCategory';
import AddOrEditCategory from './component/admin/Mana_Category/addOrEditCategory';

function App() {

  return (
    <InfoWebsiteProvider>
      <Router>
        <Routes>
          {/* ADMIN */}
          <Route path='/admin/' element={<Admin />} > 
          
            <Route path="manage-category" element={<ManaCategory />} />
            <Route path="add-category" element={<AddOrEditCategory />} />
            <Route path="edit-category/:id" element={<AddOrEditCategory />} />
            <Route path="manage-order" element={<ManaOrder />} />
            <Route path="edit-order/:id" element={<UpdateOrder />} />
            <Route path="manage-device" element={<ManaProduct />} />

          </Route>


          {/* USER */}
          <Route path="/"
            element={
              <CartProvider>
                <User />
                <RegisterPage />
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
              <Route path="/profile/likeDevice" element={<LikedPage />} />
              <Route path="/profile/review" element={<ReviewDevice />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

        </Routes>
      </Router>
    </InfoWebsiteProvider>
  );
}

export default App;
