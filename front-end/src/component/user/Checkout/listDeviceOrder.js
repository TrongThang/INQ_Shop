import { useCart } from "../../../context/CartContext"
import { ToastContainer } from 'react-toastify';

export default function ListDeviceOrder({ phone, shippingMethod, notes, choiceAddress, deviceCheckout }) {
    const { cart, getTotalPrice, checkoutCart } = useCart();
    return (
    <>
        <div className="col-md-7">
            <div className="row mb-5">
                <div className="col-md-12">
                    <div className="p-3 border border-secondary rounded me-4">
                        <table className="table site-block-order-table mb-5">
                            <thead className="border-bottom border-dark">
                                <th style={{width: "100px"}}>Ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </thead>
                            <tbody>
                                {cart
                                    ? deviceCheckout.map((device, index) => {
                                        if (device.status <= 0) {
                                            return <></>
                                        }
                                        return (
                                            <tr className="border-bottom border-dark">
                                                <td>
                                                    <img
                                                        src={`img/device/${device.image}`}
                                                        className="img-fluid"
                                                        style={{ maxWidth: "100px", height: "100px" }}
                                                        alt={device.name}
                                                    />
                                                </td>
                                                <td>
                                                    {device.name} <div className="text-danger fw-bold mt-3">x {device.quantity} </div>
                                                </td>
                                                <td className="text-nowrap">{Number(device.sellingPrice).toLocaleString()} VNĐ</td>
                                                <td className="text-nowrap">{(Number(device.sellingPrice) * Number(device.quantity)).toLocaleString()} VNĐ</td>
                                            </tr>
                                        )
                                    })
                                    : <span className="text-dark fw-bold">
                                        Không có sản phẩm trong giỏ hàng
                                    </span>
                                }
                            </tbody>
                        </table>
                        <div style={{fontSize: "25px"}} className="text-nowrap">
                            <td className="text-black font-weight-bold"><strong>Tổng đơn hàng:</strong></td>
                            <td className="text-danger font-weight-bold">
                                <strong>{ getTotalPrice().toLocaleString() } VNĐ</strong>
                            </td>
                        </div>
                        
                    </div>
                </div>
                <div className="form-group mt-5 mb-0">
                    <button
                        className="btn btn-black btn-primary w-100 py-3 btn-block fs-4"
                        onClick={() => checkoutCart(shippingMethod, notes, choiceAddress, deviceCheckout)}
                    >
                        <i className="fa-solid fa-cart-shopping"></i> Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}