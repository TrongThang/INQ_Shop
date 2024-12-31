import React from "react";

const OrdersTable = ({ data }) => {
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th width="40">
                                <input type="checkbox" />
                            </th>
                            <th>Mã đơn hàng</th>
                            <th>Tên Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Phương thức Thanh toán</th>
                            <th>Số điện thoại</th>
                            <th>Ngày đặt</th>
                            <th>Địa chỉ</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{item.orderId}</td>
                                <td>{item.customerName}</td>
                                <td>{item.totalAmount}</td>
                                <td>{item.paymentMethod}</td>
                                <td>{item.phone}</td>
                                <td>{item.orderDate}</td>
                                <td>{item.address}</td>
                                <td>
                                    <span className={`badge ${item.status === "Đã giao" ? "bg-success" : item.status === "Đang vận chuyển" ? "bg-primary" : item.status === "Huỷ đơn hàng" ? "bg-danger" : item.status === "Chờ xác nhận" ? "bg-secondary" : "bg-warning"}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bi bi-pencil"></i> Sửa
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item text-danger" href="#">
                                                    <i className="bi bi-trash"></i> Xóa
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

export default OrdersTable;