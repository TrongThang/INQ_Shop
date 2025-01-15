import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PayCart() {
    const navigate = useNavigate()
    const { cart, getTotalItem, getTotalPrice } = useCart();
    const checkCheckout = async () => {
        const response = await axios.post('http://localhost:8081/api/device/check-list', 
            { products: cart }
        );

        console.log('data:',response.data)
        if (response.data.errorCode === 0) {
            navigate("/checkout");
        }
        else if (response.data.errorCode == 2) {
            toast.error('Sản phẩm bạn muốn mua hiện đã ngừng bán')
            setTimeout(() => {
                navigate("/cart");
            }, 1500);
        }
        else if (response.data.errorCode == "3") {
            toast.error('Sản phẩm bạn muốn mua hiện đã có thay đổi về giá, vui lòng reload lại trang web')
            // navigate("/cart");
        }else if (response.data.errorCode == 4) {
            toast.error('Sản phẩm bạn muốn mua hiện không đủ số lượng bán')
            // navigate("/cart");
        }
    }
    return (
        <div className="card mb-4 fixed-bottom m-5 position-sticky border border-secondary">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="ms-10">
                        <h5 className="card-title mb-0">Tổng cộng <span className="text-danger"> ({getTotalItem()})</span></h5>
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