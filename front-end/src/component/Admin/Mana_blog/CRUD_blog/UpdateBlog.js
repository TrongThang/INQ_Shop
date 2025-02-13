import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from 'sweetalert2'; // Import SweetAlert2

function UpdateBlog() {
    const [errors, setErrors] = useState({
        title: "",
        content: "",
    });
    
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
        contentNormal: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();
    
    
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
         // Reset lỗi cho trường đang thay đổi
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
    }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
                 // Reset errors
    setErrors({
        title: "",
        content: "",
    });

    let hasError = false;

    // Kiểm tra tiêu đề
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

    // Kiểm tra nội dung
    if (!blogData.content) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            content: "Vui lòng nhập nội dung.",
        }));
        hasError = true;
    } else if (blogData.content.length < 20) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            content: "Nội dung chính vui lòng dài hơn 20 ký tự.",
        }));
        hasError = true;
    }

    // Nếu có lỗi, dừng lại và không submit form
    if (hasError) {
        return;
    }
        // Hiển thị hộp thoại xác nhận chỉnh sửa
        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn có chắc muốn cập nhật bài viết này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        // Nếu người dùng xác nhận
        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch("http://localhost:8081/api/blog", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(blogData),
                });
                const result = await response.json();

                if (response.ok) {
                    // Thông báo thành công
                    await Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã chỉnh sửa bài viết thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    navigate("/admin/blog");
                } else {
                    // Thông báo lỗi
                    await Swal.fire({
                        title: 'Lỗi!',
                        text: result.msg || 'Đã chỉnh sửa bài viết thất bại.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Error submitting blog:", error);
                // Thông báo lỗi
                await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra trong quá trình cập nhật.',
                    icon: 'error',
                    confirmButtonText: 'OK',
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
                                    <option value="" disabled hidden>Chọn tác giả</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.surname} {employee.lastname}
                                        </option>
                                    ))}
                                </select>
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
                                    <option value="" disabled hidden>Chọn danh mục</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nameCategory}
                                        </option>
                                    ))}
                                </select>
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
                                    <i className="bi bi-cloud-arrow-up upload-icon"></i>
                                    <div>Upload ảnh</div>
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
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nội dung chi tiết:</label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                licenseKey: "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDA3MDA3OTksImp0aSI6ImZiZjU2OGJlLThjYjYtNDAyNC1hY2M4LWE5NzI3MmRlMWQxMCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjYxMDhjYjkzIn0.QztQpGVy2snVHLOrISZIVUrB0dn2hwZvFnF--9bihGUkZwBeF3LRVnkMRMhcz9LLifROozyz6DYEJrj3M9v0SA",
                            }}
                            data={blogData.content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setBlogData((prevData) => ({
                                    ...prevData,
                                    content: data,
                                }));
                            }}
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
