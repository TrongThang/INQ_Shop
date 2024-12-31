import React from "react";

const Header = ({ onAdd, onExport }) => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <h5>Danh sách bài viết</h5>
      <div>
        <button className="btn btn-primary me-2" onClick={onAdd}>
          <i className="bi bi-plus"></i> Thêm
        </button>
        <button className="btn btn-secondary" onClick={onExport}>
          <i className="bi bi-download"></i> Xuất file
        </button>
      </div>
    </div>
  );
};

export default Header;
