import React, { useState } from "react";
import * as XLSX from "xlsx";

const SearchContact = ({ onExport, onSearchChange, onStatusFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const handleExport = () => {
        onExport();
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearchChange(value); // Gọi hàm onSearchChange để cập nhật giá trị tìm kiếm ở component cha
    };

    const handleStatusFilterChange = (event) => {
        const value = event.target.value;
        setStatusFilter(value);
        onStatusFilterChange(value); // Gọi hàm onStatusFilterChange để cập nhật giá trị lọc trạng thái ở component cha
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h5>Danh sách liên hệ</h5>
                <div>
                    <button className="btn btn-success" onClick={handleExport}>
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
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm liên hệ"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="0">Huỷ liên hệ</option>
                        <option value="1">Đang xem xét</option>
                        <option value="2">Gửi hợp đồng</option>
                        <option value="3">Đã ký hợp đồng</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchContact;