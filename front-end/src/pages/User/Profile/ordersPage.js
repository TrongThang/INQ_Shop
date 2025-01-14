import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProfileSidebar from "../../../component/user/Profile/navCustomer/profileSidebar";
import OrderItems from "../../../component/user/Profile/orderItems";

function OrdersPage() {
    // State để lưu tab được chọn
    const [activeTab, setActiveTab] = useState("all");
    const [idCustomer, setIdCustomer] = useState(null);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        document.title = "Đơn hàng | INQ";
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token); // Decode the JWT token
            setIdCustomer(decoded.idPerson); // Set idCustomer from decoded token
        }
    }, []);

    useEffect(() => {
        if (idCustomer) {
            const fetchOrders = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/api/order/${idCustomer}`);
                    const allOrders = response.data.data;

                    if (activeTab === "all") {
                        setOrder(allOrders);
                    } else if (activeTab === "pending") {
                        setOrder(allOrders.filter(item => item.status === 4));
                    } else if (activeTab === "preparing") {
                        setOrder(allOrders.filter(item => item.status === 3));
                    } else if (activeTab === "shipping") {
                        setOrder(allOrders.filter(item => item.status === 2));
                    } else if (activeTab === "completed") {
                        setOrder(allOrders.filter(item => item.status === 1));
                    } else {
                        setOrder(allOrders.filter(item => item.status === 0));
                    }
                } catch (error) {
                    console.error("Lỗi khi tải đơn hàng:", error);
                }
            };

            fetchOrders();
        }
    }, [activeTab, idCustomer]);



    // Hàm xử lý khi nhấn vào một tab
    const handleTabClick = (tab) => {
        setActiveTab(tab); // Cập nhật trạng thái
    };

    return (
        <div className="container-fluid my-4">
            <div className="row ms-4 ">
                <ProfileSidebar />
                <div className="col-md-9 col-xl-9">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Đơn mua của tôi</h2>
                            <ul className="nav nav-pills mb-3">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === "all" ? "active" : ""
                                            }`}
                                        href="#"
                                        onClick={() => handleTabClick("all")}
                                    >
                                        Tất cả
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === "pending" ? "active" : ""
                                            }`}
                                        href="#"
                                        onClick={() => handleTabClick("pending")}
                                    >
                                        Chờ xác nhận
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === "preparing" ? "active" : ""
                                            }`}
                                        href="#"
                                        onClick={() => handleTabClick("preparing")}
                                    >
                                        Chuẩn bị hàng
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === "shipping" ? "active" : ""
                                            }`}
                                        href="#"
                                        onClick={() => handleTabClick("shipping")}
                                    >
                                        Chờ giao hàng
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === "completed" ? "active" : ""
                                            }`}
                                        href="#"
                                        onClick={() => handleTabClick("completed")}
                                    >
                                        Hoàn thành
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === "cancelled" ? "active" : ""
                                            }`}
                                        href="#"
                                        onClick={() => handleTabClick("cancelled")}
                                    >
                                        Đã huỷ
                                    </a>
                                </li>
                            </ul>
                            <OrderItems orders={order} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersPage;
