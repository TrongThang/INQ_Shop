import React, { useEffect, useState } from "react";
import BlogCard from "../../../component/user/Introdution/blogCard";
import Pagination from "../../../component/user/Introdution/pagination";

function ListBlogPage({ isIntroPage = false }) {
  const [blogs, setBlogs] = useState([]); // Danh sách bài viết gốc
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Danh sách bài viết sau khi lọc
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [blogsPerPage] = useState(6); // Số lượng bài viết trên mỗi trang
  const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm

  // Fetch dữ liệu bài viết từ API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/blog");
        const data = await response.json();
        setBlogs(data.data);
        setFilteredBlogs(data.data); // Khởi tạo filteredBlogs với dữ liệu gốc
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
    if (!isIntroPage) {
      document.title = "Bài viết | INQ";
    }
  }, [isIntroPage]);

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên sau khi tìm kiếm
  };

  // Tính toán chỉ mục của bài viết đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div>
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

          {/* Ô tìm kiếm và nút tìm kiếm */}
          <div className="mb-4 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Tìm kiếm theo tiêu đề..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>
          </div>

          {/* Danh sách bài viết */}
          <div className="row g-4 justify-content-center">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))
            ) : (
              <p>Không có bài viết nào để hiển thị.</p>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBlogPage;