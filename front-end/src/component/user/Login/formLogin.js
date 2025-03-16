import React from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Login = ({
  username, setUsername,
  password, setPassword,
  handleLogin, errorMessage,
  failedAttempts, setCaptchaToken
}) => {
  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">ĐĂNG NHẬP</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Tài khoản hoặc Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Hiển thị reCAPTCHA nếu nhập sai >= 3 lần */}
              {failedAttempts >= 3 && (
                <div className="mb-3">
                  <ReCAPTCHA
                    sitekey="6LejX9kqAAAAAD18D6NJKXI_MrB8QNnMlLdJIhJi"  // Thay bằng sitekey thật của bạn
                    onChange={(token) => {
                      setCaptchaToken(token);
                    }}
                  />
                </div>
              )}

              <div className="mb-3 text-end">
                <Link to="/forgot-password">Quên mật khẩu?</Link>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-2">
                Đăng nhập
              </button>
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                Đăng ký ngay
              </button>
            </form>

            {/* Hiển thị thông báo lỗi nếu có */}
            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
