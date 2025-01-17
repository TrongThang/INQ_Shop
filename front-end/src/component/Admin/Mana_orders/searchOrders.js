import React from "react";
import * as XLSX from "xlsx";

const SearchOrders = ({ orders, onFilter, onSearch }) => {

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(orders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Order");
        XLSX.writeFile(workbook, "order_data.xlsx");
    };
    
    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h5>Danh sách đơn hàng</h5>
                <div>
                    <button className="btn btn-success " onClick={handleExport}>
                        <i className="bi bi-download"></i> Xuất file
                    </button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input type="text" className="form-control search-bar" placeholder="Tìm kiếm đơn hàng" onChange={(e) => onSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-2  mt-2">
                    <select className="form-select" onChange={(e) => onFilter(e.target.value)}>
                        <option value={"5"}>Tất cả</option>
                        <option value={"1"}>Chờ xác nhận</option>
                        <option value={"2"}>Chuẩn bị hàng</option>
                        <option value={"3"}>Chờ giao hàng</option>
                        <option value={"4"}>Hoàn thành</option>
                        <option value={"0"}>Đã hủy</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default SearchOrders;