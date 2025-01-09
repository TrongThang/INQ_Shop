export default function AddOrEditCategory({ data }) {

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin Danh mục</h5>
            <form>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label for="id" className="form-label">Mã danh mục:</label>
                                <input type="text" id="id" className="form-control" value={data.id} readonly />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label for="created-date" className="form-label">Ngày tạo:</label>
                                    <input type="date" id="created-date" className="form-control" value={data.created_at} readonly />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="updated-date" className="form-label">Ngày cập nhật:</label>
                                    <input type="date" id="updated-date" className="form-control" value={data.updated_at} />
                                </div>
                            </div>
                    
                            <div className="mb-3">
                                <label for="name" className="form-label">Tên danh mục:</label>
                                <input type="text" id="name" className="form-control" value={data.name} />
                            </div>
                            <div className="mb-3">
                                <label for="status" className="form-label">Mô tả:</label>
                                <input type="text" id="name" className="form-control" value={data.description} />
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label for="group" className="form-label">Danh mục cha:</label>
                                    <select id="group" className="form-select">
                                        <option value="technical">Đèn thông minh</option>
                                    </select>
                                </div>
                                <div className="mb-3 col-6">
                                    <label for="group" className="form-label">Trạng thái:</label>
                                    <select id="group" className="form-select">
                                        <option value="technical">Hoạt động</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 col-xl-4">
                        <div className="mb-3">
                            <label className="form-label">Hình ảnh:</label>
                            <div className="upload-area">
                                <i className="bi bi-cloud-arrow-up upload-icon"></i>
                                <div>Upload ảnh</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary text-white px-4">Lưu</button>
                </div>
            </form>
        </div>
    )
}