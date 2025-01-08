import { useState, useEffect, use } from "react";

function UpdateBlog({ onBack, blogId }) {
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [blogData, setBlogData] = useState({
        title: "",
        author: "",
        idCategory: "",
        status: "",
        create_at: "",
        image: "",
        content: "",
    });

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Fetch bài viết từ API để gán vào form
    const fetchDataBlog = async () => {
        try {
            // Gửi yêu cầu lấy dữ liệu blog đến API
            const response = await fetch(`http://localhost:8081/api/blog/${blogId}`);
            const result = await response.json();
            console.log("Data from API:", result.data);
            setBlogData((prevData) => ({
                ...prevData,
                ...result.data,
                create_at: formatDate(result.data.created_at),
            }));
            console.log("Blog Data:", result.data);
        } catch (err) {
          console.error(err);
        }
        console.log(blogData);
    };

    // Fetch danh mục từ API để gán vào những option danh mục
    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/category");
            const result = await response.json();
            setCategories(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch nhân viên từ API để gán vào những option tác giả
    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/employee");
            const result = await response.json();
            setEmployees(result.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    // Cập nhật dữ liệu form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gửi dữ liệu bài viết để cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/api/blog", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogData),
            });
            const result = await response.json();
            if (response.ok) {
                console.log("Form submitted successfully:", result);
            } else {
                console.error("Form submission error:", result);
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
        }
    };

    useEffect(() => {
        fetchDataBlog();
        fetchCategories();
        fetchEmployees();
    },[]);

    return (
        <div className="main-content-inner">
            {/* Back button */}
            <div className="my-3">
                <a href="#" onClick={onBack}>
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            {/* Main form */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Chỉnh sửa chi tiết bài viết</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            {/* Title */}
                            <div className="mb-3">
                                <label className="form-label">Tiêu đề bài viết:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={blogData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Author */}
                            <div className="mb-3">
                                <label className="form-label">Tên tác giả:</label>
                                <select
                                    className="form-select"
                                    name="author"
                                    value={blogData.author}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>Chọn tác giả</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.surname} {employee.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Category */}
                            <div className="mb-3">
                                <label className="form-label">Danh mục:</label>
                                <select
                                    className="form-select"
                                    name="idCategory"
                                    value={blogData.nameCategory}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>Chọn danh mục</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nameCategory}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Create At */}
                            {console.log("Formatted create_at:", blogData.create_at)}
                            <div className="mb-3">
                                <label className="form-label">Ngày đăng bài:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="create_at"
                                    value={blogData.create_at}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </div>
                            {/* Status */}
                            <div className="mb-3">
                                <label className="form-label">Trạng thái:</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    value={blogData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="1">Hiển thị</option>
                                    <option value="0">Ẩn</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {/* Image upload */}
                            <div className="mb-3">
                                <label className="form-label">Hình ảnh:</label>
                                <div className="upload-area">
                                    <i className="bi bi-cloud-arrow-up upload-icon"></i>
                                    <div>Upload ảnh</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="mb-3">
                        <label className="form-label">Nội dung chi tiết:</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            name="content"
                            value={blogData.content}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    {/* Submit button */}
                    <div className="text-right">
                        <button type="submit" className="btn btn-info text-white">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBlog;
