import { useEffect, useState } from "react";
import InfoOrder from "../../component/user/Checkout/infoOrder";
import ListDeviceOrder from "../../component/user/Checkout/listDeviceOrder";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate()
    const { cart } = useCart();
    const [phone, setPhone] = useState('');
    const [shippingMethod, setShippingMethod] = useState('COD');
    const [notes, setNotes] = useState('');
    const [choiceAddress, setChoiceAddress] = useState();
    const [deviceCheckout, setDeviceCheckout] = useState([])

    
    useEffect(() => {
        const filteredCart = cart.filter(item => item.status && item.stock >= item.quantity); 
            console.log('length:', filteredCart.length)
            if (filteredCart.length <= 0) {
                navigate('/cart')
                return;
            }
    }, [])

    useEffect(() => {
        const filteredCart = cart.filter(item => item.status && item.stock >= item.quantity);
        setDeviceCheckout(filteredCart);
    }, cart)

    return (
        <div className="">
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