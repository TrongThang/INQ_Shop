export default function Login() {
    return (
            <div class="d-flex align-items-center justify-content-center w-100 mt-3" >
                <div class="card auth-card mb-0 mx-3" style={{minWidth:"500px"}}>
                    <div class="card-body">
                        <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100">
                            <img src="https://placehold.co/300x300" width="180" alt="" />
                        </a>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Tên đăng nhập</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-4">
                                <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div class="form-check me-3">
                                    <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked />
                                    <label class="form-check-label text-dark" for="flexCheckChecked">
                                        Ghi nhớ mật khẩu
                                    </label>
                                </div>
                                {/* <a class="text-primary fw-bold" href="./index.html">Quên mật khẩu?</a> */}
                            </div>
                            <a href="./index.html" class="btn btn-primary w-100 fs-4 mb-4">Đăng nhập</a>
                        </form>
                    </div>
                </div>
            </div>
    )
}