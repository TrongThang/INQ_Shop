const RegisterPopup = () => {
  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-primary" id="registerModalLabel">
              ĐĂNG KÝ
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
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Họ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Giới tính</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      defaultChecked
                      required
                    />
                    <label className="form-check-label" htmlFor="male">
                      Nam
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      required
                    />
                    <label className="form-check-label" htmlFor="female">
                      Nữ
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
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
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2">
                Đăng ký
              </button>
              <div className="text-center mb-3">
                <p>
                  Đã có tài khoản? <a href="#">Đăng nhập</a>
                </p>
              </div>
              <h5 className="text-center">- Hoặc -</h5>
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

export default RegisterPopup;
