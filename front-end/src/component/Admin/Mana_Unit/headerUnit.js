import React from 'react';

const HeaderUnit = ({ onAdd, onSearchChange }) => {
    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h5>Danh sách đơn vị tính</h5>
                <div>
                    <button className="btn btn-primary me-2" onClick={onAdd}>
                        <i className="bi bi-plus"></i> Thêm
                    </button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm đơn vị tính"
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderUnit;