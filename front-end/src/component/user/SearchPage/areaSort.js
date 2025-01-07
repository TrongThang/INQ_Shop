import { useState } from "react";

export default function AreaSort({ onSortChange }) {
    const [sortOption, setSortOption] = useState('');
    
    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSortOption(selectedSort);
        onSortChange(selectedSort);
    }
    return (
        <div className="mb-3">
            <label htmlFor="sort" className="form-label">Sắp xếp theo:</label>
            <select
                id="sort"
                className="form-select w-25"
                value={sortOption}
                onChange={handleSortChange}
            >
                <option value="">Mặc định</option>
                <option value="sellingPrice_asc">Giá tăng dần</option>
                <option value="sellingPrice_desc">Giá giảm dần</option>
                {/* <option value="name_asc">Tên A-Z</option>
                <option value="name_desc">Tên Z-A</option> */}
            </select>
        </div>
    )
}