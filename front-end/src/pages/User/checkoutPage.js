import InfoOrder from "../../component/user/Checkout/infoOrder";
import ListDeviceOrder from "../../component/user/Checkout/listDeviceOrder";

export default function CheckoutPage() {
    return (
        <div className="">
            <div className="row">
                <InfoOrder />

                <ListDeviceOrder />
            </div>
        </div>
    )
}