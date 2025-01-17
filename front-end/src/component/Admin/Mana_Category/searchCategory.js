import React, { use, useState } from "react";
export default function SearchCategory({onSearch}) {
    const [searchTerm, setSearchTerm] = useState(""); // State để lưu từ khóa tìm kiếm
   
    // Xử lý khi người dùng nhập từ khóa
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Cập nhật state
        onSearch(value); // Gọi hàm callback từ component cha
    };
    return (
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
)}
