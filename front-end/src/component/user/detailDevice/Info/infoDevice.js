import AreaInteraction from "./areaInteracion";

export default function InfoDevice(device = null, customerLiked = false) {
    device = {
        category: {
            name: 'Đèn thông minh'
        },
        name: 'Đèn mặt trời tự động',
        starRating: 4,
        sellingPrice: "200.000",
    };
    customerLiked = true;

    return (
        <div class="col-xl-7 mb-4">
            <span>{ device.category.name }</span>
            <h1>
                {device.name} 
                <div>
                    {customerLiked
                        ? <span><i class="fa-solid fa-heart text-danger ms-2"></i></span>
                        : <span><i class="fa-regular fa-heart text-danger ms-2"></i></span>
                    }
                </div>
            </h1>
            <div class="rating d-flex align-items-center">
            <div>
                {[...Array(device.starRating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-warning"></i>
                ))}
                {[...Array(5 - device.starRating)].map((_, i) => (
                    <i key={i + device.starRating} className="far fa-star text-warning"></i>
                ))}
            </div>

                <span class="ms-2 text-muted">({ device.starRating }/5)</span>
            </div>
            <p><strong>Giá:</strong> {device.sellingPrice} VNĐ</p>
            
            <AreaInteraction />

            <a href="#" class="btn btn-outline-primary btn-lg me-2">
                <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
            </a>
            <a href="#" class="btn btn-primary btn-lg">Mua Ngay</a>

        </div>
    );
}