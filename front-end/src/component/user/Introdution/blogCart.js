import React from "react";

const BlogCart = ({ blog }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">
            <div className="blog-item">
                <div className="blog-img">
                    <img
                        src={blog.image}
                        className="img-fluid rounded-top w-100"
                        alt="Blog Post"
                    />
                    <div className="blog-category py-2 px-4">
                        <span>{blog.category.nameCategory}</span>
                    </div>
                </div>
                <div className="blog-content p-4">
                    <div className="blog-comment d-flex justify-content-between mb-3">
                        <div className="small">
                            <span className="fa fa-user text-primary"></span> {blog.author}
                        </div>
                        <div className="small">
                            <span className="fa fa-calendar text-primary"></span> {formatDate(blog.created_at)}
                        </div>
                        <div className="small">
                            <span className="bi bi-heart-fill text-primary"></span> {blog.score}
                        </div>
                    </div>
                    <a href="#" className="h4 d-inline-block mb-3">
                        {blog.title}
                    </a>
                    <p className="mb-3">{blog.content}</p>
                    <a href="#" className="btn p-0">
                        Xem thêm <i className="fa fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BlogCart;