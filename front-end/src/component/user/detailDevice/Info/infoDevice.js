import { useState, useEffect } from "react";
import { useCart } from "../../../../context/CartContext";
import AreaInteraction from "./areaInteracion";
import StarRating from "../../../Shared/starRating";
import axios from "axios";

export default function InfoDevice({ device }) {
    const [quantity, setQuantity] = useState(1);
    const [customerLiked, setCustomerLiked] = useState();

    const { addToCart } = useCart();
    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/likedDevice/CUS000001/${device.idDevice}`);
                setCustomerLiked(!!response.data.data); // Backend trả về trạng thái yêu thích(chuyển đổi về boolean)
            } catch (error) {
                console.error("Lỗi khi kiểm tra trạng thái yêu thích:", error);
            }
        };

        if (device && device.idDevice) {
            fetchLikedStatus();
        }
    }, [device]);

    if (!device || !device.categoryDevice) {
        return <div>Đang tải...</div>;
    }

    const toggleLike = async () => {
        console.log(customerLiked)
        try {
            if (!customerLiked) {
                // Gọi API để thêm vào danh sách yêu thích
                await axios.post("http://localhost:8081/api/likedDevice", { idDevice: device.idDevice, idCustomer: "CUS000001" });
                console.log("Đã thêm sản phẩm vào yêu thích:", device.name);
            } else {
                // Gọi API để xóa khỏi danh sách yêu thích
                await axios.delete(`http://localhost:8081/api/likedDevice/CUS000001/${device.idDevice}`);
                console.log("Đã xóa sản phẩm khỏi yêu thích:", device.name);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái yêu thích:", error);
        }
        setCustomerLiked(!customerLiked); // Đảo trạng thái yêu thích
    };

    return (
        <div class="col-xl-7 mb-4">
            <span>{device.categoryDevice.nameCategory}
                <span onClick={toggleLike} style={{ cursor: "pointer" }}>
                    {customerLiked ? (
                        <i className="fa-solid fa-heart text-danger ms-2"></i>
                    ) : (
                        <i className="fa-regular fa-heart text-danger ms-2"></i>
                    )}
                </span>
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