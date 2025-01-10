import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRating from "../../../component/Shared/starRating";
const DisCountDevice = () => {
    const [device, setDevice] = useState([]);

    const fetchDataCategories = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/device/discount');
            const result = await response.json();
            console.log(result.data);
            setDevice(result.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDataCategories();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 5;

    // Handle Next button click
    const handleNext = () => {
        if (currentIndex + productsPerPage < device.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Handle Previous button click
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    // Slice the products array to display the current set of products
    const visibleProducts = device.slice(currentIndex, currentIndex + productsPerPage);

    return (
        <div className="container py-5">
            <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                <h1 className="display-4 fw-bold">Sản Phẩm Khuyến mãi</h1>
            </div>
            <div className="row justify-content-center">
                <div className="position-relative">
                    {
                        currentIndex > 0 && (
                            <button
                                className="btn slider-btn prev-btn position-absolute top-50 start-0 translate-middle-y"
                                onClick={handlePrev}
                            >
                                <i className="fa fa-chevron-left"></i>
                            </button>
                        )}

                    {/* Display visible products */}
                    <div className="d-flex overflow-hidden product-container product-container-best-seller">
                        {visibleProducts.map((device, index) => (
                            <div key={index} className="device-items-featured wow fadeInUp mb-5" data-wow-delay="0.2s" style={{ padding: "0px" }}>
                                <div
                                    className="service-item"
                                >
                                    <div className="service-img">
                                        <div className="img-change">
                                            <img src={`/img/device/${device.image}`} className="img-fluid rounded-top w-100"
                                                style={{ height: "300px", objectFit: "cover" }}
                                                alt="Smart Lighting"
                                            />
                                            {/* device.image thay vào nội dung của */}
                                        </div>
                                    </div>
                                    <div className="service-content p-4">
                                        <div className="service-content-inner" >
                                            <Link
                                                to={`/device/${device.slug}`}
                                                className="line-clamp-title-device h4 text-decoration-none"
                                                style={{ maxHeight: "55px", minHeight: "55px" }}
                                            >{device.name}</Link>
                                            <p className="mb-1 text-primary fw-bold">
                                                {Number(device.discountPrice).toLocaleString()} VNĐ
                                            </p>
                                            <p className="mb-1">
                                                {console.log('Số sao', device.name, ':', (device.reviews?.[0]?.averageRating ?? "No rating available"))}
                                                <StarRating rating={device.reviews?.[0]?.averageRating ?? 0} />
                                            </p>
                                            <p className="mb-1 line-clamp-p">
                                                {device.descriptionNormal}
                                            </p>
                                            <Link to={`/device/${device.slug}`} className="btn btn-primary rounded-pill py-2 px-4">Chi tiết</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                 {
                    currentIndex + productsPerPage < device.length && (
                        <button
                            className="btn slider-btn next-btn position-absolute top-50 end-0 translate-middle-y"
                            onClick={handleNext}
                        >
                            <i className="fa fa-chevron-right"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisCountDevice;