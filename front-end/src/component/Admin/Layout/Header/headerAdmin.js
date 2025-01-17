import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HeaderAdmin({ idUserProps }) {
    const [user, setUser] = useState(null);
    const [idUser, setIdUser] = useState(idUserProps);
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("authToken")); // Kiểm tra đăng nhập
    const navigate = useNavigate();

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLogged(false); // Cập nhật trạng thái đăng nhập
        toast.success("Đăng xuất thành công!"); // Hiển thị thông báo
        navigate('/admin/welcome'); // Chuyển hướng về trang chủ
        setTimeout(() => {
            window.location.reload(); // Tải lại trang sau 0.5 giây
        }, 500);
    };

    // Fetch thông tin người dùng
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.example.com/v1/api/getEmployeeById/${idUser}`);
                const result = await response.json();
                setUser(result); // Cập nhật state với dữ liệu API
            } catch (err) {
                console.error(err);
            }
        };

        if (idUser) {
            fetchData();
        }
    }, [idUser]);

    return (
        <div className="header-area pt-0">
            <div className="row align-items-center pt-4">
                <div className="col-md-6 col-sm-8 clearfix">
                    <div className="page-title-area">
                        <div className="row align-items-center">
                            {/* Phần tiêu đề (nếu có) */}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-4 clearfix">
                    <ul className="notification-area d-flex justify-content-end align-items-center">
                        {/* Nút full view */}
                        <li id="full-view">
                            <i className="fa-solid fa-maximize"></i>
                        </li>
                        <li id="full-view-exit">
                            <i className="fa-solid fa-minimize"></i>
                        </li>

                        {/* Thông báo */}
                        <li className="dropdown">
                            <i className="fa-solid fa-bell">
                                <span>2</span>
                            </i>
                            <div className="dropdown-menu bell-notify-box notify-box">
                                <span className="notify-title">
                                    You have 3 new notifications <a href="#">view all</a>
                                </span>
                                <div className="nofity-list">
                                    <a href="#" className="notify-item">
                                        <div className="notify-thumb">
                                            <i className="ti-key btn-danger"></i>
                                        </div>
                                        <div className="notify-text">
                                            <p>You have Changed Your Password</p>
                                            <span>Just Now</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>

                        {/* Phần người dùng */}
                        <li >
                            {isLogged ? (
                                <>
                                    <div >
                                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                                            Đăng xuất
                                        </a>
                                    </div>
                                </>
                            ) : (
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
                                   
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}