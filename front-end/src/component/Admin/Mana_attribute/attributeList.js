import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const AttributeList = ({ attributes, onEdit }) => {
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
                            <th>Thao tác</th>
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
                                            <li>
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
