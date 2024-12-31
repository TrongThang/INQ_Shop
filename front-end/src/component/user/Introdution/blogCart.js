import Demo from "../../../resource/img/600x400.jpg"; // Correct image import

const BlogItem = () => {
    return (
        <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">
            <div className="blog-item">
                <div className="blog-img">
                    <img
                        src={Demo} // Use the imported image path directly
                        className="img-fluid rounded-top w-100"
                        alt="Blog Post"
                    />
                    <div className="blog-category py-2 px-4">
                        <span>Tên danh mục</span>
                    </div>
                </div>
                <div className="blog-content p-4">
                    <div className="blog-comment d-flex justify-content-between mb-3">
                        <div className="small">
                            <span className="fa fa-user text-primary"></span> Tác giả
                        </div>
                        <div className="small">
                            <span className="fa fa-calendar text-primary"></span> 30 Dec 2024
                        </div>
                        <div className="small">
                            <span className="bi bi-heart-fill text-primary"></span> 6
                        </div>
                    </div>
                    <a href="#" className="h4 d-inline-block mb-3">
                        Tin Tức 1
                    </a>
                    <p className="mb-3">Mô tả ngắn của tin tức 1</p>
                    <a href="#" className="btn p-0">
                        Xem thêm <i className="fa fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
