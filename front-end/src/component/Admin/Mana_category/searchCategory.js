export default function SearchCategory() {
    return (
        <div className="row mb-3">
            <div className="col-md-6">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Tìm kiếm bài viết" />
                </div>
            </div>
            <div className="col-md-2">
                <select className="form-select status">
                    <option selected>Trạng thái</option>
                    <option>Hoạt động</option>
                    <option>Ngừng hoạt động</option>
                    <option>Đang cập nhật</option>
                </select>
            </div>
            <div className="col-md-3">
                <button className="btn btn-outline-secondary" data-bs-toggle="modal"
                    data-bs-target="#filterModal">
                    <i className="bi bi-funnel"></i> Lọc danh mục
                </button>
            </div>

            <div className="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filterModalLabel">Bộ Lọc Danh mục</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="filterForm">
                                <div className="mb-3">
                                    <label for="filterAuthor" className="form-label">Tên danh mục</label>
                                    <input type="text" className="form-control" id="filterAuthor"
                                        placeholder="Tên danh mục" />
                                </div>
                                <div className="mb-3">
                                    <label for="filterStatus" className="form-label">Trạng thái</label>
                                    <select className="form-select" id="filterStatus">
                                        <option value="">Tất cả</option>
                                        <option value="active">Hiển thị</option>
                                        <option value="hidden">Ẩn</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="filterDate" className="form-label">Ngày đăng</label>
                                    <input type="date" className="form-control" id="filterDate" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-primary" onclick="applyFilters()">Áp
                                dụng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}