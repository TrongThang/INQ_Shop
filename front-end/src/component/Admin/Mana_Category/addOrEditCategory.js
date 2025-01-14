import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Sidebar from "../Layout/Sidebar/sidebar";
import HeaderAdmin from "../Layout/Header/headerAdmin";

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
        status: 1,
        isHide: 0,
        createdDate: data?.createdDate || new Date().toISOString().split("T")[0],
        updatedDate: data?.updatedDate || new Date().toISOString().split("T")[0],

    });

    // Fetch danh sách danh mục cha
    const [parentCategories, setParentCategories] = useState([]);
    useEffect(() => {
        const fetchParentCategories = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/category");
                const result = await response.json();
                setParentCategories(result.data || []);
            } catch (error) {
                console.error("Error fetching parent categories:", error);
            }
        };
        fetchParentCategories();
    }, []);

    // Xử lý thay đổi giá trị trong form
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    // Hàm đệ quy để hiển thị danh mục và danh mục con
    const renderCategories = (categories, level = 0) => {
        return categories.map((category) => (
            <React.Fragment key={category.id}>
                <option value={category.id}>
                    {"-".repeat(level)} {category.nameCategory}
                </option>
                {category.children && renderCategories(category.children, level + 1)}
            </React.Fragment>
        ));
    };
    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Cập nhật ngày cập nhật nếu là chỉnh sửa
        const updatedFormData = mode === "edit"
            ? { ...formData, updatedDate: new Date().toISOString().split("T")[0] } : formData;
        const url = mode === "add"
            ? "http://localhost:8081/api/category"
            : `http://localhost:8081/api/category/${id}`;
        const method = mode === "add" ? "POST" : "PUT";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json", // Gửi dữ liệu dạng JSON
                },
                body: JSON.stringify(updatedFormData), // Chuyển đổi dữ liệu thành JSON
            });

            if (response.ok) {
                alert(mode === "add" ? "Thêm danh mục thành công!" : "Cập nhật danh mục thành công!");
                navigate("/manage-category");
            } else {
                const errorData = await response.json(); // Lấy thông tin lỗi từ server
                alert((errorData.msg));
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu danh mục:", error);
            alert("Có lỗi xảy ra!");
        }
    };

    return (
        <>
            <div className="page-container">
                <HeaderAdmin />
                <Sidebar />
                <div className="bg-white p-4 rounded shadow-sm">
                    <h5 className="mb-4">{mode === "add" ? "Thêm Danh mục" : "Chỉnh sửa Danh mục"}</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="createdBy" className="form-label">Người tạo:</label>
                                        <input
                                            type="text"
                                            id="createdBy"
                                            className="form-control"
                                            value={formData.createdBy}
                                            onChange={handleChange}
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="createdDate" className="form-label">Ngày tạo:</label>
                                            <input
                                                type="date"
                                                id="createdDate"
                                                className="form-control"
                                                value={formData.createdDate}
                                                onChange={handleChange}
                                                required
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="updatedDate" className="form-label">Ngày cập nhật:</label>
                                            <input
                                                type="date"
                                                id="updatedDate"
                                                className="form-control"
                                                value={formData.updatedDate}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </div>
                                    </div>

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
                                                <option value={0}>Ngừng hoạt động</option>
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