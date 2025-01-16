import { useState } from "react";

export default function SpecificationsAdmin({ attribute, index, onEditAttribute }) {
    const [editingAttribute, setEditingAttribute] = useState(null); // Lưu trữ thuộc tính đang chỉnh sửa

    // Hàm xử lý khi người dùng nhấn nút chỉnh sửa
    const handleEditClick = (item) => {
        setEditingAttribute(item); // Lưu thuộc tính đang chỉnh sửa
    };

    // Hàm xử lý khi người dùng lưu thay đổi
    const handleSaveEdit = (updatedAttribute) => {
        onEditAttribute(attribute.idAttributeGroup, updatedAttribute); // Gọi hàm callback từ component cha
        setEditingAttribute(null); // Đóng modal
    };

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${attribute.idAttributeGroup}`}
                        aria-expanded="true"
                        aria-controls={attribute.idAttributeGroup}
                    >
                        {attribute.nameGroup}
                    </button>
                </h2>
                <div
                    id={attribute.idAttributeGroup}
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                >
                    <div className="accordion-body rounded">
                        <ul className="row">
                            {attribute.attributes.map((item, index) => {
                                if (item.status >= 1) {
                                    return (
                                        <li key={index} className="col-6">
                                            <b>{item.nameAttribute}:</b> <span> {item.value} </span>
                                            <button
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditClick(item)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#editAttributeModal"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button className="btn btn-danger me-2">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modal chỉnh sửa thuộc tính */}
            {editingAttribute && (
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
            )}
        </>
    );
}