import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SlideshowList = ({ slideshows,onEdit, onDelete }) => {
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Mã SS</th>
                            <th>Nhân viên tạo</th>
                            <th>Tên nút</th>
                            <th>Hình ảnh</th>
                            <th>Link đích</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>

                            <th>Trạng Thái SS</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slideshows.map((item, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{item.id}</td>
                                <td>{item.idEmployee}</td>
                                <td>{item.textButton}</td>
                                <td><img src={item.image} alt={item.idSlideshow} width="100" /></td>
                                <td>{item.link}</td>
                                <td>{new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>{new Date(item.updated_at).toLocaleDateString('vi-VN')}</td>
                                <td>
                                <span className={`badge ${item.status === 1 ? "bg-success" : item.status === 0 ? "bg-danger" : "bg-warning text-dark"}`}>
                                        {item.status === 1 ? "Hiển thị" : "Ẩn"}
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

export default SlideshowList;