import { useEffect, useState } from "react";

export default function HeaderAdmin({ idUserProps }) {
    const [user, setUser] = useState(null);
    const [idUser, setIdUser] = useState(idUserProps);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/v1/api/getEmployeeById/id');
                const result = await response.json();
                setUser(result); // Cập nhật state với dữ liệu API
            } catch (err) {
                console.error(err);
            } finally {
                
            }
        };

        if (idUser === false) {
            fetchData();
        }
    }, [idUser]);
    return (
        <div className="header-area pt-0">
            <div className="row align-items-center">
                <div className="col-md-6 col-sm-8 clearfix">
                    <div className="page-title-area">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <div className="breadcrumbs-area clearfix">
                                    <h4 className="page-title pull-left">Dashboard</h4>
                                    <ul className="breadcrumbs pull-left">
                                        <li><a href="index.html">Trang chủ</a></li>
                                        <li><span>Dashboard</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-4 clearfix">
                    <ul className="notification-area d-flex justify-content-end align-items-center">
                        <li id="full-view">
                            <i class="fa-solid fa-maximize"></i>    
                        </li>
                        <li id="full-view-exit">
                            <i class="fa-solid fa-minimize"></i>
                        </li>
                        <li className="dropdown">
                            <i class="fa-solid fa-bell">
                                <span>2</span>
                            </i>
                            <div className="dropdown-menu bell-notify-box notify-box">
                                <span className="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                                <div className="nofity-list">
                                    <a href="#" className="notify-item">
                                        <div className="notify-thumb"><i className="ti-key btn-danger"></i></div>
                                        <div className="notify-text">
                                            <p>You have Changed Your Password</p>
                                            <span>Just Now</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="user-profile d-flex align-items-center">
                                <img className="avatar user-thumb" src="../resource/assets/images/author/avatar.png" alt="avatar" />
                                <h4 className="user-name dropdown-toggle" data-bs-toggle="dropdown">Phan Trọng Thắng <i className="fa fa-angle-down"></i></h4>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Hồ sơ</a>
                                    <a className="dropdown-item" href="#">Đăng xuất</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}