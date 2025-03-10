import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function UpdateBlog() {
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [blogData, setBlogData] = useState({
        title: "",
        author: "",
        idCategory: "",
        status: "1",
        create_at: "",
        image: "",
        content: "",
        contentNormal: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        title: "",
        author: "",
        idCategory: "",
        contentNormal: "",
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

    const fetchDataBlog = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/blog/admin/${id}`);
            const result = await response.json();
            setBlogData((prevData) => ({
                ...prevData,
                ...result.data,
                create_at: formatDate(result.data.created_at),
            }));
        } catch (err) {
            console.error(err);
        }
    };

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
            if (file.size > 5 * 1024 * 1024) { // Giới hạn 5MB
                Swal.fire("Lỗi", "Ảnh không được vượt quá 5MB!", "error");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setBlogData((prevData) => ({
                    ...prevData,
                    image: reader.result, // Lưu ảnh Base64
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

        if (!blogData.title) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                title: "Vui lòng nhập tiêu đề.",
            }));
            hasError = true;
        } else if (blogData.title.length < 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                title: "Tiêu đề vui lòng dài hơn 5 ký tự.",
            }));
            hasError = true;
        }

        if (!blogData.contentNormal) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                contentNormal: "Vui lòng nhập nội dung ngắn.",
            }));
            hasError = true;
        }

        if (!blogData.content) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                content: "Vui lòng nhập nội dung.",
            }));
            hasError = true;
        } else if (blogData.content.replace(/<[^>]*>/g, "").length < 20) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                content: "Nội dung chính vui lòng dài hơn 20 ký tự.",
            }));
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const confirmResult = await Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Bạn có chắc muốn cập nhật bài viết này không?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy",
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8081/api/blog/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(blogData),
                });
                const result = await response.json();

                if (response.ok) {
                    await Swal.fire({
                        title: "Thành công!",
                        text: "Đã chỉnh sửa bài viết thành công.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    navigate("/admin/blog");
                } else {
                    await Swal.fire({
                        title: "Lỗi!",
                        text: result.msg || "Đã chỉnh sửa bài viết thất bại.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error("Error submitting blog:", error);
                await Swal.fire({
                    title: "Lỗi!",
                    text: "Có lỗi xảy ra trong quá trình cập nhật.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    useEffect(() => {
        fetchDataBlog();
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
                <h5 className="mb-4">Chỉnh sửa chi tiết bài viết</h5>
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
                                        src={blogData.image.startsWith("data:image") ? blogData.image : `/img/blog/${blogData.image}`}
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

export default UpdateBlog;
