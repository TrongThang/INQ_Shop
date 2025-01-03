import { useCart } from "../../../context/CartContext";

export default function OneDeviceInCart({ device, index }) {
    //TO DO Add and Minus
    const { addToCart, handleInputQuantity , plusDeviceInCart, minusDeviceInCart, removeFromCart} = useCart();
    return (
        <div class="row align-items-center mb-3" key={index}>
            <div class="col-auto">
                <input class="form-check-input" type="checkbox" />
            </div>
            <div class="col-auto">
                <img src={device.image} alt={device.name} width="80" height="80" class="img-thumbnail" />
            </div>
            <div class="col" style={{maxWidth: "600px"}}>
                <h5 class="mb-0">{device.name}</h5>
            </div>
            <div class="col-auto">
                <div class="input-group input-group-sm" style={{ width: "120px" }}>
                    <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={() => minusDeviceInCart(device.idDevice)}
                        {...device.quantity <= 1 && { disabled: true }}
                    >-</button>
                    <input
                        type="text"
                        class="form-control text-center"
                        value={device.quantity}
                        onChange={(e) => handleInputQuantity(device.idDevice, e.target.value)}
                    />
                    <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={() => plusDeviceInCart(device.idDevice)}
                        // {...device.quantity >= device.quantityInStock && { disabled: true }}
                    >+</button>
                </div>
            </div>
            <div style={{maxWidth: "170px"}}>
                <p class="mb-0 fw-bold">{Number(device.sellingPrice).toLocaleString()} VNĐ</p>
            </div>
            <div style={{maxWidth: "170px"}}>
                <p class="mb-0 fw-bold">{(device.sellingPrice * device.quantity).toLocaleString()} VNĐ</p>
            </div>
            <div class="col-auto">
                <button
                    class="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(device.idDevice)}
                >Xóa</button>
            </div>
        </div>
    )
}