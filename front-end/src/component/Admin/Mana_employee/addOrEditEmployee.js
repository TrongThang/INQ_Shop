import AreaUploadImage from "../../Shared/areaUploadImage";

export default function AddOrEditEmployee({ data }) {
    
    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin chi tiết nhân viên</h5>
            <div className="row">
                <div className="col-md-8 col-xl-8">
                    <form>
                        <div className="row">
                            <div className="col-md-6 col-xl-6 form-group mb-3">
                                <label for="username" className="form-label">Tên tài khoản:</label>
                                <input type="text" id="username" className="form-control" value="inq@gmail.com" />
                            </div>
                            <div className="col-md-6 form-group mt-5">
                                <label className="form-label me-2">Giới tính:</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="male" checked />
                                    <label className="form-check-label" for="male">Nam</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="female" />
                                    <label className="form-check-label" for="female">Nữ</label>
                                </div>
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="lastname" className="form-label">Họ:</label>
                                <input type="text" id="lastname" className="form-control" value="Phan" />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="firstname" className="form-label">Tên:</label>
                                <input type="text" id="firstname" className="form-control" value="Trọng Thắng" />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="email" className="form-label">Email:</label>
                                <input type="email" id="email" className="form-control" value="anhquan@gmail.com" />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="phone" className="form-label">Số điện thoại:</label>
                                <input type="text" id="phone" className="form-control" value="09112345678" />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="dob" className="form-label">Ngày sinh:</label>
                                <input type="date" id="dob" className="form-control" />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="position" className="form-label">Chức vụ:</label>
                                <select id="position" className="form-select status">
                                    <option selected>Quản lý sản phẩm</option>
                                    <option>Nhân viên bán hàng</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="created" className="form-label">Ngày tạo:</label>
                                <input type="text" id="created" className="form-control" value="20/11/2023" readonly />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label for="status" className="form-label">Trạng thái:</label>
                                <select id="status" className="form-select status">
                                    <option>Hoạt động</option>
                                    <option>Ngừng hoạt động</option>
                                    <option>Đang cập nhật</option>

                                </select>
                            </div>
                        </div>
                        <div className="text-end mt-4">
                            <button type="submit" className="btn btn-info text-white px-4">Lưu</button>
                        </div>
                    </form>
                </div>

                <AreaUploadImage image={data.image} />
            </div>
        </div>
    )
}