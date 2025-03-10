import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function AddBlog() {
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const [blogData, setBlogData] = useState({
        title: "",
        author: "",
        idCategory: "",
        status: "1",
        create_at: formattedDate,
        image: "", // Lưu ảnh dưới dạng Base64
        content: "",
        contentNormal: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        title: "",
        author: "",
        idCategory: "",
        contentNormal: "",
        content: "",
    });

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/category");
            const result = await response.json();
            setCategories(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/employee");
            const result = await response.json();
            setEmployees(result.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB
                Swal.fire("Lỗi", "Ảnh không được vượt quá 5MB!", "error");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setBlogData((prevData) => ({
                    ...prevData,
                    image: reader.result, // Lưu ảnh dạng Base64
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    

    const handleEditorChange = (content) => {
        setBlogData((prevData) => ({
            ...prevData,
            content: content,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({
            title: "",
            author: "",
            idCategory: "",
            contentNormal: "",
            content: "",
        });

        let hasError = false;

        // Kiểm tra lỗi (giữ nguyên phần kiểm tra lỗi của bạn)

        if (hasError) {
            return;
        }

        const confirmResult = await Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Bạn có chắc muốn thêm bài viết này không?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy",
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch("http://localhost:8081/api/blog", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(blogData), // Gửi dữ liệu dưới dạng JSON, bao gồm ảnh Base64
                });
                const result = await response.json();

                if (response.ok) {
                    await Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm bài viết thành công.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    navigate("/admin/blog");
                } else {
                    await Swal.fire({
                        title: "Lỗi!",
                        text: result.msg || "Đã thêm bài viết thất bại.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error("Error submitting blog:", error);
                await Swal.fire({
                    title: "Lỗi!",
                    text: "Có lỗi xảy ra trong quá trình thêm bài viết.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchEmployees();
    }, []);

    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={() => navigate("/admin/blog")}>
                <a href="#">
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Thêm chi tiết bài viết</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
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
                                {errors.title && <div className="text-danger mt-2">{errors.title}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên tác giả:</label>
                                <select
                                    className="form-select"
                                    name="author"
                                    value={blogData.author}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Chọn tác giả
                                    </option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.surname} {employee.lastname}
                                        </option>
                                    ))}
                                </select>
                                {errors.author && <div className="text-danger mt-2">{errors.author}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Danh mục:</label>
                                <select
                                    className="form-select"
                                    name="idCategory"
                                    value={blogData.idCategory}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Chọn danh mục
                                    </option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nameCategory}
                                        </option>
                                    ))}
                                </select>
                                {errors.idCategory && <div className="text-danger mt-2">{errors.idCategory}</div>}
                            </div>
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
                            <div className="mb-3">
                                <label className="form-label">Hình ảnh:</label>
                                <div className="upload-area">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="form-control"
                                    />
                                    {blogData.image && (
                                        <img
                                            src={blogData.image} // Hiển thị ảnh từ Base64
                                            alt="Preview"
                                            style={{ maxWidth: "100%", marginTop: "10px" }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nội dung ngắn:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="contentNormal"
                            value={blogData.contentNormal}
                            onChange={handleChange}
                            required
                        />
                        {errors.contentNormal && (
                            <div className="text-danger mt-2">{errors.contentNormal}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nội dung chi tiết:</label>
                        <SunEditor
                            setContents={blogData.content}
                            onChange={handleEditorChange}
                            setOptions={{
                                height: "400",
                                buttonList: [
                                    ["bold", "underline", "italic", "strike"],
                                    ["blockquote"],
                                    ["list", "table"],
                                    ["link", "image"],
                                    ["codeView"],
                                ],
                            }}
                            placeholder="Nhập nội dung chi tiết..."
                        />
                        {errors.content && <div className="text-danger mt-2">{errors.content}</div>}
                    </div>
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

export default AddBlog;