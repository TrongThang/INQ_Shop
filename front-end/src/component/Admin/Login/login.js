import React from "react";

const Login = ({ username, setUsername, password, setPassword, handleLogin, errorMessage }) => {
  return (
    <>
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
              <h5 className="modal-title" id="loginModalLabel">
                ĐĂNG NHẬP
              </h5>
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
              </form>
              {/* Display error message if any */}
              {errorMessage && (
                <div className="alert alert-danger mt-3">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
