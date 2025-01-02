import BlogCart from "../../../component/user/Introdution/blogCart";
import Pagination from "../../../component/Shared/Pagination/pagination";

function ListBlogPage() {
    return (
        <div className="container-fluid blog py-5">
            <div className="container py-5">
                <div
                    className="text-center mx-auto pb-5 wow fadeInUp"
                    data-wow-delay="0.2s"
                    style={{ maxWidth: "800px" }}
                >
                    <h1 className="display-4 mb-4">Smart Home - Kết Nối Ngôi Nhà Hiện Đại</h1>
                    <h5 className="mb-0">
                        Nơi bạn tìm thấy thông tin hữu ích, sản phẩm nổi bật và lời khuyên từ chuyên gia về Smart Home.
                    </h5>
                </div>
                <div className="row g-4 justify-content-center">
                    <BlogCart />
                    <BlogCart />
                    <BlogCart />
                    <BlogCart />
                    <BlogCart />
                    <BlogCart />

                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default ListBlogPage;
