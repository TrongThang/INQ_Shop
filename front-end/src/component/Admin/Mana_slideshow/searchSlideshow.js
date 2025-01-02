const SearchSlideshow= () => {
    return (
        <div className="row mb-3">
            <div className="col-md-6">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" />
                </div>
            </div>
            <div className="col-md-2">
                <select className="form-select">
                    <option>Trạng thái</option>
                    <option>Hiển thị</option>
                    <option>Ẩn</option>
                    
                </select>
            </div>
            <div className="col-md-3">
                <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#filterProductModal">
                    <i className="bi bi-funnel"></i> Lọc slideshow
                </button>
            </div>

            {/* Modal */}
            <div className="modal fade" id="filterProductModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filterModalLabel">Bộ Lọc SlideShow</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="filterName" className="form-label">Tiêu đề Slideshow</label>
                                    <input type="text" className="form-control" id="filterName" placeholder="Tiêu đề Slideshow" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="filterStatus" className="form-label">Trạng thái</label>
                                    <select className="form-select" id="filterStatus">
                                        <option value="">Tất cả</option>
                                        <option value="active">Hiển thị</option>
                                        <option value="inactive">Ẩn</option>
                                        
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="filterDate" className="form-label">Ngày tạo</label>
                                    <input type="date" className="form-control" id="filterDate" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-primary">Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSlideshow;