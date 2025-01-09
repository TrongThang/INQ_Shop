import React, { useEffect, useState } from "react";
import BlogCart from "../../../component/user/Introdution/blogCart";
import Pagination from "../../../component/Shared/Pagination/pagination";
import CompanyInfo from "../../../component/user/Introdution/companyInfo";

function ListBlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/blog');
                const data = await response.json();
                setBlogs(data.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            {/* <CompanyInfo /> */}
            <div className="container-fluid blog py-5">
                <div className="container py-5">
                    <div
                        className="text-center mx-auto pb-5 wow fadeInUp"
                        data-wow-delay="0.2s"
                        style={{ maxWidth: "800px" }}
                    >
                           <h1 className="display-4 mb-4">Danh sách bài viết</h1>
                        <h5 className="mb-0">
                            Nơi bạn tìm thấy thông tin hữu ích, sản phẩm nổi bật và lời khuyên từ chuyên gia về Smart Home.
                        </h5>
                        
                    </div>
                    <div className="row g-4 justify-content-center">
                        {blogs.map((blog, index) => (
                            <BlogCart key={index} blog={blog} />
                        ))}
                        {/* <Pagination /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListBlogPage;