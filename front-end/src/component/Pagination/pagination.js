import React from "react";

const Pagination = () => {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Trước
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Sau
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
