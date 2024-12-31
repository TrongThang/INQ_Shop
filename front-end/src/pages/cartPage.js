import InfoAddress from "../component/user/Cart/infoAddress";
import AllDeviceInCart from "../component/user/Cart/allDeviceInCart";
import PayCart from "../component/user/Cart/payCart";

export default function CartPage() {
    const devices = [
        {
            image: "https://placehold.co/200x200",
            name: "Camera chống trộm",
            quantity: 1,
            sellingPrice: 1992000,
        },
        {
            image: "https://placehold.co/200x200",
            name: "Thiết bị báo cháy",
            quantity: 1,
            sellingPrice: 1500000,
        },
        {
            image: "https://placehold.co/200x200",
            name: "Thiết bị tưới nước tự động",
            quantity:2,
            sellingPrice: 500000,
        }
    ];

    return (
        <div class="container mt-4">
            <InfoAddress />
            <AllDeviceInCart devices={devices} />
            <PayCart devices={devices} />
        </div>
    )
}