import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const InfoWebList = ({ InfoWebs, onUpdate }) => {
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            
                            <th>KEY_NAME</th>
                            <th>Giá trị</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {InfoWebs.map((item, index) => (
                            <tr key={index}>
                                
                                <td>{item.KEY_NAME}</td>
                                <td>{item.VALUE}</td>
                                <td>
                                    <span className={`badge ${item.STATUS === 0 ? "bg-danger" : "bg-success"}`}>
                                        {item.STATUS === 0 ? "Ngừng hoạt động" : "Hoạt động"}
                                    </span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={() => onUpdate(item.KEY_NAME)}>
                                                    <i className="bi bi-pencil"></i> Sửa
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

export default InfoWebList;