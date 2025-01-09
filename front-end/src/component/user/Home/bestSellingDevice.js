import React, { useState, useEffect } from 'react';
import DeviceCard from "../../Shared/deviceCard";


const BestSeelingDeivce = () => {
    const [device, setDevice] = useState([]);

    const fetchDataCategories = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/device/bestselling');
            const result = await response.json();
            console.log(result.data)

            setDevice(result.data);
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    useEffect(() => {
        fetchDataCategories()
    }, []);


    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 5;

    // Handle Next button click: Move one product forward
    const handleNext = () => {
        if (currentIndex + 1 < device.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Handle Previous button click: Move one product backward
    const handlePrev = () => {
        if (currentIndex - 1 >= 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Slice the products array to display the current set of 5 products
    const visibleProducts = device.slice(currentIndex, currentIndex + productsPerPage);

    return (
        <div className="container py-5">
            <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                <h1 className="display-4 fw-bold">Sản Phẩm Bạn Chạy</h1>
            </div>
            <div className="row justify-content-center">
                <div className="position-relative">
                    {/* Prev Button: Only visible when there are more products to scroll */}
                    {visibleProducts.length > 0 && (
                        <button
                            className="btn slider-btn prev-btn position-absolute top-50 start-0 translate-middle-y"
                            onClick={handlePrev}
                            disabled={currentIndex === 0} // Disable if it's the first product
                        >
                            <i className="fa fa-chevron-left"></i>
                        </button>
                    )}

                    <div className="d-flex overflow-hidden product-container product-container-best-seller">
                        {visibleProducts.map((device, index) => (
                            <DeviceCard key={index} device={device} />
                        ))}
                    </div>

                    {/* Next Button: Only visible when there are more products to scroll */}
                    {visibleProducts.length > 0 && (
                        <button
                            className="btn slider-btn next-btn position-absolute top-50 end-0 translate-middle-y"
                            onClick={handleNext}
                            disabled={currentIndex + productsPerPage >= device.length} // Disable if it's the last page
                        >
                            <i className="fa fa-chevron-right"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BestSeelingDeivce;
