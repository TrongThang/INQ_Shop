import InfoAddress from "../../component/user/Cart/infoAddress";
import AllDeviceInCart from "../../component/user/Cart/allDeviceInCart";
import PayCart from "../../component/user/Cart/payCart";
import { useEffect } from "react";

export default function CartPage() {
    useEffect(() => {
        document.title = 'Giỏ hàng | INQ'
    }, [])
    
    return (
        <div className="container mt-4">
            <InfoAddress />
            <AllDeviceInCart />
            <PayCart />
        </div>
    )
}