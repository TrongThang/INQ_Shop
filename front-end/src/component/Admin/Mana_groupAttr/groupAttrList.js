import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const GroupAttrList = ({ GroupAttrs ,onEdit,onDelete}) => {
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
                            <th>Tên nhóm thuộc tính</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GroupAttrs.map((item, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{item.id}</td>
                                <td>{item.nameAttributeGroup}</td>
                                <td>
                                <span className={`badge ${item.status === 1 ? "bg-success" : item.status === 0 ? "bg-danger" : "bg-warning text-dark"}`}>
                                        {item.status === 1 ? "Hoạt động" : "Ngừng hoạt động"}
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
                                            <li onClick={() => onDelete(item.id)}>
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

export default GroupAttrList;
