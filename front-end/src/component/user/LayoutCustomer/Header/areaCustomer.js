import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../context/CartContext";
import LogoutToast from "../../Notification/logoutToast";
export default function AreaCustomer({ isLogged }) {
    const { getTotalItem, getTotalPrice } = useCart();
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        isLogged = false;

        // Show the toast notification
        setShowToast(true);
        navigate('/');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        // Redirect to login page after a short de  lay

        // Hide the toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 1500);
    };

    const fetchDeviceInCart = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/cart');
            const result = await response.json();
            console.log('Area Customer: ', result.data)

        } catch (err) {
            console.error(err);
        } finally {
        }
    }
    useEffect(() => {
        fetchDeviceInCart();
    }, []);
    
    return (
        <>
            {/* <!-- Price & Cart --> */}
            <div className="d-flex align-items-center">
                <span className="me-2 fw-bold">{getTotalPrice().toLocaleString()} VNĐ</span>
                <Link
                    to="/cart"
                    className="btn btn-light btn-lg-square rounded-circle position-relative wow tada"
                    data-wow-delay=".9s"
                >
                    <i
                        className="fa-solid fa-cart-shopping fa-2x"
                        style={{ marginLeft: "-3px", marginTop: "5px" }}
                    ></i>
                    <div className="position-absolute" style={{ top: "0px", right: "0px", }}>
                        <span className="bg-danger badge badge-warning" style={{ fontSize: "0.7rem", marginTop: "5px" }}>
                            {getTotalItem()}
                        </span>
                    </div>
                </Link>
            </div>

            {/* <!-- END Price & Cart --> */}

            {/* <!-- PROFILE --> */}
            <div className="d-none d-xl-flex flex-shrink-0 ps-4">
                <div className="nav-item dropdown">
                    <Link
                        href="google.com"
                        className="nav-link btn btn-light btn-lg-square rounded-circle position-relative"
                        data-bs-toggle="dropdown"
                    >
                        <span className="dropdown">
                            <i className="fa-solid fa-user fa-2x"></i>
                        </span>
                    </Link>
                    <div className="dropdown-menu" style={{ left: "-15px" }}>
                        {isLogged === true ?
                            <>
                                <Link to="/profile" className="dropdown-item">Hồ sơ</Link>
                                <Link to="/profile/orders" className="dropdown-item">Đơn hàng</Link>
                                <Link to="/profile/address" className="dropdown-item">Địa chỉ</Link>
                                <button
                                    onClick={handleLogout}  // Handle logout here
                                    className="dropdown-item"
                                >
                                    Đăng xuất
                                </button>
                            </>
                            :
                            <>
                                <Link
                                    to="/login-in"
                                    className="dropdown-item"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                    style={{ cursor: "pointer" }}   
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/resgister"
                                    className="dropdown-item"
                                    data-bs-toggle="modal"
                                    data-bs-target="#registerModal"
                                    style={{ cursor: "pointer" }} 
                                >
                                    Đăng Ký
                                </Link>
                            </>
                        }
                    </div>
                </div>
                {/* <!-- END PROFILE --> */}
            </div>
            <LogoutToast show={showToast} />
        </>
    );
}