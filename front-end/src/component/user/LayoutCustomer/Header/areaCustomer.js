export default function AreaCustomer() {
    return (
        <>
        {/* <!-- Price & Cart --> */}
            <div class="d-flex align-items-center">
                <span className="me-2 fw-bold">100.000 VNĐ</span>
                <a
                    href="google.com"
                    className="btn btn-light btn-lg-square rounded-circle position-relative wow tada"
                    data-wow-delay=".9s"
                >
                    <i
                        className="fa-solid fa-cart-shopping fa-2x"
                        style={{ marginLeft: "-3px", marginTop: "5px" }}
                    ></i>
                    <div className="position-absolute" style={{ top: "0px", right: "0px", }}>
                        <span className="bg-danger badge badge-warning">4</span>
                    </div>
                </a>
            </div>

            {/* <!-- END Price & Cart --> */}
            
            {/* <!-- PROFILE --> */}
            <div className="d-none d-xl-flex flex-shrink-0 ps-4">
                <div className="nav-item dropdown">
                    <a 
                        href="google.com" 
                        className="nav-link btn btn-light btn-lg-square rounded-circle position-relative" 
                        data-bs-toggle="dropdown"
                    >
                        <span className="dropdown">
                            <i className="fa-solid fa-user fa-2x"></i>
                        </span>
                    </a>
                    <div className="dropdown-menu" style={{ left: "-15px" }}>
                        <a href="FAQ.html" className="dropdown-item">Hồ sơ</a>
                        <a href="404.html" className="dropdown-item">Đăng xuất</a>
                    </div>
                </div>
                {/* <!-- END PROFILE --> */}
            </div>
        </>
    );
}