import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchCategory from "../../../component/admin/Mana_Category/searchCategory";
import CategoryList from "../../../component/admin/Mana_Category/categoryList";
import Swal from 'sweetalert2';

const ManaCategory = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const [hiddenCategories, setHiddenCategories] = useState(new Set());
    const [filteredCategories, setFilteredCategories] = useState([]); // Danh sách danh mục sau khi lọc
    const navigate = useNavigate();
    // Fetch danh sách danh mục
    const fetchDataCategory = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/category/admin");
            const result = await response.json();
            setDataCategory(result.data || []);
            setFilteredCategories(result.data || []); // Khởi tạo filteredCategories với dữ liệu ban đầu
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // Xử lý thêm danh mục
    const handleAddCategory = () => {
        navigate("/admin/add-category", { state: { mode: "add" } });
    };
    const handleStatusChange = async (id, status) => {
        try {
          // Hiển thị hộp thoại xác nhận
          const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Bạn có chắc muốn ${status === 1 ? 'kích hoạt' : 'vô hiệu hóa'} danh mục này không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
          });
      
          // Nếu người dùng xác nhận
          if (result.isConfirmed) {
            const response = await fetch(`http://localhost:8081/api/category/status/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status }),
            });
      
            if (response.ok) {
              // Hiển thị thông báo thành công
              await Swal.fire({
                title: 'Thành công!',
                text: 'Cập nhật trạng thái thành công!',
                icon: 'success',
              });
      
              // Làm mới dữ liệu danh mục
              await fetchDataCategory();
            } else {
              const errorData = await response.json();
              // Hiển thị thông báo lỗi
              await Swal.fire({
                title: 'Lỗi!',
                text: errorData.msg || 'Có lỗi xảy ra khi cập nhật trạng thái!',
                icon: 'error',
              });
            }
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật trạng thái:', error);
          // Hiển thị thông báo lỗi
          await Swal.fire({
            title: 'Lỗi!',
            text: 'Có lỗi xảy ra khi cập nhật trạng thái!',
            icon: 'error',
          });
        }
    };
    // Xử lý chỉnh sửa danh mục
    const handleEditCategory = (id) => {
        const categoryToEdit = findCategoryById(dataCategory, id);
        if (categoryToEdit) {
            navigate(`/admin/edit-category/${id}`, { state: { mode: "edit", data: categoryToEdit } });

        } else {
            console.error("Không tìm thấy danh mục với ID:", id);
        }
    };
    // Hàm đệ quy để tìm danh mục theo id
    const findCategoryById = (categories, id) => {
        for (const category of categories) {
            if (category.id === id) {
                return category;
            }
            if (category.children && category.children.length > 0) {
                const found = findCategoryById(category.children, id);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    };
    // Hàm đệ quy để tìm kiếm danh mục và danh mục con
    const searchCategories = (categories, searchTerm) => {
       
        return categories.reduce((result, category) => {
           
            const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase());
            const normalizedCategoryName = removeDiacritics(category.nameCategory.toLowerCase());
            const isMatch = normalizedCategoryName.includes(normalizedSearchTerm);

            let matchedCategory = null;

            if (category.children && category.children.length > 0) {
                const matchedChildren = searchCategories(category.children, searchTerm);
                if (matchedChildren.length > 0 || isMatch) {
                    matchedCategory = { ...category, children: matchedChildren };
                }
            }

            if (isMatch || matchedCategory) {
                result.push(matchedCategory || category);
            }

            return result;
        }, []);
    };
    // Hàm xử lý tìm kiếm
    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setFilteredCategories(dataCategory);
        } else {
            const filtered = searchCategories(dataCategory, searchTerm); 
            setFilteredCategories(filtered); 
        }
    };
    // Hàm xử lý lọc theo trạng thái
    const removeDiacritics = (str) => {
        return str
            .normalize("NFD") // Chuẩn hóa chuỗi Unicode
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
            .toLowerCase(); // Chuyển về chữ thường
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
                <SearchCategory onSearch={handleSearch} />
                <CategoryList
                    data={filteredCategories} // Truyền filteredCategories thay vì dataCategory
                    onEdit={handleEditCategory}
                    onStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
};

export default ManaCategory;