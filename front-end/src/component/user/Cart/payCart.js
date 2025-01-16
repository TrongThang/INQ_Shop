import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import axios from "axios";
import Swal from 'sweetalert2';

export default function PayCart() {
    const navigate = useNavigate()
    const { cart, getTotalItem, getTotalPrice } = useCart();

    const checkCheckout = async () => {
        const filteredCart = cart.filter(item => item.status && item.stock >= item.quantity);
        if (filteredCart.length <= 0) {
            const result = await Swal.fire({
                title: 'Thông báo',
                text: 'Không còn sản phẩm nào trong giỏ hàng có thể đáp ứng điều kiện đặt hàng!',
                icon: 'error',
                confirmButtonText: 'Xác nhận',
            });
            return;
        }
        
        const response = await axios.post('http://localhost:8081/api/device/check-list', 
            { products: cart }
        );
        
        if (response.data.errorCode === 0) {
            navigate("/checkout");
        }
        // else if (response.data.errorCode == 2) {
        //     toast.error('Sản phẩm bạn muốn mua hiện đã ngừng bán')
        // }
        else if (response.data.errorCode == 3) {
            const result = await Swal.fire({
                title: 'Lỗi!',
                text: 'Sản phẩm bạn muốn mua hiện đã có thay đổi về giá',
                icon: 'error',
            });
            if (result.isDenied) {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        } else if (response.data.errorCode == 4) {
            const nameDevice = response.data.nameDevice;
            const stockDeviceRemaining = response.data.stockDeviceRemaining;
            const quantityInitial = response.data.quantityInitial  ;
            const result =  await Swal.fire({
                title: 'Thông báo',
                html:
                    `Sản phẩm 
                        <b class="text-danger">${nameDevice}</b> mà bạn muốn mua hiện không đủ số lượng bán 
                        (${quantityInitial} / 
                        <b class="text-danger">${stockDeviceRemaining}</b> còn lại). Thanh toán mà không có sản phẩm này?
                    `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
            });

            if (result.isConfirmed) {
                navigate('/checkout');
            }
            if (result.isDismissed) {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
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