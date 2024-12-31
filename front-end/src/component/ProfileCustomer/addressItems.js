import React from 'react';

const AddressItems = () => {
    return (
        <div className="d-flex justify-content-between align-items-start border-bottom border-primary pb-3 mb-3">
            <div>
                <p className="mb-1"><strong>Minh Nhân</strong> | <span>(+84) 867 739 863</span></p>
                <p className="mb-1 w-75">34/222, Đường Nguyễn An Ninh, Tổ 33, Xã Phước Hưng, Huyện Long Điền, Bà Rịa - Vũng Tàu</p>
                <span className="badge bg-success">Mặc định</span>
            </div>
            <div className="text-end">
                <a href="#" className="text-decoration-none me-2">Cập nhật</a>
                <span className="icon-line-right"></span>
                <a href="#" className="text-decoration-none">Xóa</a> <br />
                <button className="btn btn-outline-danger btn-sm mt-3">Thiết lập mặc định</button>
            </div>
        </div>
    )
};

export default AddressItems;
