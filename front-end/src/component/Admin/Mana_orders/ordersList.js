import React from "react";

const OrdersList = ({ orders, onEdit }) => {
    console.log(orders);
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th width="40">
                                <input type="checkbox" />
                            </th>
                            <th>ID</th>
                            <th>ID Khách hàng</th>
                            <th>Tên người nhận</th>
                            <th>Tổng tiền</th>
                            <th>Phương thức Thanh toán</th>
                            <th>Số điện thoại</th>
                            <th>Ghi chú</th>
                            <th>Nền tảng đặt</th>
                            <th>Ngày đặt</th>
                            <th>Địa chỉ</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{item.id}</td>
                                <td>{item.idCustomer}</td>
                                <td>{item.nameRecipient}</td>
                                <td>{item.totalAmount}</td>
                                <td>{item.paymentMethod}</td>
                                <td>{item.phone}</td>
                                <td>{item.note}</td>
                                <td>{item.platformOrder}</td>
                                <td>{new Date(item.accept_at).toLocaleDateString('vi-VN')}</td>
                                <td>{item.address}</td>
                                <td>
                                    <span className={`badge ${item.status === 0 ? "bg-danger" : (item.status == 1 ? "bg-success" : (item.status === 2 ? "bg-warning" : (item.status === 3 ? "bg-secondary" : "bg-info")))}`}>
                                        {item.status === 0 ? "Đã hủy" : item.status === 1 ? "Hoàn thành" : item.status === 2 ? "Chờ giao hàng" : item.status === 3 ? "Chuẩn bị hàng" : "Chờ thanh toán"}
                                    </span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={() => onEdit(item.id)}>
                                                    <i className="bi bi-pencil"></i> Sửa
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item text-danger" href="#">
                                                    <i className="bi bi-trash"></i> Hủy đơn
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersList;