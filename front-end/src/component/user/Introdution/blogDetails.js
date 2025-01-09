import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/blog/${id}`);
                const data = await response.json();
                setBlog(data.data);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
        document.title = "";
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center mt-3 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex align-items-center mb-4 position-relative">
                        <img
                            src="https://placehold.co/60x60"
                            alt="Avatar"
                            className="rounded-circle mb-2"
                        />
                        <div className="ms-1">
                            <p className="m-0">{blog.author}</p>
                            <p className="m-0 fs-user-p">{new Date(blog.created_at).toLocaleDateString()} </p>
                        </div>
                    </div>

                    <h2 className="mb-4">{blog.title}</h2>
                    <img
                        src={`/img/blog/${blog.image}` || "https://via.placeholder.com/1000x600"}
                        style={{ width: "600px", height: "400px" }}
                        alt="Hình ảnh bài viết"
                        className="img-fluid rounded mb-4"
                    />
                    {/* <p className="fs-4 fw-normal mb-5">{blog.content}</p> */}
                    <p className="fs-4 fw-normal mb-5" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                    
                </div>
            </div>
        </div> 
    );
};

export default BlogDetails;
