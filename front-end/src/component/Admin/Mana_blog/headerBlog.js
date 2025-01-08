import FilterBlog from "../../../component/admin/Mana_blog/filterBlog";

function HeaderBlog({ onAdd }) {
    return (
        <>
        <div className="d-flex justify-content-between mb-3">
              <h5>Danh sách bài viết</h5>
              <div>
                <button className="btn btn-primary me-2" onClick={onAdd}>
                  <i className="bi bi-plus"></i> Thêm
                </button>
                <button className="btn btn-success">
                  <i className="bi bi-download"></i> Xuất file
                </button>
              </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6">
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-search"></i>
                    </span>
                    <input type="text" class="form-control" placeholder="Tìm kiếm bài viết" />
                </div>
            </div>
            <div class="col-md-2 ">
                <select class="form-select status">
                    <option>Trạng thái</option>
                    <option>Hiển thị</option>
                    <option>Ẩn</option>
                </select>
            </div>
            {/* Bộ lọc */}
            <FilterBlog />
        </div>
        </>
    );
}

export default HeaderBlog;