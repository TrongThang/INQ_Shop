import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogCart = ({ blog }) => {
    const [authorName, setAuthorName] = useState("");
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    useEffect(() => {
        const fetchAuthorName = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/employee/${blog.author}`);
                const data = await response.json();
                if (data && data.data) {
                    setAuthorName(`${data.data.surname} ${data.data.lastname}`);
                }
            } catch (error) {
                console.error("Error fetching author name:", error);
            }
        };

        fetchAuthorName();
    }, [blog.author]);

    return (
        <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">
            <div className="blog-item">
                <Link to={`/blog/${blog.id}`} className="blog-img">
                    <img
                        src={`/img/blog/${blog.image}`}
                        style={{ width: "600px", height: "300px" }}
                        className="img-fluid rounded-top w-100"
                        alt="Blog Post"
                    />
                    <div className="blog-category py-2 px-4">
                        <span>{blog.category.nameCategory}</span>
                    </div>
                </Link>
                <div className="blog-content p-4">
                    <div className="blog-comment d-flex justify-content-between mb-3">
                        <div className="small">
                            <span className="fa fa-user text-primary"></span> {authorName}
                        </div>
                        <div className="small">
                            <span className="fa fa-calendar text-primary"></span> {formatDate(blog.created_at)}
                        </div>
                    </div>
                    <Link to={`/blog/${blog.id}`} className="h4 d-inline-block mb-3">
                        {blog.title}
                    </Link> 
                    <p className="mb-3">{blog.contentNormal}</p>
                    <Link to={`/blog/${blog.id}`} className="btn btn-outline-warning">
                        Xem thêm <i className="fa fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCart;