import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const CustomerList = ({ Customers }) => {
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th width="40">
                <input type="checkbox" />
              </th>
              <th>Mã KH</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Username</th>
            
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>

              <th>Trạng thái TK</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Customers.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.id}</td>
                <td>{item.surname}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.username}</td>
              
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>

                <td>
                  <span className={`badge ${item.status === "Hoạt động" ? "bg-success" : "bg-danger"}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu">
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

export default CustomerList;
