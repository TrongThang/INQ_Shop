import { useNavigate } from "react-router-dom";

function HeaderBlog({ onExport, onAdd, onSearchChange, onStatusFilterChange }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h5>Danh sách bài viết</h5>
                <div>
                    <button className="btn btn-primary me-2" onClick={onAdd}>
                        <i className="bi bi-plus"></i> Thêm
                    </button>
                    <button className="btn btn-success" onClick={onExport}>
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
                            placeholder="Tìm kiếm bài viết"
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <select className="form-select status" onChange={(e) => onStatusFilterChange(e.target.value)}>
                        <option value="all">Tất cả trạng thái</option>
                        <option value="1">Hiển thị</option>
                        <option value="0">Ẩn</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default HeaderBlog;