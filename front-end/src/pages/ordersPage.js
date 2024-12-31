
import ProfileSidebar from "../component/ProfileCustomer/navCustomer/profileSidebar";
import OrderItems from "../component/ProfileCustomer/orderItems";

function OrdersPage() {
    return (
        <div className="container-fluid my-4">
            <div class="row ms-4 ">
                <ProfileSidebar />
                <div className="col-md-6 col-xl-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Đơn mua của tôi</h2>
                            <ul className="nav nav-pills mb-3">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                        Tất cả
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Chờ thanh toán
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Vận chuyển
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Chờ giao hàng
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Hoàn thành
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Đã huỷ
                                    </a>
                                </li>
                            </ul>
                            <OrderItems />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrdersPage;