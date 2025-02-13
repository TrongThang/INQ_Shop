import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from 'sweetalert2'; // Import SweetAlert2

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
        create_at: "",
        image: "",
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
          // Reset lỗi cho trường đang thay đổi
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
    }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlogData((prevData) => ({
                ...prevData,
                image: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset errors
    setErrors({
        title: "",
        author: "",
        idCategory: "",
        contentNormal: "",
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
            title: "Tiêu đề phải có ít nhất 5 ký tự.",
        }));
        hasError = true;
    }

    // Kiểm tra tác giả
    if (!blogData.author) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            author: "Vui lòng chọn tác giả.",
        }));
        hasError = true;
    }
      // Kiểm tra danh mục
      if (!blogData.idCategory) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            idCategory: "Vui lòng chọn danh mục.",
        }));
        hasError = true;
    }
    // Kiểm tra nội dung ngắn
    if (!blogData.contentNormal) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            contentNormal: "Vui lòng nhập nội dung ngắn.",
        }));
        hasError = true;
    } else if (blogData.contentNormal.length < 5) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            contentNormal: "Nội dung ngắn phải có ít nhất 5 ký tự.",
        }));
        hasError = true;
    }

    // Kiểm tra nội dung chi tiết
    if (!blogData.content) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            content: "Vui lòng nhập nội dung chi tiết.",
        }));
        hasError = true;
    } else if (blogData.content.length < 20) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            content: "Nội dung chi tiết phải có ít nhất 20 ký tự.",
        }));
        hasError = true;
    }

    // Nếu có lỗi, dừng lại và không submit form
    if (hasError) {
        return;
    }

        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn có chắc muốn thêm bài viết này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch("http://localhost:8081/api/blog", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(blogData),
                });
                const result = await response.json();

                if (response.ok) {
                    await Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã thêm bài viết thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    navigate("/admin/blog");
                } else {
                    await Swal.fire({
                        title: 'Lỗi!',
                        text: result.msg || 'Đã thêm bài viết thất bại.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Error submitting blog:", error);
                await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra trong quá trình thêm bài viết.',
                    icon: 'error',
                    confirmButtonText: 'OK',
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
                                    <option value="" disabled hidden>Chọn tác giả</option>
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
                                    <option value="" disabled hidden>Chọn danh mục</option>
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
                                    value={formattedDate}
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
                        {errors.contentNormal && <div className="text-danger mt-2">{errors.contentNormal}</div>}
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

export default AddBlog;
