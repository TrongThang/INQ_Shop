const LoginPopup = () => {
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
            <h5 className="modal-title text-primary" id="loginModalLabel">
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
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Tài khoản hoặc Email
                </label>
                <input type="text" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="mb-3 text-end">
                <a href="#">Quên mật khẩu?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2">
                Đăng nhập
              </button>
              <button type="button" className="btn btn-outline-primary w-100">
                Đăng ký ngay
              </button>
              <h5 className="text-center mt-3">- Hoặc -</h5>
              <button
                type="button"
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center mt-2"
              >
                <img
                  src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                  alt="Google"
                  className="me-2"
                />
                <span>Tiếp tục với Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
