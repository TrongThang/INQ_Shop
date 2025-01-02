import AreaCustomer from "../Header/areaCustomer";
import SearchHeader from "./searchHeader";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center">
            {/* <!-- Logo --> */}
            <a href="google.com" className="navbar-brand p-0 me-auto">
                <h1 className="text-primary mb-0"><i className="fab fa-slack me-2"></i>INQ Shop</h1>
                {/* <img src="img/logo.png" alt="Logo"/> */}
            </a>
            {/* <!-- Toggler for Mobile View --> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            {/* <!-- Navbar Links --> */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ">
                    <a href="index.html" className="nav-item nav-link active">Trang chủ</a>
                    <div className="nav-item dropdown">
                        <a href="google.com" className="nav-link" data-bs-toggle="dropdown">
                            <span className="dropdown-toggle">Danh mục</span>
                        </a>
                        <div className="dropdown-menu">
                            <a href="feature.html" className="dropdown-item">Our Features</a>
                            <a href="team.html" className="dropdown-item">Our team</a>
                            <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                            <a href="FAQ.html" className="dropdown-item">FAQs</a>
                            <a href="404.html" className="dropdown-item">404 Page</a>
                        </div>
                    </div>
                    <a href="service.html" className="nav-item nav-link">Giới thiệu</a>
                    <a href="blog.html" className="nav-item nav-link">Liên hệ</a>
                </div>
            </div>

            <SearchHeader />
            <AreaCustomer />
        </nav>
    );
};
