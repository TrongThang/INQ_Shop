import InfoAddress from "../../component/user/Cart/infoAddress";
import AllDeviceInCart from "../../component/user/Cart/allDeviceInCart";
import PayCart from "../../component/user/Cart/payCart";

export default function CartPage() {
    return (
        <div className="container mt-4">
            <InfoAddress />
            <AllDeviceInCart />
            <PayCart />
        </div>
    )
}