import React from "react";

const CategoryList = ({ data = [] }) => {
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Danh mục</th>
              <th>Hình ảnh</th>
              <th>Danh mục cha</th>
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Trạng Thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.category}</td>
                <td>
                  <img src={item.image} alt="Category" width="100" height="100" />
                </td>
                <td>{item.parentCategory}</td>
                <td>{item.createdDate}</td>
                <td>{item.modifiedDate}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "Hoạt động"
                        ? "bg-success"
                        : item.status === "Ngừng hoạt động"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
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

export default CategoryList;
