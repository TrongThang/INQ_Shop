import React, { useEffect, useState } from "react";

import SearchDevice from "../../../component/admin/Mana_product/searchProduct";
import DeviceList from "../../../component/admin/Mana_product/productList";
import axios from "axios";
import Swal from "sweetalert2";

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
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Xác nhận xóa thiết bị này?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
          });
        if (id) {
          if (result.isConfirmed) {
            try {
              // Gửi yêu cầu hủy đơn hàng
              await axios.put("http://localhost:8081/api/device/admin", { idDevice: id, status: status });

              await Swal.fire({
                title: 'Thành công!',
                text: 'Xóa thiết bị thành công!',
                icon: 'success',
              });
              //Lấy lại dữ liệu khi xóa thiết bị(vì cập nhật trạng thái nên không re-render)
              filterDevice();
            } catch (error) {
              console.error("Lỗi khi xóa thiết bị:", error);
              await Swal.fire({
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra khi xóa thiết bị!',
                icon: 'error',
              });
            }
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
        <>
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
        
        </>
    );
};

export default ManaProduct;