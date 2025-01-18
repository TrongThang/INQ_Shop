import React from "react";
import * as XLSX from "xlsx";

const SearchInfoWeb = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, handleExport }) => {
    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h5>Danh sách đánh giá thiết bị</h5>
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
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3 mt-2">
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="active">Hiển thị</option>
                        <option value="inactive">Ẩn</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchInfoWeb;