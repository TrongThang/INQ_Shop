import { useCart } from "../../../context/CartContext";

export default function PayCart() {
    const { cart, checkCheckout,getTotalPrice } = useCart();
    return (
        <div className="card mb-4 fixed-bottom m-5 position-sticky border border-secondary">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="ms-10">
                        <h5 className="card-title mb-0">Tổng cộng <span className="text-danger"> ({cart.length})</span></h5>
                    </div>
                    <h2 className="text-danger mb-0">
                        {getTotalPrice().toLocaleString()} VNĐ  
                    </h2>
                </div>
                <button
                    className="btn btn-primary float-end fs-4 w-100"
                    onClick={() => checkCheckout()}
                >Thanh toán</button>
            </div>
        </div>
    );
}