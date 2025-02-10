import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSettingWeb } from "../../../../context/settingWebContext";

export default function Footer({ categories }) {
    const { setting } = useSettingWeb();
    
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
                                        <Link to="/" className="p-0">
                                            <h3 className="text-white"><i className="fab fa-slack me-3" /> INQ Shop</h3>
                                        </Link>
                                        <p className="text-white mb-4">
                                            {
                                                setting.LAYOUT_FOOTER_SLOGAN
                                            }
                                        </p>
                                        <div className="footer-btn d-flex">
                                            <Link to="https://www.facebook.com/thongtinchinhphu" className="btn btn-md-square rounded-circle me-3">
                                                <i className={setting.LOGO_FACEBOOK} />
                                            </Link>
                                            <Link to="https://www.instagram.com/" className="btn btn-md-square rounded-circle me-3">
                                                <i className={setting.LOGO_INSTAGRAM} />
                                            </Link>
                                            <Link to="https://www.linkedin.com/" className="btn btn-md-square rounded-circle me-0">
                                                <i className={setting.LOGO_LINKEDIN} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-2"></div>

                                <div className="col-md-6 col-lg-6 col-xl-3">
                                    <div className="footer-item">
                                        <h4 className="text-white mb-4">Liên kết</h4>
                                        <Link to={setting.LINK_NAVBAR_INDEX} ><i className="fas fa-angle-right me-2"></ i>
                                            {setting.LAYOUT_NAVBAR_INDEX}
                                        </Link>
                                        <Link  onClick={handleCategoryClick}>
                                            <i className="fas fa-angle-right me-2"></i> Danh mục
                                        </Link>
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
                                        <Link to={setting.LINK_NAVBAR_INTRODUTION}><i className="fas fa-angle-right me-2"></i>
                                            {setting.LAYOUT_NAVBAR_INTRODUTION}
                                        </Link>
                                        <Link to={setting.LINK_NAVBAR_BLOG}><i className="fas fa-angle-right me-2"></i>
                                            {setting.LAYOUT_NAVBAR_BLOG}
                                        </Link>
                                        <Link to={setting.LINK_NAVBAR_CONTACT}><i className="fas fa-angle-right me-2"></i> {setting.LAYOUT_NAVBAR_CONTACT}</Link>
                                        
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
                                                    <h4 className="text-warning">Địa chỉ</h4>
                                                    <p className="mb-0 text-white"> {setting.COMPANY_ADDRESS} </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-4">
                                            <div className="d-flex">
                                                <div className="btn-xl-square bg-primary text-white rounded p-4 me-4">
                                                    <i className="fas fa-envelope fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-warning">Email</h4>
                                                    <p className="mb-0 text-white">{setting.EMAIL}</p>
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
