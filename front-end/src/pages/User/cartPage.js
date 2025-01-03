import InfoAddress from "../../component/user/Cart/infoAddress";
import AllDeviceInCart from "../../component/user/Cart/allDeviceInCart";
import PayCart from "../../component/user/Cart/payCart";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
    return (
        <div class="container mt-4">
            <InfoAddress />
            <AllDeviceInCart />
            <PayCart />
        </div>
    )
}