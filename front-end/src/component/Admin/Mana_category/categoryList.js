import React, { useEffect } from "react";
// Hàm đệ quy để hiển thị danh mục và danh mục con

const renderCategoryRow = (item, onEdit, onStatusChange, level = 0) => {
  return (
    <React.Fragment key={item.id}>
      {/* Hiển thị danh mục cha hoặc danh mục con */}
      <tr>
        <td value={item.id}
          style={{
            paddingLeft: `${level * 20}px`, // Thụt lề tăng dần
            fontSize: `${17 - level * 2}px`, // Kích thước chữ giảm dần
            marginLeft: '10px'
          }}>
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
        <td style={{ width: "450px" }}>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleDateString()}</td>

        <td>
          <span
            className={`badge text-white ${item.status === 1 ? "bg-success" : "bg-danger"}`}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            {item.status === 1 ? "Hoạt động" : "Không hoạt động"}
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
              {item.status === 1 && <li >
                <a
                  className="dropdown-item text-danger"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onStatusChange(item.id, item.status === 1 ? 0 : "")
                  }}>
                  <i className="bi bi-slash-circle"
                  ></i>Vô hiệu hóa
                </a>
              </li>
              }
            </ul>
          </div>
        </td>
      </tr>
      {/* Hiển thị danh mục con (nếu có) */}
      {item.children && item.children.map((child) => renderCategoryRow(child, onEdit, onStatusChange, level + 1))}
    </React.Fragment >
  );
};

// Component để hiển thị danh mục và danh mục con
const CategoryList = ({ data, onEdit, onStatusChange }) => {

  if (!data || data.length === 0) {
    return <div>Không có danh mục sản phẩm nào.</div>;
  }

  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Danh mục</th>
              <th>Hình ảnh</th>
              <th>Mô tả</th>
              <th>Ngày tạo</th>
              <th>Trạng Thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody >
            {data.map((item) => renderCategoryRow(item, onEdit, onStatusChange))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;