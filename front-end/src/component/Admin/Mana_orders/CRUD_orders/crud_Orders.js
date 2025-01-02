import React from "react";

const CRUD_orders = () => {
    return (
        <div className="main-content-inner">
            <div className="my-3">
                <a href="#">
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Thông tin chi tiết Đơn hàng</h5>
                <form>
                    <div className="row">
                        {/* ID Thuộc tính */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="id" className="form-label">
                                Mã đơn hàng:
                            </label>
                            <input type="text" id="id" className="form-control" value="TT001" readOnly />
                        </div>
                        {/* Người tạo */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="creator" className="form-label">
                                Nhân viên xác nhận:
                            </label>
                            <input
                                type="text"
                                id="creator"
                                className="form-control"
                                value="Trọng Thắng"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="row">
                        {/* Ngày tạo */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="created-date" className="form-label">
                                Ngày đặt:
                            </label>
                            <input
                                type="date"
                                id="created-date"
                                className="form-control"
                                value="2024-11-15"
                                readOnly
                            />
                        </div>
                        {/* Ngày sửa */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="updated-date" className="form-label">
                                Ngày cập nhật:
                            </label>
                            <input type="date" id="updated-date" className="form-control" value="2024-11-15" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-3">
                            <label htmlFor="name" className="form-label">
                                Tên khách hàng:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value="Phan Trọng Thắng"
                            />
                        </div>

                        <div className="mb-3 col-3">
                            <label htmlFor="category" className="form-label">
                                Nền tảng đặt hàng:
                            </label>
                            <select id="category" className="form-select">
                                <option value="camera">Website</option>
                            </select>
                        </div>

                        <div className="mb-3 col-3">
                            <label htmlFor="status" className="form-label">
                                Trạng thái:
                            </label>
                            <select id="status" className="form-select status">
                                <option>Trạng thái</option>
                                <option>Hoạt động</option>
                                <option>Ngừng hoạt động</option>
                                <option>Đang cập nhật</option>
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <h5>Danh sách sản phẩm</h5>
                        <table className="table site-block-order-table mb-5">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Sản phẩm</th>
                                    <th>Tổng tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/100x100" alt="Sản phẩm" />
                                    </td>
                                    <td>
                                        Đèn thông minh <strong className="mx-2">x</strong> 1
                                    </td>
                                    <td>250.000đ</td>
                                    <td>
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/100x100" alt="Sản phẩm" />
                                    </td>
                                    <td>
                                        Camera chống trộm <strong className="mx-2">x</strong> 2
                                    </td>
                                    <td>550.000đ</td>
                                    <td>
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/100x100" alt="Sản phẩm" />
                                    </td>
                                    <td>
                                        Vòi tưới tự động <strong className="mx-2">x</strong> 1
                                    </td>
                                    <td>200.000đ</td>
                                    <td>
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="text-black font-weight-bold">
                                        <strong>Tổng đơn hàng</strong>
                                    </td>
                                    <td className="text-danger font-weight-bold">
                                        <strong>1.000.000đ</strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn btn-primary text-white px-4">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CRUD_orders;
