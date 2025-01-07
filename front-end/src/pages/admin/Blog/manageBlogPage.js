import React from "react";
import { useState, useEffect } from "react";
import ManageBlogItems from "../../../component/admin/Mana_blog/manageBlogItems";
import AddBlog from "../../../component/admin/Mana_blog/CRUD_blog/AddBlog";
import UpdateBlog from "../../../component/admin/Mana_blog/CRUD_blog/UpdateBlog";
import HeaderBlog from "../../../component/admin/Mana_blog/headerBlog";

function ManageBlogPage() {
    const [blog, setBlog] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedBlogId, setSelectedBlogId] = useState([]);

    const fetchDataBlog = async () => {
        try {
            // Gửi yêu cầu lấy dữ liệu danh mục đến API
            const response = await fetch(`http://localhost:8081/api/blog`);
            const result = await response.json();
            setBlog(result.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDataBlog();
    }, []);

    const handleFormAddClick = () => {
        setFormState(1); // Hiển thị form "Thêm"
    };

    const handleFormUpdateClick = (id) => {
        setFormState(2); // Hiển thị form "Cập nhật"
        setSelectedBlogId(id);
    };

    const handleBackClick = () => {
        setFormState(0); // Quay lại trang chính
    };

    return (
        <>
            {formState === 1 && <AddBlog onBack={handleBackClick} />} {/* Form Thêm */}
            {formState === 2 && <UpdateBlog onBack={handleBackClick} blogId={selectedBlogId} />} {/* Form Cập nhật */}

            {formState === 0 && (
                <div class="main-content-inner">
                    <div class="container-fluid py-4">
                        <HeaderBlog onAdd={handleFormAddClick} />
                        <ManageBlogItems onUpdate={handleFormUpdateClick} blogs={blog} />
                    </div>
                </div>
            )}
        </>
    );
};
export default ManageBlogPage;