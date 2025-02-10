import React, { use, useState } from "react";
export default function SearchCategory({onFilter, onSearch}) {
    const [searchTerm, setSearchTerm] = useState(""); // State để lưu từ khóa tìm kiếm
   
    // Xử lý khi người dùng nhập từ khóa
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Cập nhật state
        onSearch(value); // Gọi hàm callback từ component cha
    };
    return (
        <>
        <div class="row mb-3">
            <div class="col-md-6">
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-search"></i>
                    </span>
                    <input type="text" class="form-control" placeholder="Tìm kiếm bài viết"
                        value={searchTerm}
                        onChange={handleSearchChange} // Xử lý sự kiện onChange
                    />
                </div>
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
)}