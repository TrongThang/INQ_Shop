import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const AttributeList = ({ attributes, onEdit }) => {
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/api/attribute/updateStatus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: 0 })
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Xóa thành công:", result);
            } else {
                console.error("Lỗi khi xóa:", result);
            }
        } catch (error) {
            console.error("Lỗi trong quá trình xóa:", error);
        }
    }
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th width="40">
                                <input type="checkbox" />
                            </th>
                            <th>ID</th>
                            <th>Tên thuộc tính</th>
                            <th>Kiểu dữ liệu</th>
                            <th>Bắt buộc</th>
                            <th>Mã nhóm thuộc tính</th>
                            <th>Mã danh mục</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map((item, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{item.id}</td>
                                <td>{item.nameAttribute}</td>
                                <td>{item.datatype}</td>
                                <td>{item.required ? "Có" : "Không"}</td>
                                <td>{item.idGroupAttribute}</td>
                                <td>{item.idCategory}</td>
                                <td>{new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>{new Date(item.updated_at).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    <span className={`badge ${item.status === 1 ? "bg-success" : item.status === 0 ? "bg-danger" : "bg-warning text-dark"}`}>
                                        {item.status === 1 ? "Hoạt động" : item.status === 0 ? "Ngừng hoạt động" : "Đang cập nhật"}
                                    </span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            <li onClick={() => onEdit(item.id)}>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bi bi-pencil"></i> Sửa
                                                </a>
                                            </li>
                                            <li onClick={() => handleDelete(item.id)}>
                                                <a className="dropdown-item text-danger" href="#">
                                                    <i className="bi bi-trash"></i> Xóa
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttributeList;
