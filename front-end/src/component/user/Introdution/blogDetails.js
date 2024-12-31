import React, { useState } from 'react';

const BlogDetails = () => {
  const [score, setScore] = useState(25);

  const increaseScore = () => {
    setScore(score + 1);
  };

  const decreaseScore = () => {
    setScore(score - 1);
  };

  return (
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

      <div className="row">
        <div className="col-md-12">
          <div className="d-flex align-items-center mb-4 position-relative">
            <img
              src="https://placehold.co/60x60"
              alt="Avatar"
              className="rounded-circle mb-2"
            />
            <div className="ms-1">
              <p className="m-0">USERNAME</p>
              <p className="m-0 fs-user-p">May 22, 2023 . 1 Minute</p>
            </div>
            <div className="position-absolute menu-blog-user">...</div>
          </div>

          <h2 className="mb-4">Tiêu đề bài viết</h2>
          <p className="w-75">
            Đây là nội dung chi tiết của bài viết. Bạn có thể thêm
            nội dung dài hơn tại đây.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer nec odio. Praesent libero.
            Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem
            at nibh elementum imperdiet.
          </p>
          <p className="w-75">
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus
            sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra.
          </p>
          <img
            src="https://via.placeholder.com/1000x600"
            alt="Hình ảnh bài viết"
            className="img-fluid rounded mb-4"
          />
          <p className="w-75">
            Đây là nội dung chi tiết của bài viết. Bạn có thể thêm
            nội dung dài hơn tại đây.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer nec odio. Praesent libero.
            Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem
            at nibh elementum imperdiet.
          </p>
          <p className="w-75">
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus
            sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
