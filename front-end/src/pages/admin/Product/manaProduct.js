import React, { useState, useEffect } from "react";
import SearchDevice from "../../../component/admin/Mana_product/searchProduct";
import DeviceList from "../../../component/admin/Mana_product/productList";
import axios from "axios";

const ManaProduct = () => {
    const [devices, setDevices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState(6); // Mặc định là "Tất cả"

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Chuẩn hóa chuỗi Unicode thành dạng tổ hợp
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
            .replace(/đ/g, "d") // Thay 'đ' thành 'd'
            .replace(/Đ/g, "D") // Thay 'Đ' thành 'D'
            .replace(/[^\w\s]/gi, ""); // Loại bỏ các ký tự đặc biệt (nếu cần)
    };

    const CannelDeviceClick = async (id, status) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa thiết bị này?");
        if (id) {
          if (isConfirmed) {
            try {
              // Gửi yêu cầu hủy đơn hàng
              await axios.put("http://localhost:8081/api/device/admin", { idDevice: id, status: status });

              alert("Xóa thiết bị thành công!");
              filterDevice();
            } catch (error) {
              console.error("Lỗi khi xóa thiết bị:", error);
              alert("Xóa thiết bị thất bại!");
            }
          } else {
            alert("Hủy hành động xóa đơn hàng!");
          }
        }
      };

    const filterDevice = async () => {
        try {
            const response = await axios(`http://localhost:8081/api/device/admin`);
            const result = response.data.data;
            console.log("result: ", response);
            await setDevices(result);

            if (response.statusText) {
                const filteredDevices = result.filter(device => {
                    //Tìm kiếm theo từ khóa
                    const matchesSearchTerm = removeVietnameseTones(device.name).toLowerCase().includes(removeVietnameseTones(searchTerm).toLowerCase())
                        || removeVietnameseTones(device.description).toLowerCase().includes(removeVietnameseTones(searchTerm).toLowerCase())
                        || removeVietnameseTones(device.descriptionNormal).toLowerCase().includes(removeVietnameseTones(searchTerm).toLowerCase())
                        || removeVietnameseTones(device.sellingPrice).toLowerCase().includes(removeVietnameseTones(searchTerm).toLowerCase());
                    //Tìm kiếm theo lọc trạng thái
                    const matchesStatus = Number(filterStatus) === 6 || device.status === Number(filterStatus);
                    return matchesSearchTerm && matchesStatus;
                });
                setDevices(filteredDevices);
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
        filterDevice();
    }, [searchTerm, filterStatus]);

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <SearchDevice
                    devices={devices}
                    onFilter={handleFilterChange}
                    onSearch={handleSearchChange}
                />
                <DeviceList devices={devices} onDelete={CannelDeviceClick}/>
            </div>
        </div>
    );
};

export default ManaProduct;