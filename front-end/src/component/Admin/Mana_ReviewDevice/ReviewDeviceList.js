import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SearchDeviceList = ({ ReviewDevice, onUpdate, onDelete }) => {
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>IdReview</th>
                            <th>Khách hàng</th>
                            <th>Tên thiết bị</th>
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>Note</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ReviewDevice.map((item, index) => (
                            <tr key={index}>
                                <td>{item.idReview}</td>
                                <td>{item.customerReview?.surname} {item.customerReview?.lastName}</td>
                                <td>{item.device?.name}</td>
                                <td>{item.comment}</td>
                                <td>{item.rating}</td>
                                <td>{item.note}</td>
                                <td>{new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>{new Date(item.updated_at).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    <span className={`badge ${item.status === 0 ? "bg-danger" : "bg-success"}`}>
                                        {item.status === 0 ? "Ẩn" : "Hiển thị"}
                                    </span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={() => onUpdate(item.idReview)}>
                                                    <i className="bi bi-pencil"></i> Sửa
                                                </a>
                                            </li>
                                            {/* Ẩn nút Xóa nếu trạng thái là Ẩn (status === 0) */}
                                            {item.status !== 0 && (
                                                <li>
                                                    <a className="dropdown-item text-danger" href="#" onClick={() => onDelete(item.idReview)}>
                                                        <i className="bi bi-trash"></i> Xóa
                                                    </a>
                                                </li>
                                            )}
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

export default SearchDeviceList;