import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateOrderForm = () => {
    const orderId = useParams();
    console.log("orderID",orderId)
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
        id: "",
        creator: "",
        customerName: "",
        platformOrder: "",
        status: "",
        order_device: [],
        totalPrice: 0,
    });

    const fetchOrderData = async () => {
        try {
            console.log(orderId.id)
            const response = await fetch(`http://localhost:8081/api/order/admin/${orderId.id}`);
            const result = await response.json();
            console.log("data result",response)
            if (response.ok) {
                setOrderData(result.data);
            } else {
                console.error("Error fetching order data:", result.message);
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
        finally {
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("thay đổi giá trị")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/api/order/admin/${orderId.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });
            console.log(orderData)
            const result = await response.json();
            if (response.ok) {
                await Swal.fire({
                    title: 'Thành công!',
                    text: 'Cập nhật đơn hàng thành công!',
                    icon: 'success',
                  });
                navigate('/admin/order');
                console.log("Order updated successfully:", result);
            } else {
                await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra khi cập nhật đơn hàng!',
                    icon: 'error',
                  });
                console.error("Error updating order:", result.message);
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    useEffect(() => {
        fetchOrderData();
    }, []);

    return (
        <div className="main-content-inner">
            <div className="my-3">
                <a href="#" onClick={() => navigate('/admin/order')}>
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Thông tin chi tiết Đơn hàng</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Mã đơn hàng:</label>
                            <input type="text" className="form-control" value={orderData.id} readOnly />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Nhân viên xác nhận:</label>
                            <input type="text" className="form-control" value={`${(orderData.employee?.surname) ? orderData.employee?.surname : ''} ${(orderData.employee?.lastname) ? orderData.employee?.lastname : ''}`} readOnly />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Ngày đặt:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={orderData.accept_at ? (orderData.accept_at).split("T")[0] : ""}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Địa chỉ nhận hàng:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={orderData.address ? orderData.address : ''}
                                readOnly
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Số điện thoại:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={orderData.phone ? orderData.phone : ''}
                                readOnly
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Ghi chú:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={orderData.note ? orderData.note : ''}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Tên người nhận:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="customerName"
                                value={orderData.nameRecipient ? orderData.nameRecipient : ''}
                                readOnly
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Nền tảng đặt hàng:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="platformOrder"
                                value={orderData.platformOrder ? orderData.platformOrder : ''}
                                readOnly
                            ></input>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Trạng thái:</label>
                            <select
                                className="form-select"
                                name="status"
                                value={orderData.status}
                                onChange={handleChange}
                            >
                                <option value="1">Chờ xác nhận</option>
                                <option value="2">Chuẩn bị hàng</option>
                                <option value="3">Chờ giao hàng</option>
                                <option value="4">Hoàn thành</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5>Danh sách sản phẩm</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Sản phẩm</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.order_device.map((device, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={`/img/device/${device.device.image}`} alt={device.device.name} style={{ width: "70px", height: "70px" }} />
                                        </td>
                                        <td>
                                            {device.device.name} <strong>x {device.stock}</strong>
                                        </td>
                                        <td>{Number(device.amount).toLocaleString()}đ</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">
                                        <strong>Tổng đơn hàng: </strong>
                                    </td>
                                    <td>
                                        <strong>{Number(orderData.totalAmount).toLocaleString()}đ</strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateOrderForm;