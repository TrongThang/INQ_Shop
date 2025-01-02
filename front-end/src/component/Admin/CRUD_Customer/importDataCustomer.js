import React from 'react';

const CustomerDetails = () => {
    return (
        <div className="main-content-inner">
            <div className="my-3">
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <div>
                <form className="form-container p-4">
                    <h5 className="mb-4">Thông tin chi tiết khách hàng</h5>
                    <div className="row">
                        <div className="col-md-8 col-xl-8">
                            <form>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Username:</label>
                                    <div className="col-md-9">
                                        <input type="email" className="form-control" value="anhquan@gmail.com" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Họ:</label>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" value="Nguyễn" />
                                    </div>
                                    <label className="col-md-1 form-label">Tên:</label>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" value="Anh Quân" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">CCCD:</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" value="044274885994" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Email:</label>
                                    <div className="col-md-9">
                                        <input type="email" className="form-control" value="anhquan@gmail.com" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Số điện thoại:</label>
                                    <div className="col-md-9">
                                        <input type="tel" className="form-control" value="0911234567" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Giới tính:</label>
                                    <div className="col-md-9">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="male" checked />
                                            <label className="form-check-label" htmlFor="male">Nam</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="female" />
                                            <label className="form-check-label" htmlFor="female">Nữ</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Ngày sinh:</label>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <select className="form-select">
                                                    <option>Ngày</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-select">
                                                    <option>Tháng</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-select">
                                                    <option>Năm</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Report:</label>
                                    <div className="col-md-2">
                                        <input type="number" className="form-control" value="3" />
                                    </div>
                                    <label className="col-md-2 form-label">Ngày tạo:</label>
                                    <div className="col-md-5">
                                        <input type="text" className="form-control" value="20/11/2023" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 form-label">Trạng thái:</label>
                                    <div className="col-md-9">
                                        <select className="form-select status">
                                            <option>Trạng thái</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-info text-white px-4">Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerDetails;