import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer({ categories }) {
    const [isCategoryVisible, setIsCategoryVisible] = useState(false); // Trạng thái hiển thị danh mục

    // Hàm xử lý khi click vào "Danh mục"
    const handleCategoryClick = () => {
        setIsCategoryVisible(!isCategoryVisible); // Thay đổi trạng thái hiển thị
    };

    return (
        <div className="container-fluid footer py-5 wow fadeIn mt-5" data-wow-delay="0.2s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-xl-12">
                        <div className="mb-5">
                            <div className="row g-4">
                                <div className="col-md-6 col-lg-6 col-xl-5">
                                    <div className="footer-item">
                                        <a href="index.html" className="p-0">
                                            <h3 className="text-white"><i className="fab fa-slack me-3" /> INQ Shop</h3>
                                        </a>
                                        <p className="text-white mb-4">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                                        <div className="footer-btn d-flex">
                                            <a className="btn btn-md-square rounded-circle me-3" href="#"><i className="fab fa-facebook-f" /></a>
                                            <a className="btn btn-md-square rounded-circle me-3" href="#"><i className="fab fa-twitter" /></a>
                                            <a className="btn btn-md-square rounded-circle me-3" href="#"><i className="fab fa-instagram" /></a>
                                            <a className="btn btn-md-square rounded-circle me-0" href="#"><i className="fab fa-linkedin-in" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-2"></div>

                                <div className="col-md-6 col-lg-6 col-xl-3">
                                    <div className="footer-item">
                                        <h4 className="text-white mb-4">Liên kết</h4>
                                        <a href="#"><i className="fas fa-angle-right me-2"></i> Trang chủ</a>
                                        <a href="#" onClick={handleCategoryClick}>
                                            <i className="fas fa-angle-right me-2"></i> Danh mục
                                        </a>
                                        {isCategoryVisible && (
                                            <div className="mt-2">
                                                {categories.length > 0 ? (
                                                    categories.map((category, index) => (
                                                        <Link key={index} to={`/category/${category.id}`} className="dropdown-item m-2">
                                                            {category.nameCategory}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className="text-white">Đang tải danh mục...</p>
                                                )}
                                            </div>
                                        )}
                                        <a href="#"><i className="fas fa-angle-right me-2"></i> Giới thiệu</a>
                                        <a href="#"><i className="fas fa-angle-right me-2"></i> Liên hệ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-5" style={{ borderTop: "1px solid #ccc" }}>
                            <div className="row g-0">
                                <div className="col-12">
                                    <div className="row g-4">
                                        <div className="col-lg-6 col-xl-4">
                                            <div className="d-flex">
                                                <div className="btn-xl-square bg-primary text-white rounded p-4 me-4">
                                                    <i className="fas fa-map-marker-alt fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-white">Địa chỉ</h4>
                                                    <p className="mb-0">272Đt743, TP.Dĩ An, Tỉnh Bình Dương</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-4">
                                            <div className="d-flex">
                                                <div className="btn-xl-square bg-primary text-white rounded p-4 me-4">
                                                    <i className="fas fa-envelope fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-white">Email</h4>
                                                    <p className="mb-0">contact.inq@gmail.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
