import OneDeviceInCart from "./oneDeviceInCart";
import { useCart } from "../../../context/CartContext";

export default function AllDeviceInCart() {
    const { cart, removeAllCart  } = useCart();
    if (cart.length === 0) {
        return (
            <div className="bg-light p-4 rounded fs-3">
                <p>Không có Sản phẩm trong giỏ hàng</p>
            </div>
        )
    }
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                    <div className="form-check">
                        {/* <input className="form-check-input" type="checkbox" id="selectAll" /> */}
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={removeAllCart}>
                        <i class="fa-solid fa-trash"></i>
                        <span> Xóa hết</span>
                    </button>
                </div>
                
                {cart.map((device, index) => (
                    <OneDeviceInCart device={device} key={index} />
                ))}
            </div>
        </div>
    )
}