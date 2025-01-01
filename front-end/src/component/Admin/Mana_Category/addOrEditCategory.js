export default function AddOrEditCategory({ data }) {

    return (
        <div class="bg-white p-4 rounded shadow-sm">
            <h5 class="mb-4">Thông tin Danh mục</h5>
            <form>
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="id" class="form-label">Mã danh mục:</label>
                                <input type="text" id="id" class="form-control" value={data.id} readonly />
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="created-date" class="form-label">Ngày tạo:</label>
                                    <input type="date" id="created-date" class="form-control" value={data.created_at} readonly />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="updated-date" class="form-label">Ngày cập nhật:</label>
                                    <input type="date" id="updated-date" class="form-control" value={data.updated_at} />
                                </div>
                            </div>
                    
                            <div class="mb-3">
                                <label for="name" class="form-label">Tên danh mục:</label>
                                <input type="text" id="name" class="form-control" value={data.name} />
                            </div>
                            <div class="mb-3">
                                <label for="status" class="form-label">Mô tả:</label>
                                <input type="text" id="name" class="form-control" value={data.description} />
                            </div>
                            <div class="row">
                                <div class="mb-3 col-6">
                                    <label for="group" class="form-label">Danh mục cha:</label>
                                    <select id="group" class="form-select">
                                        <option value="technical">Đèn thông minh</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="group" class="form-label">Trạng thái:</label>
                                    <select id="group" class="form-select">
                                        <option value="technical">Hoạt động</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 col-xl-4">
                        <div class="mb-3">
                            <label class="form-label">Hình ảnh:</label>
                            <div class="upload-area">
                                <i class="bi bi-cloud-arrow-up upload-icon"></i>
                                <div>Upload ảnh</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end mt-4">
                    <button type="submit" class="btn btn-primary text-white px-4">Lưu</button>
                </div>
            </form>
        </div>
    )
}