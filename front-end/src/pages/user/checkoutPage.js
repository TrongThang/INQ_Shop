import InfoOrder from "../../component/user/Checkout/infoOrder";
import ListDeviceOrder from "../../component/user/Checkout/listDeviceOrder";

export default function CheckoutPage() {
    return (
        <div class="">
            <div class="row">
                <InfoOrder />

                <ListDeviceOrder />
            </div>
        </div>
    )
}