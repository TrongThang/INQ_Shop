export default function ModalAttributeForDevice() {
    return (
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
    )
};
