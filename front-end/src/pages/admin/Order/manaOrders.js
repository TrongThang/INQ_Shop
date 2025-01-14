import React, { useState, useEffect } from "react";

import SearchOrders from "../../../component/admin/Mana_orders/searchOrders";
import OrdersList from "../../../component/admin/Mana_orders/ordersList";
import UpdateOrder from "../../../component/admin/Mana_orders/CRUD_orders/updateOrderForm";

const ManaOrders = () => {
    const [order, setOrder] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedOrderId, setSelectedOrderId] = useState([]);

    const handleFormUpdateClick = (id) => {
        setFormState(1); // Hiển thị form "Cập nhật"
        setSelectedOrderId(id);
    };

    const handleBackClick = () => {
        setFormState(0); // Quay lại trang chính
    };

    const fetchDataOrder = async () => {
        try {
            // Gửi yêu cầu lấy dữ liệu đến API
            const response = await fetch(`http://localhost:8081/api/order`);
            const result = await response.json();
            setOrder(result.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchDataOrder();
    }, []);

    return (
        <>
            {formState === 1 && <UpdateOrder onback={handleBackClick} orderId={selectedOrderId} />} {/* Form Cập nhật */}

            {formState === 0 && (
                <div className="main-content-inner">
                    <div className="container-fluid py-4">
                        <SearchOrders orders={order} />
                        <OrdersList orders={order} onEdit={handleFormUpdateClick} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ManaOrders;