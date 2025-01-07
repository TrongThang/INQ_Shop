const ManageBlogItems = ({ onUpdate, blogs }) => {
  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:8081/api/blog/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 0 })
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Xóa thành công:", result);
        } else {
            console.error("Lỗi khi xóa:", result);
        }
    } catch (error) {
        console.error("Lỗi trong quá trình xóa:", error);
    }
}
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th width="40">
                <input type="checkbox" />
              </th>
              <th>Mã tin</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Hình ảnh</th>
              <th>Ngày đăng</th>
              <th>Trạng Thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <img src={blog.image} alt={blog.title} width="50" />
                </td>
                <td>{new Date(blog.created_at).toLocaleDateString('vi-VN')}</td>
                <td>
                  <span className={`badge ${blog.status === 1 ? "bg-success" : "bg-danger"}`}>
                    {blog.status === 1 ? "Hiển thị" : "Ẩn"}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <a className="dropdown-item" href="#" onClick={() => onUpdate(blog.id)}>
                          <i className="bi bi-pencil"></i> Sửa
                        </a>
                      </li>
                      <li onClick={() => handleDelete(blog.id)}>
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

export default ManageBlogItems;
