import React from 'react';


const ContactList = ({ contacts, onEdit,onDelete}) => {
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
                            <th>Họ và tên</th>
                            <th>Tiêu đề</th>
                            <th>Email</th>
                            <th>Nội dung</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th>Trạng Thái Liên hệ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{contact.id}</td>
                                <td>{contact.fullname}</td>
                                <td>{contact.title}</td>
                                <td>{contact.email}</td>
                                <td className="col-4">
                                    {contact.content}
                                </td>
                                <td>{new Date(contact.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>{new Date(contact.updated_at).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    <span 
                                        className={`badge ${contact.status === 1 ? "bg-success" : contact.status === 2 ? "bg-warning text-dark" : "bg-danger"}`}
                                    >
                                        {contact.status === 1 
                                            ? "Đã giải quyết" 
                                            : contact.status === 2 
                                            ? "Đang xử lý" 
                                            : "Đã đóng"}
                                    </span>
                                </td>

                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton2"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            <li onClick={() => onEdit(contact.id)}>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bi bi-pencil"></i> Sửa
                                                </a>
                                            </li>
                                            {/* <li onClick={() => onDelete(contact.id)}>
                                                <a className="dropdown-item text-danger" href="#">
                                                    <i className="bi bi-trash"></i> Xóa
                                                </a>
                                            </li> */}
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

export default ContactList;