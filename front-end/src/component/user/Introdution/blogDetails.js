import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(25); // Khởi tạo điểm số mặc định
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/blog/${id}`);
                const data = await response.json();
                setBlog(data.data);
                setScore(data.data.score); // Giả sử blog có thuộc tính score
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();

        // Kiểm tra trạng thái đã bỏ phiếu từ localStorage
        const voted = localStorage.getItem(`voted_${id}`);
        if (voted) {
            setHasVoted(true);
        }
    }, [id]);

    const increaseScore = () => {
        if (!hasVoted) {
            setScore(score + 1);
            setHasVoted(true);
            localStorage.setItem(`voted_${id}`, 'true');
        }
    };

    const decreaseScore = () => {
        if (!hasVoted) {
            setScore(score - 1);
            setHasVoted(true);
            localStorage.setItem(`voted_${id}`, 'true');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="container score-container d-flex justify-content-center align-items-center mt-3 mb-5">
            <div className="d-flex flex-row position-relative align-items-center flex-column me-3">
                <button
                    className="btn btn-outline-primary mb-4"
                    id="decrease-score"
                    onClick={decreaseScore}
                    disabled={hasVoted}
                >
                    <span className="btn-score">
                        <i className="fa-solid fa-caret-up"></i>
                    </span>
                </button>
                <span id="score-value" className="mx-3 fs-6">
                    {score}
                </span>
                <button
                    className="btn btn-outline-primary mt-4"
                    id="increase-score"
                    onClick={increaseScore}
                    disabled={hasVoted}
                >
                    <span className="btn-score">
                        <i className="fa-solid fa-caret-down"></i>
                    </span>
                </button>
            </div>

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
                        {/* <div className="position-absolute menu-blog-user">...</div> */}
                    </div>

                    <h2 className="mb-4">{blog.title}</h2>
                   
                    <img
                        src={blog.image || "https://via.placeholder.com/1000x600"}
                        alt="Hình ảnh bài viết"
                        className="img-fluid rounded mb-4"
                    />
                    <p className="w-75">{blog.content}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;