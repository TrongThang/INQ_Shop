import React from "react";

const GroupAttrForm = ({ data }) => {
    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin Chi tiết Nhóm Thuộc tính</h5>
            <form>
                <div className="row">
                    {/* ID Nhóm thuộc tính */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="id" className="form-label">ID Nhóm thuộc tính:</label>
                        <input
                            type="text"
                            id="id"
                            className="form-control"
                            value={data.id}
                            readOnly
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên nhóm thuộc tính:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={data.name}
                    />
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

export default GroupAttrForm;
