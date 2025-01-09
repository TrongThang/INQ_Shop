export default function ListDeviceOrder() {
    return (
        <div className="col-md-6">
            <div className="row mb-5">
                <div className="col-md-12">
                    <div className="p-3 p-lg-5 border border-secondary rounded me-4">
                        <h2 className="h3 mb-3 text-black">Đơn hàng của bạn </h2>
                        <table className="table site-block-order-table mb-5">
                            <thead className="border-bottom border-dark">
                                <th>Ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Tổng tiền</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/100x100" />
                                    </td>
                                    <td>Đèn thông minh <strong className="mx-2">x</strong> 1</td>
                                    <td>250.000đ</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/100x100" />
                                    </td>
                                    <td>Camera chống trộm <strong className="mx-2">x</strong> 2</td>
                                    <td>550.000đ</td>
                                </tr>                                
                            </tbody>
                            <div style={{fontSize: "30px"}}>
                                <td className="text-black font-weight-bold"><strong>Tổng đơn hàng:</strong></td>
                                <td className="text-danger font-weight-bold"><strong>1.000.000đ</strong></td>
                            </div>
                        </table>
                        <div className="form-group">
                            <button className="btn btn-black btn-primary w-100 py-3 btn-block fs-4" onclick="window.location='thankyou.html'">
                                <i className="fa-solid fa-cart-shopping"></i> Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}