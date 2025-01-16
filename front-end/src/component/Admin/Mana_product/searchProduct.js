import React from "react";
import * as XLSX from "xlsx";

const SearchProduct = ({ devices, onFilter, onSearch }) => {

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(devices);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Device");
        XLSX.writeFile(workbook, "device_data.xlsx");
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h5>Danh sách thiết bị</h5>
                <div>
                    <button className="btn btn-primary me-2" onClick={handleExport}>
                        <i className="bi bi-plus"></i> Thêm
                    </button>
                    <button className="btn btn-success ">
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
                        <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" onChange={(e) => onSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-2">
                    <select className="form-select" onChange={(e) => onFilter(e.target.value)}>
                        <option value={"6"}>Tất cả</option>
                        <option value={"1"}>Đang bán</option>
                        <option value={"2"}>Khuyến mãi</option>
                        <option value={"3"}>Nổi bật</option>
                        <option value={"4"}>Mới</option>
                        <option value={"5"}>Bán chạy</option>
                        <option value={"0"}>Ngừng bán</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default SearchProduct;