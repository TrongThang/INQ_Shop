import React from "react";

const SlideshowForm = ({ data }) => {
    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin Chi tiết Slideshow</h5>
            <form>
                <div className="row">
                    {/* ID Slideshow */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="id" className="form-label">ID Slideshow:</label>
                        <input type="text" id="id" className="form-control" value={data.id} readOnly />
                    </div>
                    {/* ID Employee */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="idEmployee" className="form-label">ID Nhân viên:</label>
                        <input type="text" id="idEmployee" className="form-control" value={data.idEmployee} />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="textButton" className="form-label">Nút bấm:</label>
                    <input type="text" id="textButton" className="form-control" value={data.textButton} />
                </div>

                <div className="mb-3">
                    <label htmlFor="link" className="form-label">Liên kết:</label>
                    <input type="text" id="link" className="form-control" value={data.link} />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Hình ảnh:</label>
                    <div className="upload-area">
                        <i className="bi bi-cloud-arrow-up upload-icon"></i>
                        <div>Tải ảnh lên</div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Trạng thái:</label>
                    <select id="status" className="form-select">
                        <option value="1" selected={data.status === 1}>Hoạt động</option>
                        <option value="0" selected={data.status === 0}>Ngừng hoạt động</option>
                    </select>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-info text-white px-4">Lưu</button>
                </div>
            </form>
        </div>
    );
};

export default SlideshowForm;
