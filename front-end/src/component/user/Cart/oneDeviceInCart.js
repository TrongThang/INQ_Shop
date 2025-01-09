import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export default function OneDeviceInCart({ device }) {
    console.log('Sản phẩm trong giỏ hàng:', device);
    
    //TO DO Add and Minus
    const { addToCart, handleInputQuantity , removeFromCart} = useCart();
    return (
        <div className="row align-items-center mb-3">
            <div className="col-auto">
                <input className="form-check-input" type="checkbox" />
            </div>
            <div className="col-auto">
                <img src={`/img/device/${device.image}`} alt={device.name} width="80" height="80" className="img-thumbnail" />
            </div>
            <Link to={`/device/${device.slug}`} className="col" style={{maxWidth: "600px"}}>
                <h5 className="mb-0">{device.name}</h5>
            </Link>
            <div className="col-auto">
                <div className="input-group input-group-sm" style={{ width: "120px" }}>
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => addToCart(device, -1)}
                        {...device.quantity <= 1 && { disabled: true }}
                    >-</button>
                    <input
                        type="text"
                        className="form-control text-center"
                        value={device.quantity}
                        onChange={(e) => handleInputQuantity(device, e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => addToCart(device, 1)}
                        // {...device.quantity >= device.quantityInStock && { disabled: true }}
                    >+</button>
                </div>
            </div>
            <div style={{maxWidth: "170px"}}>
                <p className="mb-0 fw-bold">{Number(device.sellingPrice).toLocaleString()} VNĐ</p>
            </div>
            <div style={{maxWidth: "170px"}}>
                <p className="mb-0 fw-bold">{(device.sellingPrice * device.quantity).toLocaleString()} VNĐ</p>
            </div>
            <div className="col-auto">
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(device.idDevice)}
                >Xóa</button>
            </div>
        </div>
    )
}