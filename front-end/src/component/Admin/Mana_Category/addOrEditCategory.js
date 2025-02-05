import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
const AddOrEditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    // Lấy dữ liệu từ location.state
    const { mode, data } = location.state || { mode: "add", data: null };

    // Khởi tạo formData dựa trên dữ liệu nhận được
    const [formData, setFormData] = useState({
        nameCategory: data?.nameCategory || "",
        description: data?.description || "",
        parentId: data?.parentId || null,
        status: data?.status || 0, // Sử dụng trạng thái từ dữ liệu hiện có hoặc mặc định là 0
        isHide: data?.isHide || 0,
        createdDate: data?.createdDate || new Date().toISOString().split("T")[0],
    });
    const [parentCategories, setParentCategories] = useState([]);
    // Hàm đệ quy để loại bỏ danh mục và các danh mục con
    const filterOutCategoryAndChildren = (categories, categoryId) => {
        return categories.filter(category => {
            if (category.id === categoryId) {
                return false; // Loại bỏ danh mục đang chỉnh sửa
            }
            if (category.children && category.children.length > 0) {
                category.children = filterOutCategoryAndChildren(category.children, categoryId); // Đệ quy loại bỏ danh mục con
            }
            return true;
        });
    };
    // Hàm đệ quy để hiển thị danh mục và danh mục con
    const renderCategories = (categories, level = 0) => {
        return categories.map((category) => (
            <React.Fragment key={category.id}>
                <option
                    value={category.id}
                    style={{
                        paddingLeft: `${level * 20}px`, // Thụt lề tăng dần
                        fontSize: `${16 - level * 2}px`, // Kích thước chữ giảm dần
                    }}
                >
                    {"-".repeat(level)} {category.nameCategory}
                </option>
                {category.children && renderCategories(category.children, level + 1)}
            </React.Fragment>
        ));
    };

    // Hàm fetch danh sách danh mục cha
    const fetchParentCategories = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/category/admin");
            const result = await response.json();
            let categories = result.data || [];
            // Nếu là chỉnh sửa, loại bỏ danh mục đang chỉnh sửa và các danh mục con của nó
            if (mode === "edit" && id) {
                categories = filterOutCategoryAndChildren(categories, parseInt(id));
            }
            setParentCategories(categories);
        } catch (error) {
            console.error("Error fetching parent categories:", error);
        }
    };


    // Hàm cập nhật trạng thái


    // Xử lý thay đổi giá trị trong form
    const handleChange = async (e) => {
        const { id, value } = e.target;
        // Xử lý giá trị của parentId
        const updatedValue = id === "parentId" && value === "" ? null : value;

        // Cập nhật formData
        setFormData({
            ...formData,
            [id]: updatedValue,
        });
    };
    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();


        // Kiểm tra các trường bắt buộc
        if (!formData.nameCategory.trim()) {
            alert("Tên danh mục không được để trống!");
            return;
        }

        // Cập nhật ngày cập nhật nếu là chỉnh sửa
        const updatedFormData = {
            ...formData,
            updatedDate: mode === "edit" ? new Date().toISOString().split("T")[0] : null,
        };

        const url = mode === "add"
            ? "http://localhost:8081/api/category"
            : `http://localhost:8081/api/category/${id}`;
        const method = mode === "add" ? "POST" : "PUT";

        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: `Bạn có chắc muốn ${mode === "add" ? 'Thêm' : 'Cập nhật'} danh mục này không?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
            });

            if (result.isConfirmed) {
                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedFormData),
                });

                if (response.ok) {
                    await Swal.fire({
                        title: 'Thành công!',
                        text: `${mode === "add" ? 'Thêm' : 'Cập nhật'} Danh mục thành công!`,
                        icon: 'success',
                    });
                    navigate("/admin/category");
                } else {
                    const errorData = await response.json();
                    await Swal.fire({
                        title: 'Thất bại!',
                        text: `${errorData.msg}`,
                        icon: 'error',
                    });
                }
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu danh mục:", error);
            await Swal.fire({
                title: 'Thất bại!',
                text: `Có lỗi xảy ra`,
                icon: 'error',
            });
        }
    };
    useEffect(() => {
        fetchParentCategories();
    }, [mode, id]);

    return (
        <>
            <div class="my-3 ms-4">
                <Link to="/admin/category"
                    class="text-decoration-none">
                    <i class="bi bi-arrow-left pe-2"></i>Trở về
                </Link>
            </div>
            <div className="ms-4">
                <div className="bg-white p-4 rounded shadow-sm">
                    <h5 className="mb-4 " style={{fontWeight: "bold"}}>{mode === "add" ? "Thêm Danh mục" : "Chỉnh sửa Danh mục"}</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="row form-category">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Tên danh mục:</label>
                                        <input
                                            type="text"
                                            id="nameCategory"
                                            className="form-control"
                                            value={formData.nameCategory}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Mô tả:</label>
                                        <input
                                            type="text"
                                            id="description"
                                            className="form-control"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-6">
                                            <label htmlFor="parentId" className="form-label">Danh mục cha:</label>
                                            <select
                                                id="parentId"
                                                className="form-select"
                                                value={formData.parentId}
                                                onChange={handleChange}
                                            >
                                                <option value="">Chọn danh mục cha</option>
                                                {renderCategories(parentCategories)}
                                            </select>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label htmlFor="status" className="form-label">Trạng thái:</label>
                                            <select
                                                id="status"
                                                className="form-select"
                                                value={formData.status}
                                                onChange={handleChange}
                                            >
                                                <option value={1}>Hoạt động</option>
                                                <option value={0}>Không hoạt động</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary text-white px-4">
                                {mode === "add" ? "Lưu" : "Cập nhật"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddOrEditCategory;