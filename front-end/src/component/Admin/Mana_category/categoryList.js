import React, {useEffect} from "react";

// Hàm đệ quy để hiển thị danh mục và danh mục con
const renderCategoryRow = (item, onEdit, onDelete, level = 0) => {

  return (
    <React.Fragment key={item.id}>
      {/* Hiển thị danh mục cha hoặc danh mục con */}
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td>
          {"-".repeat(level)} {item.nameCategory} {/* Thêm dấu "-" để phân cấp */}
        </td>
        <td>
          <img
            src={item.image ? `/img/category/${item.image}` : "/img/default.png"}
            alt="Category"
            width="50"
            height="50"
          />
        </td>
        <td>{new Date(item.created_at).toLocaleDateString()}</td>
        <td>{new Date(item.updated_at).toLocaleDateString()}</td>
        <td>
          <span
            className={`badge ${item.status === 1
              ? "bg-success"
              : item.status === 0
                ? "bg-danger"
                : "bg-warning text-dark"
              }`}
          >
            {item.status === 1 ? "Hoạt động" : "Ngừng hoạt động"}
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
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
                    onEdit(item.id); // Gọi hàm onEdit với id của danh mục
                  }}
                >
                  <i className="bi bi-pencil"></i> Sửa
                </a>
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
                    onDelete(item.id); // Gọi hàm onDelete với id của danh mục
                  }}
                >
                  <i className="bi bi-trash"></i> Xóa
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tr>

      {/* Hiển thị danh mục con (nếu có) */}
      {item.children && item.children.map((child) => renderCategoryRow(child, onEdit, onDelete, level + 1))}
    </React.Fragment>
  );
};

// Component để hiển thị danh mục và danh mục con
const CategoryList = ({ data, onEdit, onDelete }) => {
  useEffect(() => {
    console.log("Data changed:", data); // Debug: Kiểm tra dữ liệu mới
  }, [data]);
  
  if (!data || data.length === 0) {
    return <div>Không có danh mục nào để hiển thị.</div>;
  }

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
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Trạng Thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => renderCategoryRow(item, onEdit, onDelete))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;