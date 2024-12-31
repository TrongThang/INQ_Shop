
const LoginPopup = () => {
  return (
        <div id="wrapper">
          <span className="icon-close">
            <ion-icon name="close-outline"></ion-icon>
          </span>

          <div className="form-box login">
            <h2 className="text-primary">ĐĂNG NHẬP</h2>
            <form action="#">
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail-outline"></ion-icon>
                </span>
                <input type="text" required />
                <label>Tài khoản hoặc Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                </span>
                <input type="password" required />
                <label>Mật khẩu</label>
              </div>
              <div className="forgot">
                <a href="#">Quên mật khẩu?</a>
              </div>
              <br />
              <button type="submit" className="btn-login">
                Đăng nhập
              </button>
              <button type="submit" className="btn-register">
                Đăng ký ngay
              </button>

              <h2>- Hoặc -</h2>

              <button type="button" className="btn-login-google">
                <img
                  src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                  alt=""
                />
                <span>Tiếp tục với Google</span>
              </button>
            </form>
          </div>
        </div>
      );}

export default LoginPopup;
