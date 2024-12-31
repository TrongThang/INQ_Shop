
function FilterBlog() {
    const applyFilters = () => {
        // Hàm này có thể xử lý dữ liệu lọc
        console.log('Filters applied');
    };

    return (
        <div className="col-md-3">
            <button
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
            >
                <i className="bi bi-funnel"></i> Lọc bài viết
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="filterModal"
                tabIndex="-1"
                aria-labelledby="filterModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filterModalLabel">Bộ Lọc Bài Viết</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form id="filterForm">
                                <div className="mb-3">
                                    <label htmlFor="filterAuthor" className="form-label">Tác giả</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="filterAuthor"
                                        placeholder="Tên tác giả"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="filterStatus" className="form-label">Trạng thái</label>
                                    <select className="form-select" id="filterStatus">
                                        <option value="">Tất cả</option>
                                        <option value="active">Hiển thị</option>
                                        <option value="hidden">Ẩn</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="filterDate" className="form-label">Ngày đăng</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="filterDate"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={applyFilters}
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterBlog;
