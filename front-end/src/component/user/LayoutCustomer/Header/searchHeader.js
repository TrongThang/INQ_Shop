import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchHeader() {

    const [keyword, setKeyword] = useState('');
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div class="d-flex ms-lg-4 me-5">
            <input 
                class="form-control me-2 " 
                type="search" 
                placeholder="Tìm kiếm..." 
                aria-label="Search"
                onChange={(e) => handleInputChange(e)}
                value={keyword}
            />
            <Link
                to={`/search?keyword=${encodeURIComponent(keyword)}`}
                class="btn btn-outline-primary"
                type="submit"
            >
                <i class="fa-solid fa-search"></i>
            </Link>
        </div>
    )
}