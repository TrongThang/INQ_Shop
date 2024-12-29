import InfoOrder from "../component/Checkout/infoOrder";
import ListDeviceOrder from "../component/Checkout/listDeviceOrder";

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