import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
    
      {/* Modal */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
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
              {/* Original Register Form */}
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-6 mb-1">
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
                          <div className="col-md-6 mb-1">
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
                        <div className="mb-1">
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
                        <div className="mb-2">
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
                        <div className="mb-1">
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
                        <div className="mb-1">
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
                        <div className="mb-1">
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
                        <button
                          type="submit"
                          className="btn btn-primary w-100 mb-2"
                        >
                          Đăng ký
                        </button>
                        <div className="text-center mb-2">
                          <p>
                            Đã có tài khoản?{" "}
                            <a href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#loginModal"
                            >Đăng nhập</a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Register Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
