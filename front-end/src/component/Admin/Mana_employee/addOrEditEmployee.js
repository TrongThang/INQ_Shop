import AreaUploadImage from "../../Shared/areaUploadImage";

export default function AddOrEditEmployee({ data }) {
    
    return (
        <div class="bg-white p-4 rounded shadow-sm">
            <h5 class="mb-4">Thông tin chi tiết nhân viên</h5>
            <div class="row">
                <div class="col-md-8 col-xl-8">
                    <form>
                        <div class="row">
                            <div class="col-md-6 col-xl-6 form-group mb-3">
                                <label for="username" class="form-label">Tên tài khoản:</label>
                                <input type="text" id="username" class="form-control" value="inq@gmail.com" />
                            </div>
                            <div class="col-md-6 form-group mt-5">
                                <label class="form-label me-2">Giới tính:</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender" id="male" checked />
                                    <label class="form-check-label" for="male">Nam</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender" id="female" />
                                    <label class="form-check-label" for="female">Nữ</label>
                                </div>
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="lastname" class="form-label">Họ:</label>
                                <input type="text" id="lastname" class="form-control" value="Phan" />
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="firstname" class="form-label">Tên:</label>
                                <input type="text" id="firstname" class="form-control" value="Trọng Thắng" />
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" id="email" class="form-control" value="anhquan@gmail.com" />
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="phone" class="form-label">Số điện thoại:</label>
                                <input type="text" id="phone" class="form-control" value="09112345678" />
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="dob" class="form-label">Ngày sinh:</label>
                                <input type="date" id="dob" class="form-control" />
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="position" class="form-label">Chức vụ:</label>
                                <select id="position" class="form-select status">
                                    <option selected>Quản lý sản phẩm</option>
                                    <option>Nhân viên bán hàng</option>
                                </select>
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="created" class="form-label">Ngày tạo:</label>
                                <input type="text" id="created" class="form-control" value="20/11/2023" readonly />
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="status" class="form-label">Trạng thái:</label>
                                <select id="status" class="form-select status">
                                    <option>Hoạt động</option>
                                    <option>Ngừng hoạt động</option>
                                    <option>Đang cập nhật</option>

                                </select>
                            </div>
                        </div>
                        <div class="text-end mt-4">
                            <button type="submit" class="btn btn-info text-white px-4">Lưu</button>
                        </div>
                    </form>
                </div>

                <AreaUploadImage image={data.image} />
            </div>
        </div>
    )
}