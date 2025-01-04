import React, { useState, useEffect, useRef } from "react";
import Carou from "../../../resource/img/carousel-2.png";
import Blog from "../../../resource/img/blog-1.png";

const Carousel = () => {
  const [carousel, setCarousel] = useState([]);

  const fetchDataCategories = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/sildeshow');
      const result = await response.json();
      console.log(result.data)

      setCarousel(result.data);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchDataCategories()
  }, []);

  const slides = [
    {
      id: 1,
      title: "DỊCH VỤ IOT NHÀ THÔNG MINH",
      subtitle: "Biến đổi không gian sống của bạn với Smart Home IoT",
      description:
        "Chúng tôi cung cấp các giải pháp IoT (Internet of Things) giúp biến ngôi nhà của bạn thành một không gian sống thông minh và tiện nghi.",
      buttonText: "Xem Chi tiết",
      image: Carou,
    },
    {
      id: 2,
      title: "GIẢI PHÁP CẢI TIẾN CUỘC SỐNG",
      subtitle: "Khám phá những đổi mới trong công nghệ Smart Home",
      description:
        "Với các giải pháp Smart Home, bạn có thể điều khiển các thiết bị trong nhà từ xa, tiết kiệm năng lượng và tạo ra không gian sống thoải mái hơn.",
      buttonText: "Khám Phá Ngay",
      image: Blog,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null); // Dùng ref để lưu ID của interval

  // Hàm nextSlide: Di chuyển đến slide tiếp theo
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
    resetSlideInterval(); // Gọi hàm resetInterval khi chuyển slide
  };

  // Hàm prevSlide: Di chuyển đến slide trước
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
    resetSlideInterval(); // Gọi hàm resetInterval khi chuyển slide
  };

  // Hàm startSlideInterval: Bắt đầu một interval để tự động chuyển slide mỗi 4 giây
  const startSlideInterval = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000); // Chuyển slide mỗi 4 giây
  };

  // Hàm resetSlideInterval: Dừng interval hiện tại và bắt đầu lại một interval mới
  const resetSlideInterval = () => {
    clearInterval(intervalRef.current); // Dừng interval hiện tại
    startSlideInterval(); // Bắt đầu lại interval mới
  };

  useEffect(() => {
    startSlideInterval(); // Khởi tạo interval khi component được mount

    return () => {
      clearInterval(intervalRef.current); // Dọn dẹp khi component unmount
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hiệu ứng cuộn mượt mà lên đầu trang
    });
  };

  return (
    <div className="header-carousel owl-carousel">
      <div
        className="header-carousel-item bg-primary animate__animated animate__fadeIn"
        style={{ height: "100vh", position: "relative" }}
      >
        <div
          className="carousel-caption"

        >
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-lg-7 animated fadeInLeft">
                <div className="text-sm-center text-md-start">
                  <h4 className="text-white text-uppercase fw-bold mb-4">
                    {slides[currentSlide].title}
                  </h4>
                  <h1 className="display-1 text-white mb-4">
                    {slides[currentSlide].subtitle}
                  </h1>
                  <p className="mb-5 fs-5 line-clamp">
                    {slides[currentSlide].description}
                  </p>
                  <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                    <a
                      className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2"
                      href="#"
                    >
                      {slides[currentSlide].buttonText}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 animated fadeInRight">
                <div className="calrousel-img" style={{ objectFit: "cover" }}>
                  <img
                    src={slides[currentSlide].image}
                    className="img-fluid w-100"
                    alt={`Slide ${currentSlide + 1}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-center position-absolute"
          style={{
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
        >
          <button className="carousel-button btn btn-light me-3" onClick={prevSlide}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <button className="carousel-button btn btn-light" onClick={nextSlide}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        className="scroll-to-top btn-primary btn btn-light"
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
};

export default Carousel;
