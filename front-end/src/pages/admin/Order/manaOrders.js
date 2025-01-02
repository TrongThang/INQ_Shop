import React, { useState } from "react";
import Header from "../../component/Shared/headerManage";
import SearchFilter from "../../component/admin/Mana_orders/searchOrders";
import Table from "../../component/admin/Mana_orders/ordersList";

const ManaOrders = () => {
    const [data, setData] = useState([
        {
            orderId: "DH001",
            customerName: "Trọng Thắng",
            totalAmount: "1.000.000đ",
            paymentMethod: "COD",
            phone: "0387000123",
            orderDate: "20/11/2023",
            address: "Đt743, Dĩ An, Bình Dương",
            status: "Đang vận chuyển",
        },
        {
            orderId: "DH002",
            customerName: "Nguyễn Anh Quân",
            totalAmount: "500.000đ",
            paymentMethod: "Chuyển khoản",
            phone: "0123456789",
            orderDate: "18/11/2023",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            status: "Đã giao",
        },
    ]);

    const handleAdd = () => {
        alert("Thêm đơn hàng!");
    };

    const handleExport = () => {
        alert("Xuất file!");
    };

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <Header onAdd={handleAdd} onExport={handleExport} />
                <SearchFilter />
                <Table data={data} />
            </div>
        </div>
    );
};

export default ManaOrders;