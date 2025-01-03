import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [score, setScore] = useState(25);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/blog/${id}`);
        const data = await response.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const increaseScore = () => {
    setScore(score + 1);
  };

  const decreaseScore = () => {
    setScore(score - 1);
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="container score-container d-flex justify-content-center align-items-center mt-3 mb-5">
        <div className="d-flex flex-row position-relative align-items-center flex-column me-3">
          <button
            className="btn btn-outline-primary mb-4"
            id="decrease-score"
            onClick={decreaseScore}
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
          >
            <span className="btn-score">
              <i className="fa-solid fa-caret-down"></i>
            </span>
          </button>
        </div>
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
              <p className="m-0">{blog.author.name}</p>
              <p className="m-0 fs-user-p">{new Date(blog.created_at).toLocaleDateString()} . {blog.read_time} Minute</p>
            </div>
            <div className="position-absolute menu-blog-user">...</div>
          </div>

          <h2 className="mb-4">{blog.title}</h2>
          <p className="w-75">{blog.content}</p>
          <img
            src={blog.image_url || "https://via.placeholder.com/1000x600"}
            alt="Hình ảnh bài viết"
            className="img-fluid rounded mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;