import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import ManageBlogItems from "../../../component/admin/Mana_blog/manageBlogItems";
// import AddBlog from "../../../component/admin/Mana_blog/CRUD_blog/AddBlog";
// import UpdateBlog from "../../../component/admin/Mana_blog/CRUD_blog/UpdateBlog";
import HeaderBlog from "../../../component/admin/Mana_blog/headerBlog";

function ManageBlogPage() {
    const [blog, setBlog] = useState([]);

    const [filteredBlog, setFilteredBlog] = useState([]); // Dữ liệu đã lọc
    // const [formState, setFormState] = useState(0);
    // const [selectedBlogId, setSelectedBlogId] = useState([]);
      const navigate = useNavigate();

    const handleExport = () => {
            const worksheet = XLSX.utils.json_to_sheet(filteredBlog);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Blog");
            XLSX.writeFile(workbook, "Blog_data.xlsx");
        };
    const fetchDataBlog = async () => {
        try {
            // Gửi yêu cầu lấy dữ liệu danh mục đến API
            const response = await fetch(`http://localhost:8081/api/blog/admin`);
            const result = await response.json();
            setBlog(result.data||[]);
            setFilteredBlog(result.data||[]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDataBlog();
    }, []);
    // const filterBlog = () => {
    //     // Kiểm tra nếu Blog không tồn tại hoặc là mảng rỗng
    //     if (!blog || blog.length === 0) {
    //         setFilteredBlog([]); // Đặt filteredBlog thành mảng rỗng
    //         return;
    //     }
    

    const handleFormAddClick = () => {
        // setFormState(1); 
        navigate(`/admin/blog/add`);
    };

    const handleFormUpdateClick = (id) => {
        // setFormState(2); // Hiển thị form "Cập nhật"
        // setSelectedBlogId(id);
        navigate(`/admin/blog/update/${id}`);
    };

    // const handleBackClick = () => {
    //     setFormState(0); // Quay lại trang chính
    // };

    return (
        // <>
        //     {formState === 1 && <AddBlog onBack={handleBackClick} />} {/* Form Thêm */}
        //     {formState === 2 && <UpdateBlog onBack={handleBackClick} blogId={selectedBlogId} />} {/* Form Cập nhật */}

        //     {formState === 0 && (
        //         <div className="main-content-inner">
        //             <div className="container-fluid py-4">
        //                 <HeaderBlog onAdd={handleFormAddClick} />
        //                 <ManageBlogItems onUpdate={handleFormUpdateClick} blogs={blog} />
        //             </div>
        //         </div>
        //     )}
        // </>
        <div className="main-content-inner">
        <div className="container-fluid py-4">
          <HeaderBlog 
              onExport={handleExport}
          onAdd={handleFormAddClick} />
          {filteredBlog.length === 0 ? (
                    <div className="text py-5">
                        <h4>Không có Blog nào</h4>
                    </div>
                ) : (
          <ManageBlogItems onUpdate={handleFormUpdateClick} blogs={blog} />
                )}
        </div>
      </div>
    );
};
export default ManageBlogPage;