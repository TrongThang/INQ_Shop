import { useEffect, useState } from "react";
import InfoOrder from "../../component/user/Checkout/infoOrder";
import ListDeviceOrder from "../../component/user/Checkout/listDeviceOrder";
import { ToastContainer } from "react-toastify";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
    const { cart } = useCart();
    const [phone, setPhone] = useState('');
    const [shippingMethod, setShippingMethod] = useState('COD');
    const [notes, setNotes] = useState('');
    const [choiceAddress, setChoiceAddress] = useState();
    const [deviceCheckout, setDeviceCheckout] = useState([])

    useEffect(() => {
        setDeviceCheckout(cart);
    }, cart)

    return (
        <div className="">
            <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                autoClose={2000}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="row">
                <InfoOrder
                    phone={phone} shippingMethod={shippingMethod}
                    notes={notes} choiceAddress={choiceAddress}
                    setPhone={setPhone} setShippingMethod={setShippingMethod}
                    setNotes={setNotes} setChoiceAddress={setChoiceAddress}
                />

                <ListDeviceOrder
                    phone={phone} shippingMethod={shippingMethod}
                    notes={notes} choiceAddress={choiceAddress}
                    deviceCheckout={deviceCheckout}
                />
            </div>
        </div>
    )
}