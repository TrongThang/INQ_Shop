import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    return (
        <div className="sidebar-menu bg-dark" style={{ width: "280px", minHeight: "100vh" }}>
            <div className="sidebar-header p-3 bg-dark text-white">
                <div className="logo">
                    <Link to="/admin/welcome" className="text-white text-decoration-none">INQ Admin</Link>
                </div>
            </div>
            <div className="main-menu">
                <div className="menu-inner">
                    <nav>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center p-3 text-white hover-bg-gray"
                                    onClick={() => toggleMenu("dashboard")}
                                >
                                    <i className="ti-dashboard me-2"></i>
                                    <span>Chung</span>
                                    <i className={`ms-auto ti-angle-${openMenu === "dashboard" ? "down" : "right"}`}></i>
                                </a>
                                <ul
                                    className={`submenu list-unstyled ps-4 ${
                                        openMenu === "dashboard" ? "d-block" : "d-none"
                                    }`}
                                >
                                    <li>
                                        <Link to="/admin/dashboard/statistics" className="nav-link p-2 text-white hover-bg-gray">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/dashboard/info-web" className="nav-link p-2 text-white hover-bg-gray">
                                            Quản lý thông tin website
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center p-3 text-white hover-bg-gray"
                                    onClick={() => toggleMenu("device")}
                                >
                                    <i className="ti-layout-sidebar-left me-2"></i>
                                    <span>Quản lý thiết bị</span>
                                    <i className={`ms-auto ti-angle-${openMenu === "device" ? "down" : "right"}`}></i>
                                </a>
                                <ul
                                    className={`submenu list-unstyled ps-4 ${
                                        openMenu === "device" ? "d-block" : "d-none"
                                    }`}
                                >
                                    <li>
                                        <Link to="/admin/device" className="nav-link p-2 text-white hover-bg-gray">
                                            Danh Sách thiết bị
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/device/add" className="nav-link p-2 text-white hover-bg-gray">
                                            Thêm thiết bị
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center p-3 text-white hover-bg-gray"
                                    onClick={() => toggleMenu("category")}
                                >
                                    <i className="ti-layout-sidebar-left me-2"></i>
                                    <span>Quản lý danh mục</span>
                                    <i className={`ms-auto ti-angle-${openMenu === "category" ? "down" : "right"}`}></i>
                                </a>
                                <ul
                                    className={`submenu list-unstyled ps-4 ${
                                        openMenu === "category" ? "d-block" : "d-none"
                                    }`}
                                >
                                    <li>
                                        <Link to="/admin/category" className="nav-link p-2 text-white hover-bg-gray">
                                            Danh sách danh mục
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/category/add" className="nav-link p-2 text-white hover-bg-gray">
                                            Thêm danh mục
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center p-3 text-white hover-bg-gray"
                                    onClick={() => toggleMenu("review-device")}
                                >
                                    <i className="ti-layout-sidebar-left me-2"></i>
                                    <span>Quản lý đánh giá thiết bị</span>
                                    <i className={`ms-auto ti-angle-${openMenu === "review-device" ? "down" : "right"}`}></i>
                                </a>
                                <ul
                                    className={`submenu list-unstyled ps-4 ${
                                        openMenu === "review-device" ? "d-block" : "d-none"
                                    }`}
                                >
                                    <li>
                                        <Link to="/admin/review-device" className="nav-link p-2 text-white hover-bg-gray">
                                            Danh sách đánh giá thiết bị
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center p-3 text-white hover-bg-gray"
                                    onClick={() => toggleMenu("order")}
                                >
                                    <i className="ti-layout-sidebar-left me-2"></i>
                                    <span>Quản lý đặt hàng</span>
                                    <i className={`ms-auto ti-angle-${openMenu === "order" ? "down" : "right"}`}></i>
                                </a>
                                <ul
                                    className={`submenu list-unstyled ps-4 ${
                                        openMenu === "order" ? "d-block" : "d-none"
                                    }`}
                                >
                                    <li>
                                        <Link to="/admin/order" className="nav-link p-2 text-white hover-bg-gray">
                                            Danh sách đặt hàng
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center p-3 text-white hover-bg-gray"
                                    onClick={() => toggleMenu("contacts")}
                                >
                                    <i className="ti-layout-sidebar-left me-2"></i>
                                    <span>Quản lý Liên hệ</span>
                                    <i className={`ms-auto ti-angle-${openMenu === "contacts" ? "down" : "right"}`}></i>
                                </a>
                                <ul
                                    className={`submenu list-unstyled ps-4 ${
                                        openMenu === "contacts" ? "d-block" : "d-none"
                                    }`}
                                >
                                    <li>
                                        <Link to="/admin/contacts" className="nav-link p-2 text-white hover-bg-gray">
                                            Danh sách liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link d-flex align-items-center p-3 text-white hover-bg-gray"
                                    onClick={() => toggleMenu("statistics")}
                                >
                                    <i className="ti-layout-sidebar-left me-2"></i>
                                    <span>Thống kê</span>
                                    <i className={`ms-auto ti-angle-${openMenu === "statistics" ? "down" : "right"}`}></i>
                                </a>
                                <ul
                                    className={`submenu list-unstyled ps-4 ${
                                        openMenu === "statistics" ? "d-block" : "d-none"
                                    }`}
                                >
                                    <li>
                                        <Link to="/admin/revenueStatistics" className="nav-link p-2 text-white hover-bg-gray">
                                            Thống kê doanh thu
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/purchaseStatistics" className="nav-link p-2 text-white hover-bg-gray">
                                            Thống kê lượt mua
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}