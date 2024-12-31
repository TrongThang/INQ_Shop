export default function Sidebar() {
    return (
        <div class="sidebar-menu">
            <div class="sidebar-header">
                <div class="logo">
                    <a href="index.html"><img src="assets/images/icon/logo.png" alt="logo" /></a>
                </div>
            </div>
            <div class="main-menu">
                <div class="menu-inner">
                    <nav>
                        <ul class="metismenu" id="menu">
                            <li class="active">
                                <a href="javascript:void(0)" aria-expanded="true"><i
                                    class="ti-dashboard"></i><span>Dashboard</span></a>
                                <ul class="collapse">
                                    <li class="active"><a href="index.html">Dashboard ICO</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true">
                                    <i class="ti-layout-sidebar-left"></i>
                                    <span>Thống kê</span>
                                </a>
                                <ul class="collapse">
                                    <li><a href="index.html">Thống kê Bán</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true"><i class="ti-pie-chart"></i><span>Thiết bị</span></a>
                                <ul class="collapse">
                                    <li><a href="barchart.html">Quản lý</a></li>
                                    <li><a href="linechart.html">Thêm sản phẩm mới</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true"><i class="ti-user"></i><span>Khách hàng</span></a>
                                <ul class="collapse">
                                    <li><a href="accordion.html">Quản lý</a></li>
                                    <li><a href="alert.html">Thêm Khách hàng</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true"><i class="ti-slice"></i><span>Bài viết</span></a>
                                <ul class="collapse">
                                    <li><a href="fontawesome.html">Quản lý</a></li>
                                    <li><a href="themify.html">Viết bài mới</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true"><i class="fa fa-table"></i>
                                    <span>Nhân viên</span></a>
                                <ul class="collapse">
                                    <li><a href="table-basic.html">Quản lý</a></li>
                                    <li><a href="table-layout.html">Thêm</a></li>
                                    <li><a href="datatable.html">datatable</a></li>
                                </ul>
                            </li>
                            <li><a href="invoice.html"><i class="ti-receipt"></i> <span>Đơn hàng</span></a></li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true"><i class="ti-layers-alt"></i>
                                    <span>Pages</span></a>
                                <ul class="collapse">
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="login2.html">Login 2</a></li>
                                    <li><a href="login3.html">Login 3</a></li>
                                    <li><a href="register.html">Register</a></li>
                                    <li><a href="register2.html">Register 2</a></li>
                                    <li><a href="register3.html">Register 3</a></li>
                                    <li><a href="register4.html">Register 4</a></li>
                                    <li><a href="screenlock.html">Lock Screen</a></li>
                                    <li><a href="screenlock2.html">Lock Screen 2</a></li>
                                    <li><a href="reset-pass.html">reset password</a></li>
                                    <li><a href="pricing.html">Pricing</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true"><i
                                    class="fa fa-exclamation-triangle"></i>
                                    <span>Lỗi</span></a>
                                <ul class="collapse">
                                    <li><a href="404.html">Error 404</a></li>
                                    <li><a href="403.html">Error 403</a></li>
                                    <li><a href="500.html">Error 500</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}