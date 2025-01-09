import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchHeader() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const hanldeSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);                 
        }

    }
    return (
        <form className="d-flex ms-lg-4 me-5" onSubmit={ hanldeSearch }>
            <input 
                className="form-control me-2 " 
                type="search" 
                placeholder="Tìm kiếm..." 
                aria-label="Search"
                onChange={(e) => handleInputChange(e)}
                value={keyword}
            />
            <button
                to={`/search?keyword=${encodeURIComponent(keyword)}`}
                className="btn btn-outline-primary"
                type="submit"
            >
                <i className="fa-solid fa-search"></i>
            </button>
        </form>
    )
}