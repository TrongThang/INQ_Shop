import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import StarRating from "../../component/Shared/starRating";

const DeviceCard = ({ device }) => {
    const { addToCart } = useCart();

    return (
        <div className="device-items wow fadeInUp me-3 mb-5" data-wow-delay="0.2s" style={{ padding: "0px"}}>
            <div
                className="service-item"
            >
                <div className="service-img">
                    <div
                        className="img-change"
                        onClick={() => addToCart(device, 1)}
                    >
                        <img src={`/img/device/${device.image}`} className="img-fluid rounded-top w-100"
                            style={{ height: "300px", objectFit: "cover" }}
                            alt="Smart Lighting"
                        />
                    </div>
                </div>
                <div className="service-content p-4">
                    <div className="service-content-inner" >
                        <Link
                            to={`/device/${device.slug}`}
                            className="line-clamp-title-device h4 text-decoration-none"
                            style={{ maxHeight: "55px", minHeight: "55px" }}
                        >{device.name}</Link>
                        <p className="mb-1 text-primary fw-bold">
                            {Number(device.sellingPrice).toLocaleString()} VNĐ
                        </p>
                        <p className="mb-1">
                            <StarRating rating={device.reviews?.[0]?.averageRating ?? 0} />
                        </p>
                        <p className="mb-1 line-clamp-p">
                            {device.descriptionNormal}
                        </p>
                        <a href={`/device/${device.slug}`}   className="btn btn-primary rounded-pill py-2 px-4">Chi tiết</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeviceCard;