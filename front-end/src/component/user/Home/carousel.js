import React, { useState } from 'react';
import Carou from '../../../resource/img/carousel-2.png';

const Carousel = () => {
  // Step 1: Create state to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle the page change
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Function to go to the next page
  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage === 2 ? 1 : prevPage + 1));
  };

  // Function to go to the previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? 2 : prevPage - 1));
  };

  return (
    <>
      <div className="header-carousel owl-carousel owl-loaded owl-drag">
        {/* Step 2: Use conditional rendering to show one page at a time */}
        <div className={`owl-stage-outer ${currentPage === 1 ? '' : 'd-none'}`}>
          <div className="owl-stage">
            <div className="owl-item" style={{ width: '842.4px' }}>
              <div className="header-carousel-item bg-primary">
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row g-4 align-items-center">
                      <div className="col-lg-7 animated fadeInLeft text-sm-center text-md-start">
                        <h4 className="text-white text-uppercase fw-bold mb-4">DỊCH VỤ IOT NHÀ THÔNG MINH</h4>
                        <h1 className="display-1 text-white mb-4">Biến đổi không gian sống của bạn với Smart Home IoT</h1>
                        <p className="mb-5 fs-5 line-clamp">
                          Chúng tôi cung cấp các giải pháp IoT (Internet of Things) giúp biến ngôi nhà của bạn thành một không gian sống thông minh và tiện nghi.
                        </p>
                        <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                          <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#">
                            Xem Chi tiết
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-5 animated fadeInRight">
                        <div className="carousel-img" style={{ objectFit: 'cover' }}>
                          <img src={Carou} className="img-fluid w-100" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`owl-stage-outer ${currentPage === 2 ? '' : 'd-none'}`}>
          <div className="owl-stage">
            <div className="owl-item" style={{ width: '842.4px' }}>
              <div className="header-carousel-item bg-primary">
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row g-4 align-items-center">
                      <div className="col-lg-7 animated fadeInLeft text-sm-center text-md-start">
                        <h4 className="text-white text-uppercase fw-bold mb-4">DỊCH VỤ IOT NHÀ THÔNG MINH</h4>
                        <h1 className="display-1 text-white mb-4">Biến đổi không gian sống của bạn với Smart Home IoT</h1>
                        <p className="mb-5 fs-5 line-clamp">
                          Chúng tôi cung cấp các giải pháp IoT (Internet of Things) giúp biến ngôi nhà của bạn thành một không gian sống thông minh và tiện nghi.
                        </p>
                        <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                          <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#">
                            Xem Chi tiết
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-5 animated fadeInRight">
                        <div className="carousel-img" style={{ objectFit: 'cover' }}>
                          <img src={Carou} className="img-fluid w-100" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="owl-nav">
          <div className="owl-prev" onClick={prevPage}>
            <i className="bi bi-arrow-left"></i>
          </div>
          <div className="owl-next" onClick={nextPage}>
            <i className="bi bi-arrow-right"></i>
          </div>
        </div>

        <div className="owl-dots">
          {/* Step 3: Adding functionality to dots */}
          <div
            className={`owl-dot ${currentPage === 1 ? 'active' : ''}`}
            onClick={() => changePage(1)}
          >
            <span></span>
          </div>
          <div
            className={`owl-dot ${currentPage === 2 ? 'active' : ''}`}
            onClick={() => changePage(2)}
          >
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
