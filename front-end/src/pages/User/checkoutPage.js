import { useEffect, useState } from "react";
import InfoOrder from "../../component/user/Checkout/infoOrder";
import ListDeviceOrder from "../../component/user/Checkout/listDeviceOrder";
import { useCart } from "../../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { cart } = useCart();
    const [phone, setPhone] = useState('');
    const [shippingMethod, setShippingMethod] = useState('COD');
    const [notes, setNotes] = useState('');
    const [choiceAddress, setChoiceAddress] = useState();
    const [deviceCheckout, setDeviceCheckout] = useState([])
    const [vnpayMethod, setVnpayMethod] = useState(''); 

    
    useEffect(() => {
        const filteredCart = cart.filter(item => item.status && item.stock >= item.quantity); 

        if (filteredCart.length <= 0) {
            navigate('/cart')
            return;
        }
    }, [])

    useEffect(() => {
        const filteredCart = cart.filter(item => item.status && item.stock >= item.quantity && item.quantity > 0);
        setDeviceCheckout(filteredCart);
    }, cart)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const vnp_ResponseCode = params.get('vnp_ResponseCode');
        let result;

        if (vnp_ResponseCode) {
            if (vnp_ResponseCode === '00') {
                result = Swal.fire({
                    title: 'Thanh toán thành công!',
                    text: 'Đơn hàng của bạn đã được xử lý.',
                    icon: 'success'
                });
            }
            else if (vnp_ResponseCode === 'fail') {
                result = Swal.fire({
                    title: 'Thanh toán thất bại!',
                    text: 'Vui lòng thử lại.',
                    icon: 'error'
                });
            } else if (vnp_ResponseCode === 'invalid') {
                result = Swal.fire({
                    title: 'Lỗi xác thực!',
                    text: 'Dữ liệu thanh toán không hợp lệ.',
                    icon: 'warning'
                });
            }

            if (result.isConfirmed) {
                navigate("/cart");
            }
        } 
    }, [location]);

    return (
        <div className="">
            <div className="row">
                <InfoOrder
                    phone={phone} shippingMethod={shippingMethod}
                    notes={notes} choiceAddress={choiceAddress}
                    setPhone={setPhone} setShippingMethod={setShippingMethod}
                    setNotes={setNotes} setChoiceAddress={setChoiceAddress}
                    setVnpayMethod={setVnpayMethod}
                />

                <ListDeviceOrder
                    phone={phone} shippingMethod={shippingMethod}
                    notes={notes} choiceAddress={choiceAddress}
                    deviceCheckout={deviceCheckout} vnpayMethod={vnpayMethod}
                />
            </div>
        </div>
    )
}