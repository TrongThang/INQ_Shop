import React, { useState, useEffect, useRef } from "react";

const Carousel = ({ scrollToNew,scrollToFeature, scrollToBestSelling }) => {
  const [carousel, setCarousel] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  // Fetch data from API
  const fetchDataCategories = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/slideshow");
      const result = await response.json();
      setCarousel(result.data || []); // Fallback to an empty array if data is undefined
    } catch (err) {
      console.error("Failed to fetch carousel data:", err);
    }
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  // Automatically switch slides every 5 seconds
  useEffect(() => {
    if (carousel.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === carousel.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
  }, [carousel]);

  // Manually navigate to the next/previous slide
  const nextSlide = () => {
    clearInterval(intervalRef.current); // Reset auto-slide interval
    setCurrentSlide((prevSlide) =>
      prevSlide === carousel.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    clearInterval(intervalRef.current); // Reset auto-slide interval
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? carousel.length - 1 : prevSlide - 1
    );
  };

  return (
    <>
      <div
        className="position-relative"
        style={{ width: "100vw", overflow: "hidden" }}
      >
        {carousel.length > 0 ? (
          <div
            className=""
            style={{ width: "100%", overflow: "hidden" }}
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              {/* Image */}
              <div className="position-relative">
                <img
                  src={`/img/slideshow/${carousel[currentSlide]?.image}`}
                  className="img-fluid"
                  style={{
                    width: "100%", // Ensure full width
                    height: "100%", // Ensure full height
                  }}
                  alt={`Slide ${currentSlide + 1}`}
                />

                {/* Text Button */}
                {
                  currentSlide === 1 && (
                    <button
                      className="btn btn-warning py-3 px-5 text-center btn-slide-show"
                      onClick={scrollToNew}
                      style={{
                        position: "absolute",
                        bottom: "100px", // Distance from the bottom
                        left: "150px", // Center horizontally
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "white",
                        zIndex: 10, // Ensure button is above image
                      }}
                    >
                      {carousel[currentSlide]?.textButton}
                    </button>
                  )
                }

                {
                  currentSlide === 2 && (
                    <button
                      className="btn btn-warning py-3 px-5 text-center btn-slide-show"
                      onClick={scrollToFeature}
                      style={{
                        position: "absolute",
                        bottom: "100px", // Distance from the bottom
                        right: "250px", // Center horizontally
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "white",
                        zIndex: 10, // Ensure button is above image
                      }}
                    >
                      {carousel[currentSlide]?.textButton}
                    </button>
                  )
                }
                  {
                  currentSlide === 0 && (
                    <button
                      className="btn btn-warning py-3 px-5 text-center btn-slide-show"
                      onClick={scrollToBestSelling}
                      style={{
                        position: "absolute",
                        bottom: "140px", // Distance from the bottom
                        left: "250px", // Center horizontally
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "white",
                        zIndex: 10, // Ensure button is above image
                      }}
                    >
                      {carousel[currentSlide]?.textButton}
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">Loading carousel...</div>
        )}

        {/* Navigation buttons */}
        <div
          className="d-flex justify-content-center"
          style={{
            position: "absolute",
            bottom: "20px", // Fixed position 20px from bottom
            left: "50%", // Center horizontally
            transform: "translateX(-50%)",
            zIndex: 20, // Ensure navigation buttons are above the image
          }}
        >
          <button
            className="carousel-button btn btn-light"
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "10px",
              bottom: "0px",
              zIndex: 10,
            }}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            className="carousel-button btn btn-light"
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "10px",
              bottom: "0px",
              zIndex: 10,
            }}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
