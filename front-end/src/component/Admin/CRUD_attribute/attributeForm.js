import React from "react";

const AttributeForm = ({ data }) => {
    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin Chi tiết thuộc tính</h5>
            <form>
                <div className="row">
                    {/* ID Thuộc tính */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="id" className="form-label">ID Thuộc tính:</label>
                        <input
                            type="text"
                            id="id"
                            className="form-control"
                            value={data.id}
                            readOnly
                        />
                    </div>
                    {/* Người tạo */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="creator" className="form-label">Người tạo:</label>
                        <input
                            type="text"
                            id="creator"
                            className="form-control"
                            value={data.creator}
                            readOnly
                        />
                    </div>
                </div>

                <div className="row">
                    {/* Ngày tạo */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="created-date" className="form-label">Ngày tạo:</label>
                        <input
                            type="date"
                            id="created-date"
                            className="form-control"
                            value={data.createdDate}
                            readOnly
                        />
                    </div>
                    {/* Ngày sửa */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="updated-date" className="form-label">Ngày sửa:</label>
                        <input
                            type="date"
                            id="updated-date"
                            className="form-control"
                            value={data.updatedDate}
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    {/* Image upload */}
                    <div className="mb-3">
                        <label className="form-label">Hình ảnh:</label>
                        <div className="upload-area">
                            <i className="bi bi-cloud-arrow-up upload-icon"></i>
                            <div>Upload ảnh</div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên thuộc tính:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={data.name}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="group" className="form-label">Nhóm thuộc tính:</label>
                    <select
                        id="group"
                        className="form-select"
                        value={data.group}
                    >
                        <option value="technical">Tính năng kỹ thuật</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Danh mục thuộc tính:</label>
                    <select
                        id="category"
                        className="form-select"
                        value={data.category}
                    >
                        <option value="camera">Camera an ninh</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="data-type" className="form-label">Kiểu dữ liệu:</label>
                    <select
                        id="data-type"
                        className="form-select"
                        value={data.dataType}
                    >
                        <option value="select">Select</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="required" className="form-label">Bắt buộc nhập:</label>
                    <select
                        id="required"
                        className="form-select"
                        value={data.required}
                    >
                        <option value="yes">Có</option>
                        <option value="no">Không</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Trạng thái:</label>
                    <select
                        id="status"
                        className="form-select"
                        value={data.status}
                    >
                        <option value="Trạng thái">Trạng thái</option>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                        <option value="Đang cập nhật">Đang cập nhật</option>
                    </select>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-info text-white px-4">Lưu</button>
                </div>
            </form>
        </div>
    );
};

export default AttributeForm;
