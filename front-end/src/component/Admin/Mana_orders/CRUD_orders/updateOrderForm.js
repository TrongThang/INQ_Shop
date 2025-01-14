import React, { useState, useEffect } from "react";

const UpdateOrderForm = ({ onback, orderId }) => {
    const [orderData, setOrderData] = useState({
        id: "",
        creator: "",
        customerName: "",
        platform: "",
        status: "",
        order_device: [],
        totalPrice: 0,
    });
    const [platforms] = useState(["Website", "App", "Cửa hàng"]);
    const [statuses] = useState(["Hoạt động", "Ngừng hoạt động", "Đang cập nhật"]);

    const fetchOrderData = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/order/admin/${orderId}`);
            const result = await response.json();
            if (response.ok) {
                setOrderData(result.data);
            } else {
                console.error("Error fetching order data:", result.message);
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
        finally{
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/api/order/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });
            const result = await response.json();
            if (response.ok) {
                console.log("Order updated successfully:", result);
            } else {
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
                <a href="#" onClick={onback}>
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Thông tin chi tiết Đơn hàng</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Mã đơn hàng:</label>
                            <input type="text" className="form-control" value={orderData.id} readOnly />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nhân viên xác nhận:</label>
                            <input type="text" className="form-control" value={orderData.idEmployee} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Ngày đặt:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={new Date(orderData.accept_at)}
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
                                value={orderData.nameRecipient}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Nền tảng đặt hàng:</label>
                            <select
                                className="form-select"
                                name="platform"
                                value={orderData.platformOrder}
                                onChange={handleChange}
                            >
                                {platforms.map((platform, index) => (
                                    <option key={index} value={platform}>
                                        {platform}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Trạng thái:</label>
                            <select
                                className="form-select"
                                name="status"
                                value={orderData.status}
                                onChange={handleChange}
                            >
                                {statuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
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
                                            <img src={`img/device/${device.device.image}`} alt={device.name} style={{width: "70px", height: "70px"}}/>
                                        </td>
                                        <td>
                                            {device.device.name} <strong>x {device.stock}</strong>
                                        </td>
                                        <td>{device.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">
                                        <strong>Tổng đơn hàng: </strong>
                                    </td>
                                    <td>
                                        <strong>{orderData.totalAmount}đ</strong>
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
