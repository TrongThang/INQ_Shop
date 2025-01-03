import { Link } from "react-router-dom";
import AreaCustomer from "../Header/areaCustomer";
import SearchHeader from "./searchHeader";

export default function Navbar({categories, isLogged}) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center">
            {/* <!-- Logo --> */}
            <Link to="/home" className="navbar-brand p-0 me-auto">
                <h1 className="text-primary mb-0">
                    <i className="fab fa-slack me-2"></i>INQ Shop
                </h1>
            </Link>
            {/* <!-- Toggler for Mobile View --> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            {/* <!-- Navbar Links --> */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav mx-auto">
                    <Link to="/home" className="nav-item nav-link active">Trang chủ</Link>
                    <div className="nav-item dropdown">
                        <div className="nav-link" data-bs-toggle="dropdown">
                            <span className="dropdown-toggle">Danh mục</span>
                        </div>
                        <div className="dropdown-menu">
                            {categories.map((category, index) => (
                                <Link key={index} to={`/search?category=${category.slug}`} className="dropdown-item mb-2">
                                    {category.nameCategory}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link to="/introdution" className="nav-item nav-link">Giới thiệu</Link>
                    <Link to="/contact" className="nav-item nav-link">Liên hệ</Link>
                </div>
            </div>

            <SearchHeader />
            <AreaCustomer isLogged={isLogged} />
        </nav>
    );
};
