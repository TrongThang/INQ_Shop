import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchCategory from "../../../component/admin/Mana_Category/searchCategory";
import CategoryList from "../../../component/admin/Mana_Category/categoryList";

const ManaCategory = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const navigate = useNavigate();

    // Fetch danh sách danh mục
    const fetchDataCategory = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/category");
            const result = await response.json();
            setDataCategory(result.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Xử lý thêm danh mục
    const handleAddCategory = () => {
        navigate("/add-category", { state: { mode: "add" } });
    };
    //Hàm đệ quy để tìm danh mục theo id

    // Xử lý chỉnh sửa danh mục
    const handleEditCategory = (id) => {
        const categoryToEdit = findCategoryById(dataCategory, id); // Tìm danh mục bằng hàm đệ quy
        if (categoryToEdit) {
            navigate(`/edit-category/${id}`, { state: { mode: "edit", data: categoryToEdit } });
        } else {
            console.error("Không tìm thấy danh mục với ID:", id);
        }
    };
    const handleDeleteCategory = async (id) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:8081/api/category/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (result.errorCode === 0) {
                console.log(result.msg); // "Xóa danh mục thành công!"
                alert(result.msg);

                // Cập nhật lại danh sách danh mục sau khi xóa
                const updatedData = removeCategoryRecursive(dataCategory, id);
                console.log("Updated data:", updatedData); // Debug: Kiểm tra dữ liệu mới
                setDataCategory(updatedData); // Cập nhật state
            } else {
                alert(result.msg)
                console.error(result.msg); // "Không tìm thấy danh mục để xóa!"
            }
        } catch (error) {
            alert("Không tìm thấy danh mục này")
            console.error("Lỗi khi xóa danh mục:", error);
        }
    };
    // đệ quy để xóa cả danh mục con.
    const removeCategoryRecursive = (categories, id) => {
        return categories.filter((category) => {
            if (category.id === id) {
                return false; // Loại bỏ danh mục có id trùng khớp
            }
            if (category.children && category.children.length > 0) {
                category.children = removeCategoryRecursive(category.children, id); // Đệ quy xóa danh mục con
            }
            return true;
        });
    };
    //Tìm danh mục con để hiển thị lên danh sách
    const findCategoryById = (categories, id) => {
        for (const category of categories) {
            if (category.id === id) {
                return category; // Trả về danh mục nếu tìm thấy
            }
            if (category.children && category.children.length > 0) {
                const found = findCategoryById(category.children, id); // Đệ quy tìm trong danh mục con
                if (found) {
                    return found; // Trả về danh mục con nếu tìm thấy
                }
            }
        }
        return null; // Trả về null nếu không tìm thấy
    };
    useEffect(() => {
        fetchDataCategory();
    }, []);

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between mb-3">
                    <h5>Danh sách Danh mục</h5>
                    <div>
                        <button className="btn btn-primary me-2" onClick={handleAddCategory}>
                            <i className="bi bi-plus"></i> Thêm
                        </button>
                        <button className="btn btn-success">
                            <i className="bi bi-download"></i> Xuất file
                        </button>
                    </div>
                </div>
                <SearchCategory />
                <CategoryList
                    data={dataCategory}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                />
            </div>
        </div>
    );
};

export default ManaCategory;