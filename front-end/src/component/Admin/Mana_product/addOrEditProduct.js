import AreaUploadImage from '../../Shared/areaUploadImage';
import DropdownMenuProduct from './dropdownMenuProduct';

export default function AddOrEditProduct() {
    return (
    <>
        <div className="container-fluid mt-3">
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between align-items-center">
                                Thông tin sản phẩm
                                <div>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </div>
                            </h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="mb-3">
                                            <label for="productName" className="form-label">Tên sản phẩm:</label>
                                            <input type="text" className="form-control" id="productName" value="Đèn thông minh" />
                                        </div>
                                        <div className="mb-3">
                                            <label for="category" className="form-label">Danh mục:</label>
                                                <div className="input-group">
                                                <input type="text" className="form-control bg-secondary text-light" id="categoryName" value="Đèn thông minh" />
                                                <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#editCategoryModal">Sửa</button>
                                            </div>
                                        </div>
                                    </div>    
                                    <div className='row col-12'>
                                        <div className="mb-3 col-6">
                                            <label for="costPrice" className="form-label">Giá vốn:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="costPrice"
                                                value={Number(5000000).toLocaleString() + ' VNĐ'}
                                            /> 
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label for="sellingPrice" className="form-label">Giá bán:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="sellingPrice"
                                                    value={Number(15000000).toLocaleString() + ' VNĐ'}
                                                />
                                        </div>
                                    </div>
                                
                                    <div className='row col-12'>
                                        <div className="mb-3 col-6">
                                            <label for="soldQuantity" className="form-label">Số lượng đã bán:</label>
                                            <input type="text" className="form-control" id="soldQuantity" value="500" />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label for="stockQuantity" className="form-label">Số lượng tồn kho:</label>
                                            <input type="text" className="form-control" id="stockQuantity" value="50" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="description" className="form-label">Mô tả:</label>
                                        <textarea className="form-control" id="description" rows="4">Đèn thông minh là loại đèn hiện đại có khả năng kết nối với Internet, cho phép người dùng điều khiển từ xa qua ứng dụng hoặc bằng giọng nói</textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label for="status" className="form-label">Trạng thái:</label>
                                        <select className="form-select" id="status">
                                            <option selected>Hoạt động</option>
                                            <option>Ngừng hoạt động</option>
                                        </select>
                                    </div>
                                </div>
                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <h6>Thông số kỹ thuật</h6>
                                            <DropdownMenuProduct />
                                        </div>
                                        <div className="mb-3">
                                            <AreaUploadImage image='' />
                                        </div>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-3">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Lịch sử cập nhật</h5>
                            <p className="text-muted">Không có dữ liệu cập nhật.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Modal thêm thuộc tính --> */}
        <div className="modal fade" id="addAttributeModal" tabindex="-1" aria-labelledby="addAttributeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addAttributeModalLabel">Thêm Thuộc Tính</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="attributeGroup" className="form-label">Nhóm thuộc tính:</label>
                                <input type="text" className="form-control" id="attributeGroup" placeholder="Chọn nhóm thuộc tính" />
                            </div>
                            <div className="mb-3">
                                <label for="attributeName" className="form-label">Tên thuộc tính:</label>
                                <input type="text" className="form-control" id="attributeName" placeholder="Chọn thuộc tính" />
                            </div>
                            <div className="mb-3">
                                <label for="attributeValue" className="form-label">Giá trị:</label>
                                <input type="text" className="form-control" id="attributeValue" placeholder="Nhập giá trị" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" className="btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Modal sửa thuộc tính --> */}
        <div className="modal fade" id="editAttributeModal" tabindex="-1" aria-labelledby="editAttributeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editAttributeModalLabel">Sửa Thuộc Tính</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="editAttributeName" className="form-label">Tên thuộc tính:</label>
                                <input type="text" className="form-control" id="editAttributeName" value="Công suất" /> 
                            </div>
                            <div className="mb-3">
                                <label for="editAttributeValue" className="form-label">Giá trị:</label>
                                <input type="text" className="form-control" id="editAttributeValue" value="7W - 15W" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" className="btn btn-primary">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Modal sửa danh mục --> */}
        <div className="modal fade" id="editCategoryModal" tabindex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editCategoryModalLabel">Sửa Danh Mục</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="currentCategory" className="form-label">Danh mục hiện tại:</label>
                                <input type="text" className="form-control bg-secondary text-light" id="currentCategory" value="Đèn" readonly /> 
                            </div>
                            <div className="mb-3">
                                <label for="currentCategory" className="form-label">Danh mục mới:</label>
                                    
                                <select className="form-select" id="status">
                                    <option selected>Đèn điện</option>
                                    <option>Đèn mặt trời</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" className="btn btn-primary">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}