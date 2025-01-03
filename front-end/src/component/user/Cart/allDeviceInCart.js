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
        <div class="card mb-4">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="selectAll" />
                        <label class="form-check-label" for="selectAll">Chọn tất cả</label>
                    </div>
                    <button class="btn btn-link text-danger p-0" onClick={removeAllCart}>Xóa hết</button>
                </div>
                
                {cart.map((device, index) => (
                    <OneDeviceInCart device={device} index ={index} />
                ))}
            </div>
        </div>
    )
}