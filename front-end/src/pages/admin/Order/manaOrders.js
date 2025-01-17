import React, { useState, useEffect } from "react";
import SearchOrders from "../../../component/admin/Mana_orders/searchOrders";
import OrdersList from "../../../component/admin/Mana_orders/ordersList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ManaOrders = () => {
    const [order, setOrder] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState(5); // Mặc định là "Tất cả"
    const navigate = useNavigate();

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Chuẩn hóa chuỗi Unicode thành dạng tổ hợp
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
            .replace(/đ/g, "d") // Thay 'đ' thành 'd'
            .replace(/Đ/g, "D") // Thay 'Đ' thành 'D'
            .replace(/[^\w\s]/gi, ""); // Loại bỏ các ký tự đặc biệt (nếu cần)
    };

    const handleFormUpdateClick = (id) => {
        navigate(`/admin/order/edit/${id}`);
    };

    const CannelOrderClick = async (id, status) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Xác nhận hủy đơn hàng này?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
          });
        if (id) {
          if (result.isConfirmed) {
            try {
              // Gửi yêu cầu hủy đơn hàng
              await axios.put("http://localhost:8081/api/order/admin", { idOrder: id, status: status });
    
              await Swal.fire({
                title: 'Thành công!',
                text: 'Hủy đơn hàng thành công!',
                icon: 'success',
              });
              filterOrder();
            } catch (error) {
              console.error("Lỗi khi hủy đơn hàng:", error);
              await Swal.fire({
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra khi hủy đơn hàng!',
                icon: 'error',
              });
            }
          }
        }
      };

    const filterOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/order`);
            const result = await response.json();

            if (response.ok) {
                const filteredOrders = result.data.filter(order => {
                    //Tìm kiếm theo từ khóa
                    const matchesSearchTerm = (order.note ? removeVietnameseTones(order.note).toLowerCase() : '').includes(removeVietnameseTones(searchTerm).toLowerCase())
                                                || (order.phone ? removeVietnameseTones(order.phone).toLowerCase() : '').includes(removeVietnameseTones(searchTerm).toLowerCase())
                                                || (order.address ? removeVietnameseTones(order.address).toLowerCase() : '').includes(removeVietnameseTones(searchTerm).toLowerCase())
                                                || ((order.customer.surname && order.customer.lastname) ? removeVietnameseTones(`${order.customer.surname} ${order.customer.lastname}`) : '').toLowerCase().includes(removeVietnameseTones(searchTerm).toLowerCase());
                    //Tìm kiếm theo lọc trạng thái
                    const matchesStatus = Number(filterStatus) === 5 || order.status === Number(filterStatus);
                    return matchesSearchTerm && matchesStatus;
                });
                setOrder(filteredOrders);
            } else {
                console.error("Lỗi lấy dữ liệu:", result.message);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
        }
    };

    const handleSearchChange = (keySearch) => {
        setSearchTerm(keySearch.trim()); // Cập nhật từ khóa tìm kiếm
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status); // Cập nhật trạng thái lọc
    };

    useEffect(() => {
        filterOrder();
    }, [searchTerm, filterStatus]);

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <SearchOrders
                    orders={order}
                    onFilter={handleFilterChange}
                    onSearch={handleSearchChange}
                />
                <OrdersList orders={order} onEdit={handleFormUpdateClick} onDelete={CannelOrderClick}/>
            </div>
        </div>
    );
};

export default ManaOrders;
