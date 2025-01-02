export default function Sidebar() {
    return (
        <div className="sidebar-menu">
            <div className="sidebar-header">
                <div className="logo">
                    <a href="index.html">INQ Admin</a>
                </div>
            </div>
            <div className="main-menu">
                <div className="menu-inner">
                    <nav>
                        <ul className="nav flex-column" id="menu">
                            <li className="nav-item active">
                                <a href="#" className="nav-link" aria-expanded="true"><i
                                    className="ti-dashboard"></i><span>Dashboard</span></a>
                                <ul className="collapse show">
                                    <li className="nav-item active"><a href="index.html" className="nav-link">Dashboard ICO</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" aria-expanded="true">
                                    <i className="ti-layout-sidebar-left"></i>
                                    <span>Thống kê</span>
                                </a>
                                <ul className="collapse">
                                    <li className="nav-item"><a href="index.html" className="nav-link">Thống kê Bán</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" aria-expanded="true"><i className="ti-pie-chart"></i><span>Thiết bị</span></a>
                                <ul className="collapse">
                                    <li className="nav-item"><a href="barchart.html" className="nav-link">Quản lý</a></li>
                                    <li className="nav-item"><a href="linechart.html" className="nav-link">Thêm sản phẩm mới</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" aria-expanded="true"><i className="ti-user"></i><span>Khách hàng</span></a>
                                <ul className="collapse">
                                    <li className="nav-item"><a href="accordion.html" className="nav-link">Quản lý</a></li>
                                    <li className="nav-item"><a href="alert.html" className="nav-link">Thêm Khách hàng</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" aria-expanded="true"><i className="ti-slice"></i><span>Bài viết</span></a>
                                <ul className="collapse">
                                    <li className="nav-item"><a href="fontawesome.html" className="nav-link">Quản lý</a></li>
                                    <li className="nav-item"><a href="themify.html" className="nav-link">Viết bài mới</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" aria-expanded="true"><i className="fa fa-table"></i>
                                    <span>Nhân viên</span></a>
                                <ul className="collapse">
                                    <li className="nav-item"><a href="table-basic.html" className="nav-link">Quản lý</a></li>
                                    <li className="nav-item"><a href="table-layout.html" className="nav-link">Thêm</a></li>
                                    <li className="nav-item"><a href="datatable.html" className="nav-link">datatable</a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a href="invoice.html" className="nav-link"><i className="ti-receipt"></i> <span>Đơn hàng</span></a></li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" aria-expanded="true"><i className="ti-layers-alt"></i>
                                    <span>Pages</span></a>
                                <ul className="collapse">
                                    <li className="nav-item"><a href="login.html" className="nav-link">Login</a></li>
                                    <li className="nav-item"><a href="login2.html" className="nav-link">Login 2</a></li>
                                    <li className="nav-item"><a href="login3.html" className="nav-link">Login 3</a></li>
                                    <li className="nav-item"><a href="register.html" className="nav-link">Register</a></li>
                                    <li className="nav-item"><a href="register2.html" className="nav-link">Register 2</a></li>
                                    <li className="nav-item"><a href="register3.html" className="nav-link">Register 3</a></li>
                                    <li className="nav-item"><a href="register4.html" className="nav-link">Register 4</a></li>
                                    <li className="nav-item"><a href="screenlock.html" className="nav-link">Lock Screen</a></li>
                                    <li className="nav-item"><a href="screenlock2.html" className="nav-link">Lock Screen 2</a></li>
                                    <li className="nav-item"><a href="reset-pass.html" className="nav-link">reset password</a></li>
                                    <li className="nav-item"><a href="pricing.html" className="nav-link">Pricing</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" aria-expanded="true"><i
                                    className="fa fa-exclamation-triangle"></i>
                                    <span>Lỗi</span></a>
                                <ul className="collapse">
                                    <li className="nav-item"><a href="404.html" className="nav-link">Error 404</a></li>
                                    <li className="nav-item"><a href="403.html" className="nav-link">Error 403</a></li>
                                    <li className="nav-item"><a href="500.html" className="nav-link">Error 500</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}