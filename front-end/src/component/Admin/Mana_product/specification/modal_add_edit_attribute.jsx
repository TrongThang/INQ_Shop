export default function ModalAddEditAttribute({editingAttribute, setEditingAttribute, handleSaveEdit}) {
    return (
        <div className="modal fade" id="editAttributeModal" tabIndex="-1" aria-labelledby="editAttributeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editAttributeModalLabel">Chỉnh sửa thuộc tính</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="attributeName" className="form-label">Tên thuộc tính:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="attributeName"
                                            value={editingAttribute.nameAttribute}
                                            onChange={(e) =>
                                                setEditingAttribute({
                                                    ...editingAttribute,
                                                    nameAttribute: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="attributeValue" className="form-label">Giá trị:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="attributeValue"
                                            value={editingAttribute.value}
                                            onChange={(e) =>
                                                setEditingAttribute({
                                                    ...editingAttribute,
                                                    value: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleSaveEdit(editingAttribute)}
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    )
}