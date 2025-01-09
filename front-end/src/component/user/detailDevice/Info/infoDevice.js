import { useState } from "react";
import { useCart } from "../../../../context/CartContext";
import AreaInteraction from "./areaInteracion";
import StarRating from "../../../Shared/starRating";

export default function InfoDevice({ device, customerLiked = false }) {
    const [quantity, setQuantity] = useState(1);
    customerLiked = true;
    const { addToCart } = useCart();

    if (!device || !device.categoryDevice) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="col-xl-7 mb-4">
            <span>{device.categoryDevice.nameCategory} 
                {customerLiked
                    ? <span><i className="fa-solid fa-heart text-danger ms-2"></i></span>
                    : <span><i className="fa-regular fa-heart text-danger ms-2"></i></span>
                }
            </span>
            <h1>
                {device.name}
            </h1>
            <div className="rating d-flex align-items-center">
                <div>
                    <StarRating rating={device.averageRating} />
                </div>
            </div>
            <h4><strong>Giá:</strong> <span className="text-primary fw-bold">{Number(device.sellingPrice).toLocaleString()}</span> VNĐ</h4>
            
            <AreaInteraction setQuantity={setQuantity} />

            <button
                className="btn btn-outline-primary btn-lg me-2"
                onClick={() => {
                    console.log('Số lượng sản phẩm thêm vào giỏ: ',quantity)
                    return addToCart(device, quantity)
                }}
            >
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
            </button>
            <a href="#" className="btn btn-primary btn-lg">Mua Ngay</a>

        </div>
    );
}