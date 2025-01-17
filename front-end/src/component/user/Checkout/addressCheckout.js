import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext"
import { Link } from "react-router-dom";
import ModalAddress from "./modalAddress";

export default function AddressCheckout({ choiceAddress, setChoiceAddress }) {
    const { customer } = useCart();
    const [listAddress, setListAddress] = useState([]);

    const fetchDataCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/addressBook/${customer.id}`)
            if (!response.ok) {
                throw new Error("Lỗi lấy dữ liệu sổ địa chỉ của khách hàng");
            }
            const result = await response.json()

            const listAddress = result.data;
            console.log(listAddress)
            setListAddress(listAddress || []);
            const defaultAddress = result.data.find((address) => address.isDefault === true);
            setChoiceAddress(defaultAddress || null);
        } catch (error) {
            throw new Error(`Lỗi: ${error.message}`);
            
        }
    }
    
    useEffect(() => {
        fetchDataCustomer();
    }, [customer.id])

    const handleSetChoiceAddress = (addressBook) => {
        setChoiceAddress(addressBook);
    }

    return (
        <div className="card mb-1 border">
            <div className="card-body">
                <button
                    type="button"
                    className="btn btn-outline-danger text-decoration-none"
                    data-bs-toggle="modal" data-bs-target="#modalAddress"
                >
                    <u>Thiết lập</u>
                </button>
                <ModalAddress
                    listAddress={listAddress}
                    choiceAddress={choiceAddress} 
                    handleSetChoiceAddress={handleSetChoiceAddress}
                />
                
                <p className="card-text">
                    <div>
                        <strong>Người nhận:</strong> {customer.surname} {customer.lastName}
                    </div>

                    {choiceAddress != null ? (
                        <p>
                            <strong>Địa chỉ:</strong>
                            <span className="ms-2">
                                {choiceAddress.street}, {choiceAddress.ward}, {choiceAddress.district}, {choiceAddress.city}
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