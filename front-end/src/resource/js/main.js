import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';  // Import Owl Carousel styles
import 'owl.carousel/dist/assets/owl.theme.default.css';  // Import default Owl theme
import Carou from '../../../resource/img/carousel-2.png'; // Update the image path accordingly

const Carousel = () => {
  // Carousel options
  const options = {
    items: 1, // Show only 1 item at a time
    loop: true, // Infinite loop
    margin: 10, // Space between items
    nav: true, // Show navigation arrows
    navText: [
      "<i class='bi bi-arrow-left'></i>",
      "<i class='bi bi-arrow-right'></i>",
    ],
    dots: true, // Show pagination dots
    autoplay: false, // Disable autoplay for better manual control
  };

  return (
    <div className="header-carousel">
      <OwlCarousel className="owl-theme" {...options}>
        {/* Carousel Item 1 */}
        <div className="header-carousel-item bg-primary">
          <div className="carousel-caption">
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-lg-7">
                  <div className="text-sm-center text-md-start">
                    <h4 className="text-white text-uppercase fw-bold mb-4">DỊCH VỤ IOT NHÀ THÔNG MINH</h4>
                    <h1 className="display-1 text-white mb-4">
                      Biến đổi không gian sống của bạn với Smart Home IoT
                    </h1>
                    <p className="mb-5 fs-5 line-clamp">
                      Chúng tôi cung cấp các giải pháp IoT (Internet of Things) giúp biến ngôi nhà của bạn thành một không gian sống thông minh và tiện nghi.
                    </p>
                    <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                      <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#">Xem Chi tiết</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="carousel-img" style={{ objectFit: "cover" }}>
                    <img src={Carou} className="img-fluid w-100" alt="carousel-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Item 2 */}
        <div className="header-carousel-item bg-primary">
          <div className="carousel-caption">
            <div className="container">
              <div className="row gy-4 gy-lg-0 gx-0 gx-lg-5 align-items-center">
                <div className="col-lg-5">
                  <div className="carousel-img">
                    <img src={Carou} className="img-fluid w-100" alt="carousel-img" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="text-sm-center text-md-end">
                    <h4 className="text-white text-uppercase fw-bold mb-4">DỊCH VỤ IOT NHÀ THÔNG MINH</h4>
                    <h1 className="display-1 text-white mb-4">
                      Biến đổi không gian sống của bạn với Smart Home IoT
                    </h1>
                    <p className="mb-5 fs-5 line-clamp">
                      Chúng tôi cung cấp các giải pháp IoT (Internet of Things) giúp biến ngôi nhà của bạn thành một không gian sống thông minh và tiện nghi.
                    </p>
                    <div className="d-flex justify-content-center justify-content-md-end flex-shrink-0 mb-4">
                      <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#">Xem chi tiết</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thêm các item khác nếu cần */}
      </OwlCarousel>
    </div>
  );
};

export default Carousel;
