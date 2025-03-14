import { useState } from "react";
import ModalAddEditAttribute from "./modal_add_edit_attribute";

export default function SpecificationsAdmin({ attribute, index, onEditAttribute }) {
    const [editingAttribute, setEditingAttribute] = useState(null); // Lưu trữ thuộc tính đang chỉnh sửa
    console.log('Thuộc tính:', attribute)
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
                        <button
                            className="btn btn-success"
                        >
                            <i class="fa-solid fa-plus"></i>
                        </button>
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
            {editingAttribute && <ModalAddEditAttribute />}
        </>
    );
}