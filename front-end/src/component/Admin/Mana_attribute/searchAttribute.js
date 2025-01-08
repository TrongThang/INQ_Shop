import * as XLSX from "xlsx";

const SearchAttribute = ({ onback, onExport, attributes }) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(attributes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attribute");
    XLSX.writeFile(workbook, "attribute_data.xlsx");
  };
  return (
    <>
            <div className="d-flex justify-content-between mb-3">
              <h5>Danh sách thuộc tính</h5>
              <div>
                <button className="btn btn-primary me-2" onClick={onback}>
                  <i className="bi bi-plus"></i> Thêm
                </button>
                <button className="btn btn-success" onClick={handleExport}>
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
                  placeholder="Tìm kiếm thuộc tính"
                />
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
            {/* Nút Lọc bài viết */}
            <div className="col-md-3">
              <button
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
              >
                <i className="bi bi-funnel"></i> Lọc thuộc tính
              </button>
            </div>

            {/* Modal Bộ Lọc */}
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
                    <h5 className="modal-title" id="filterModalLabel">
                      Bộ Lọc Thuộc tính
                    </h5>
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
                        <label htmlFor="filterAuthor" className="form-label">
                          Tác giả
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="filterAuthor"
                          placeholder="Tên tác giả"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="filterStatus" className="form-label">
                          Trạng thái
                        </label>
                        <select className="form-select" id="filterStatus">
                          <option value="">Tất cả</option>
                          <option value="active">Hiển thị</option>
                          <option value="hidden">Ẩn</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="filterDate" className="form-label">
                          Ngày đăng
                        </label>
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
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
  );
};
  
  export default SearchAttribute;
  