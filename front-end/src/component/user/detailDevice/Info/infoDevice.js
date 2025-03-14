import { useState, useEffect } from "react";
import { useCart } from "../../../../context/CartContext";
import AreaInteraction from "./areaInteracion";
import StarRating from "../../../Shared/starRating";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function InfoDevice({ device }) {
    const [quantity, setQuantity] = useState(1);
    const [customerLiked, setCustomerLiked] = useState();
    const [idCustomer, setIdCustomer] = useState(null);
    const [likeCount, setLikeCount] = useState();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode(token); // Decode the JWT token
          setIdCustomer(decoded.idPerson); // Set idCustomer from decoded token
        }
    }, []);
    
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/likedDevice/${idCustomer}/${device.idDevice}`);

                setCustomerLiked(!!response.data.data); // Backend trả về trạng thái yêu thích(chuyển đổi về boolean)
                setLikeCount(device.likeCount)
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
        try {
            if (!customerLiked) {
                // Gọi API để thêm vào danh sách yêu thích
                await axios.post("http://localhost:8081/api/likedDevice", { idDevice: device.idDevice, idCustomer: idCustomer });
                setLikeCount(likeCount => likeCount + 1);
            } else {
                // Gọi API để xóa khỏi danh sách yêu thích
                await axios.delete(`http://localhost:8081/api/likedDevice/${idCustomer}/${device.idDevice}`);
                setLikeCount(likeCount => likeCount - 1);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái yêu thích:", error);
        }
        setCustomerLiked(!customerLiked); // Đảo trạng thái yêu thích
    };

    return (
        <div class="col-xl-7 mb-4">
            <span>
                <i className="fa-solid fa-eye me-3"> 
                    <span> { device.views }</span>
                </i>
                {device.categoryDevice.nameCategory}
                <span onClick={toggleLike} style={{ cursor: "pointer" }}>
                    {idCustomer && (customerLiked ? (
                        <i className="fa-solid fa-heart text-danger ms-2"></i>
                    ) : (
                        <i className="fa-regular fa-heart text-danger ms-2"></i>
                    ))}
                </span>
            </span>
            <h1>
                {device.name}
            </h1>
            <div className="rating d-flex align-items-center">
                <div>
                    <StarRating rating={device.averageRating} />
                    <div>Yêu thích: <span className="text-danger fw-bold">{likeCount}</span></div>
                    {
                        (device.stock <= 0 || device.status <= 0)
                            ?   <div className="col-auto fw-bold badge badge-danger bg-danger fs-6 mb-2">
                                    Hết hàng
                                </div>
                            :   <><div className="col-auto fw-bold badge badge-success bg-success fs-6 mb-2 pe-1">
                                    Còn hàng:
                                </div>
                                    <span className="ms-2 text-success fw-bold">{device.stock}</span>
                                </>
                    } 
                </div>
            </div>
            <h4>
                <strong>Giá:</strong>
                <span className="text-primary fw-bold">
                    {Number(device.sellingPrice).toLocaleString()}
                </span> VNĐ
            </h4>

            <AreaInteraction setQuantity={setQuantity} />
            
            <button
                className="btn btn-outline-primary btn-lg me-2"
                onClick={() => {
                    return addToCart(device, quantity)
                }}
            >
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
            </button>
            <a href="#" className="btn btn-primary btn-lg">Mua Ngay</a>

        </div>
    );
}