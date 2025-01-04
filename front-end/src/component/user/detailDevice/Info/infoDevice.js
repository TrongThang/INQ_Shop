import { useState } from "react";
import { useCart } from "../../../../context/CartContext";
import AreaInteraction from "./areaInteracion";

export default function InfoDevice({ device, customerLiked = false }) {
    const [quantity, setQuantity] = useState(1);

    customerLiked = true;
    const { addToCart } = useCart();

    if (!device || !device.categoryDevice) {
        return <div>Đang tải...</div>;
    }

    return (
        <div class="col-xl-7 mb-4">
            <span>{device.categoryDevice.nameCategory} 
                {customerLiked
                    ? <span><i class="fa-solid fa-heart text-danger ms-2"></i></span>
                    : <span><i class="fa-regular fa-heart text-danger ms-2"></i></span>
                }
            </span>
            <h1>
        {device.name}       
                <div>
                    
                    
                    
                </div>
            </h1>
            <div class="rating d-flex align-items-center">
            <div>
                {/* {[...Array(device.starRating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-warning"></i>
                ))}
                {[...Array(5 - device.starRating)].map((_, i) => (
                    <i key={i + device.starRating} className="far fa-star text-warning"></i>
                ))} */}
            </div>

                <span class="ms-2 text-muted">({ device.starRating }/5)</span>
            </div>
            <h4><strong>Giá:</strong> <span class="text-primary fw-bold">{Number(device.sellingPrice).toLocaleString()}</span> VNĐ</h4>
            
            <AreaInteraction setQuantity={setQuantity} />

            <button
                class="btn btn-outline-primary btn-lg me-2"
                onClick={() => addToCart(device, quantity)}
            >
                <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
            </button>
            <a href="#" class="btn btn-primary btn-lg">Mua Ngay</a>

        </div>
    );
}