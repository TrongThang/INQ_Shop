import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext"
import { Link } from "react-router-dom";

export default function InfoAddress() {
    const { customer } = useCart();
    const [address, setAddress] = useState(null);

    const fetchDataCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/addressBook/${customer.id}`)
            if (!response.ok) {
                throw new Error("Lỗi lấy dữ liệu từ khách hàng");
            }
            const result = await response.json()

            const defaultAddress = result.data.find((address) => address.isDefault === true);
            setAddress(defaultAddress || null);
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        fetchDataCustomer();
    }, [customer.id])
    return (
        <div className="card mb-4 border">
            <div className="card-body">
                <h5 className="card-title">Giao tận nơi</h5>
                <p className="card-text">
                    <div>
                        <strong>Người nhận:</strong> {customer.surname} {customer.lastName}
                    </div>

                    {address != null ? (
                        <p>
                            <strong>Địa chỉ:</strong>
                            <span>
                                {address.street}, {address.ward}, {address.district}, {address.city}
                                <Link to="/profile/address" className="text-primary ms-2"> <u>Thay đổi</u></Link>
                            </span>
                        </p>
                    ) : (<p className="text-danger fw-bold">
                            Bạn chưa thiết lập địa chỉ mặc định
                            <Link to="/profile/address" className="text-primary ms-2"> <u>Thiết lập</u></Link>
                    </p>)}
                    
                </p>
            </div>
        </div>
    )
}