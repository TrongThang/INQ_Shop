import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from "react-router-dom";

const ManageBlogItems = ({ blogs }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Bạn có chắc muốn xóa bài viết này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8081/api/blog/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 0 }),
        });
        const result = await response.json();
        if (response.ok) {
          await Swal.fire({
            title: 'Thành công!',
            text: 'Đã xóa bài viết thành công.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          // Optionally, you can refresh the list of blogs here
        } else {
          await Swal.fire({
            title: 'Lỗi!',
            text: result.msg || 'Đã xóa bài viết thất bại.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error("Lỗi trong quá trình xóa:", error);
        await Swal.fire({
          title: 'Lỗi!',
          text: 'Có lỗi xảy ra trong quá trình xóa bài viết.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/blog/update/${id}`);
  };

  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
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
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <img src={blog.image} alt={blog.image} width="50" />
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
                        <a className="dropdown-item" href="#" onClick={() => handleUpdate(blog.id)}>
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