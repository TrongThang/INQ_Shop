import React from "react";

const PasswordForm = () => {
    return (
        <div className="form-container col-lg-6 me-auto py-4 mt-4 rounded">
            <h1 className="password-title-h1 mb-1 fs-4">TẠO MẬT KHẨU</h1>
            <form className="px-xxl-4">
                <div className="mb-4 mt-4">
                    <label htmlFor="current-password" className="form-label">
                        Nhập mật khẩu hiện tại
                    </label>
                    <input
                        type="password"
                        id="current-password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu hiện tại"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="new-password" className="form-label">
                        Tạo mật khẩu mới
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        className="form-control mb-3"
                        placeholder="Nhập mật khẩu mới của bạn"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirm-password" className="form-label">
                        Xác nhận mật khẩu
                    </label>
                    <div className="input-group">
                        <input
                            type="password"
                            id="confirm-password"
                            className="form-control"
                            placeholder="Xác nhận lại mật khẩu"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100 password-cofrim">
                        XÁC NHẬN
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordForm;
