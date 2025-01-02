const AccountCustomer = () => {
    return (
        <div className="container-form col-md-8 col-lg-6 me-auto py-4 mt-4 shadow-sm rounded">
            <div className="profile-h1 mb-3">
                <h1 className="mb-1 fs-4">Hồ Sơ của tôi</h1>
                <p className="mb-2 fs-6 text-muted">Chỉnh sửa thông tin tài khoản</p>
            </div>
            <div className="avatar-container mb-4">
                {/* Image upload */}
                <div className="row">
                    <div className="col-3"></div>
                    <div className="mb-3 col-6">
                        <div className="upload-area">
                            <i className="bi bi-cloud-arrow-up upload-icon"></i>
                            <div>Upload ảnh</div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
                <p className="mt-2 text-dark small">Dung lượng ảnh tối đa 1MB</p>
            </div>
            <form>
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="form-control"
                            value="thanglaso1"
                            readOnly
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Họ và Tên đệm</label>
                        <input
                            type="text"
                            className="form-control"
                            value="Phan Trọng"
                            readOnly
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            value="Thắng"
                            readOnly
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value="ptthang2910@gmail.com"
                            readOnly
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">SĐT</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Giới tính</label>
                        <div className="d-flex align-items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                id="male"
                                checked
                                value="male"
                                readOnly
                            />
                            <label htmlFor="male" className="form-check-label">Nam</label>

                            <input
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                readOnly
                            />
                            <label htmlFor="female" className="form-check-label">Nữ</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Ngày sinh</label>
                        <input
                            type="date"
                            className="form-control"
                            readOnly
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                    Cập nhật thông tin
                </button>
            </form>
        </div>
    );
};

export default AccountCustomer;
