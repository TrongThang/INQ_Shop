import React, { useState } from 'react';
import blog1 from '../../../resource/img/blog-1.png';

const BestSeelingDeivce = () => {
    const products = [
        {
            name: 'Đèn Thông Minh Minh',
            price: '500,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.5/5)',
            description: 'Kiểm soát ánh sáng linh hoạt, phù hợp với nhu cầu sử dụng và tiết kiệm năng lượng cho gia đình bạn.',
            image: '',
            link: '#'
        },
        {
            name: 'Đèn Thông Minh Minh',
            price: '500,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.5/5)',
            description: 'Kiểm soát ánh sáng linh hoạt, phù hợp với nhu cầu sử dụng và tiết kiệm năng lượng cho gia đình bạn.',
            image: '',
            link: '#'
        },
        {
            name: 'Hệ Thống An Ninh',
            price: '1,200,000 VND',
            rating: '⭐⭐⭐⭐ (4.2/5)',
            description: 'Giám sát 24/7 với camera thông minh, cảm biến và cảnh báo, đảm bảo ngôi nhà luôn an toàn.',
            image: '',
            link: '#'
        },
        {
            name: 'Cảm Biến Thông Minh',
            price: '800,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.8/5)',
            description: 'Tích hợp cảm biến nhiệt độ, độ ẩm và chuyển động để tối ưu hóa trải nghiệm trong ngôi nhà bạn.',
            image: '',
            link: '#'
        },
        {
            name: 'Khóa Cửa Thông Minh',
            price: '1,000,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.7/5)',
            description: 'Bảo mật nâng cao với khóa cửa thông minh tích hợp vân tay, mã số và điều khiển từ xa.',
            image: '',
            link: '#'
        },
        {
            name: 'Khóa Cửa Thông Minh',
            price: '1,000,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.7/5)',
            description: 'Bảo mật nâng cao với khóa cửa thông minh tích hợp vân tay, mã số và điều khiển từ xa.',
            image: '',
            link: '#'
        },
        {
            name: 'Khóa Cửa Thông Minh',
            price: '1,000,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.7/5)',
            description: 'Bảo mật nâng cao với khóa cửa thông minh tích hợp vân tay, mã số và điều khiển từ xa.',
            image: '',
            link: '#'
        }, {
            name: 'Khóa Cửa Thông Minh',
            price: '1,000,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.7/5)',
            description: 'Bảo mật nâng cao với khóa cửa thông minh tích hợp vân tay, mã số và điều khiển từ xa.',
            image: '',
            link: '#'
        },
        {
            name: 'Khóa Cửa Thông Minh',
            price: '1,000,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.7/5)',
            description: 'Bảo mật nâng cao với khóa cửa thông minh tích hợp vân tay, mã số và điều khiển từ xa.',
            image: '',
            link: '#'
        },
        {
            name: 'Khóa Cửa Thông Minh',
            price: '1,000,000 VND',
            rating: '⭐⭐⭐⭐⭐ (4.7/5)',
            description: 'Bảo mật nâng cao với khóa cửa thông minh tích hợp vân tay, mã số và điều khiển từ xa.',
            image: '',
            link: '#'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 5;

    // Handle Next button click: Move one product forward
    const handleNext = () => {
        if (currentIndex + 1 < products.length) {
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
    const visibleProducts = products.slice(currentIndex, currentIndex + productsPerPage);

    return (
        <div className="container py-5">
            <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                <h1 className="display-4 fw-bold">Sản Phẩm Nổi Bật</h1>
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
                        {visibleProducts.map((product, index) => (
                            <div key={index} className="product-items product-items-best-seller wow fadeInUp" data-wow-delay="0.2s">
                                <div className="service-item">
                                    <div className="service-img">
                                        <div className="img-change">
                                            <img src={blog1} className="img-fluid rounded-top w-100" alt={product.name} />
                                        </div>
                                    </div>
                                    <div className="service-content p-4">
                                        <div className="service-content-inner">
                                            <a href={product.link} className="d-inline-block h4 mb-2 text-decoration-none">{product.name}</a>
                                            <p className="mb-2 text-primary fw-bold">{product.price}</p>
                                            <p className="mb-2">{product.rating}</p>
                                            <p className="mb-4 line-clamp-p">{product.description}</p>
                                            <a className="btn btn-primary rounded-pill py-2 px-4" href={product.link}>Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Button: Only visible when there are more products to scroll */}
                    {visibleProducts.length > 0 && (
                        <button
                            className="btn slider-btn next-btn position-absolute top-50 end-0 translate-middle-y"
                            onClick={handleNext}
                            disabled={currentIndex + productsPerPage >= products.length} // Disable if it's the last page
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
