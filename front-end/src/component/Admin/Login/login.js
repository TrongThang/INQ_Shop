export default function Login() {
    return (
            <div className="d-flex align-items-center justify-content-center w-100 mt-3" >
                <div className="card auth-card mb-0 mx-3" style={{minWidth:"500px"}}>
                    <div className="card-body">
                        <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                            <img src="https://placehold.co/300x300" width="180" alt="" />
                        </a>
                        <form>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Tên đăng nhập</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-4">
                                <label for="exampleInputPassword1" className="form-label">Mật khẩu</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="form-check me-3">
                                    <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked />
                                    <label className="form-check-label text-dark" for="flexCheckChecked">
                                        Ghi nhớ mật khẩu
                                    </label>
                                </div>
                                {/* <a className="text-primary fw-bold" href="./index.html">Quên mật khẩu?</a> */}
                            </div>
                            <a href="./index.html" className="btn btn-primary w-100 fs-4 mb-4">Đăng nhập</a>
                        </form>
                    </div>
                </div>
            </div>
    )
}