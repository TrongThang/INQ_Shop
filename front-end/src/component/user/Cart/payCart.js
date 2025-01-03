import { useCart } from "../../../context/CartContext";

export default function PayCart() {
    const { cart, handleCheckout,getTotalPrice } = useCart();
    return (
        <div class="card mb-4 fixed-bottom m-5 position-sticky">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="ms-10">
                        <h5 class="card-title mb-0">Tổng cộng <span class="text-danger"> ({cart.length})</span></h5>
                    </div>
                    <h2 class="text-danger mb-0">
                        {getTotalPrice().toLocaleString()} VNĐ
                    </h2>
                </div>
                <button
                    class="btn btn-primary float-end fs-4 w-100"
                    onClick={handleCheckout}
                >Thanh toán</button>
            </div>
        </div>
    );
}