import React from "react";

const AttributeList = ({ data }) => {
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
                            <th>Người tạo</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.dataType}</td>
                                <td>{item.required}</td>
                                <td>{item.groupCode}</td>
                                <td>{item.categoryCode}</td>
                                <td>{item.creator}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>
                                <td>
                                    <span className={`badge ${item.status === "Hoạt động" ? "bg-success" : item.status === "Đang cập nhật" ? "bg-warning text-dark" : "bg-danger"}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            <li>
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
