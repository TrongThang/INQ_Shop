import InfoOrder from "../../component/User/Checkout/infoOrder";
import ListDeviceOrder from "../../component/User/Checkout/listDeviceOrder";

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