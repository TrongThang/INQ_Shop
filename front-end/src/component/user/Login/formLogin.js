import React from "react";
import { Link } from "react-router-dom";

const Login = ({ username, setUsername, password, setPassword, handleLogin, errorMessage }) => {
  return (
    <div className="container">
    
     {/* Login Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">ĐĂNG NHẬP</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Tài khoản hoặc Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={username} // Bind to username state
                    onChange={(e) => setUsername(e.target.value)} // Update username on change
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password} // Bind to password state
                    onChange={(e) => setPassword(e.target.value)} // Update password on change
                    required
                  />
                </div>
                <div className="mb-3 text-end">
                  <a href="#">Quên mật khẩu?</a>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">
                  Đăng nhập
                </button>
                <Link to="/resgister" className="btn btn-outline-primary w-100 mb-2">
                  Đăng ký ngay
                </Link>
              </form>

              {/* Display error message if any */}
              {errorMessage && (
                <div className="alert alert-danger mt-3">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
