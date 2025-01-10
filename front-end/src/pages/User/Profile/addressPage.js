import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../../../component/user/Profile/navCustomer/profileSidebar';
import AddressItems from '../../../component/user/Profile/addressItems';
import PopupAddress from '../../../component/user/Profile/popupAddress';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
const AddressPage = () => {
    const [addressBook, setAddressBook] = useState([]); // Danh sách địa chỉ
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị popup
    const [selectedAddress, setSelectedAddress] = useState(null); // Địa chỉ được chọn để cập nhật
    const [formData, setFormData] = useState({ // Dữ liệu của form (thêm mới hoặc cập nhật)
        phone: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        isDefault: 0
    });
    const navigate = useNavigate(); // Hàm điều hướng đến trang khác
    const [idCustomer, setIdCustomer] = useState(null); // State for idCustomer
    const [loading, setLoading] = useState(true);
    const toggleModal = () => setShowModal(!showModal); // Hàm chuyển đổi trạng thái hiển thị modal

    // Get the idCustomer from the JWT token stored in localStorage
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token); // Decode the JWT token
            setIdCustomer(decoded.idPerson); // Set idCustomer from decoded token
        }
        setLoading(false);
        document.title = 'Địa chỉ | INQ';

    }, []);

    // Lắng nghe sự thay đổi của idCustomer
    // Lắng nghe sự thay đổi của idCustomer
    useEffect(() => {
        if (loading) return; // Nếu đang loading, không thực hiện gì
        if (!idCustomer) {
            console.log("Điều hướng về trang chủ vì idCustomer không hợp lệ");
            navigate('/'); // Điều hướng về trang chủ nếu không có idCustomer
        } else {
            fetchDataAddressBook(); // Nếu có idCustomer, lấy danh sách địa chỉ
        }
    }, [idCustomer, navigate, loading]); // Lắng nghe sự thay đổi của idCustomer và điều hướng

    // Lấy danh sách địa chỉ cho khách hàng cụ thể
    const fetchDataAddressBook = async () => {
        if (!idCustomer) return; // Only fetch if idCustomer is available
        try {
            const response = await fetch(`http://localhost:8081/api/addressBook/${idCustomer}`);
            const result = await response.json();
            setAddressBook(result.data); // Cập nhật danh sách địa chỉ
        } catch (err) {
            console.error(err); // In lỗi nếu có lỗi khi lấy dữ liệu
        }
    };

    // Xử lý khi nhấn vào "Cập nhật" địa chỉ
    const handleUpdateClick = (address) => {
        setSelectedAddress(address); // Chọn địa chỉ cần cập nhật
        setFormData({
            phone: address.customer.phone,
            city: address.city,
            district: address.district,
            ward: address.ward,
            street: address.street,
            isDefault: address.isDefault
        });
        toggleModal(); // Mở modal để cập nhật địa chỉ
    };

    // Xử lý thay đổi giá trị trong form
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Cập nhật trạng thái mặc định của địa chỉ
    const isStatus = async (id, isDefault) => {
        try {
            // Ensure isDefault is either 0 or 1 before sending
            const isDefaultValue = isDefault ? 1 : 0;

            const response = await fetch(`http://localhost:8081/api/addressBook/${id}/${idCustomer}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idCustomer, isDefault: isDefaultValue }), // Pass corrected isDefault
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Cập nhật trạng thái thành công:', result.data.isDefault);
                alert('Cập nhật trạng thái thành công!');
                console.log('IsStatus', result.data);

                // Make sure the UI reflects the changes immediately
                setAddressBook(prevState => prevState.map(address =>
                    address.id === id ? { ...address, isDefault: isDefaultValue } : address
                ));
                fetchDataAddressBook(); // Refresh address list
            } else {
                alert(result.message || 'Có lỗi xảy ra khi cập nhật trạng thái.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            alert('Không thể cập nhật trạng thái. Vui lòng thử lại.');
        }
    };

    // Xử lý xóa địa chỉ
    const handleDeleteClick = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
            try {
                console.log('Đang xóa địa chỉ với id:', id, 'của khách hàng:', idCustomer); // Kiểm tra log
                const response = await fetch(`http://localhost:8081/api/addressBook/${id}/${idCustomer}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                if (response.ok) {
                    setAddressBook(prevState => prevState.filter(address => address.id !== id)); // Xóa địa chỉ trong danh sách
                    alert('Xóa địa chỉ thành công!');
                } else {
                    console.error('Lỗi:', result.message); // In ra lỗi nếu có
                    alert(result.message || 'Không thể xóa địa chỉ. Trạng thái của địa chỉ phải là 0.');
                }
            } catch (error) {
                console.error('Lỗi:', error); // In lỗi nếu có sự cố khi xóa
                alert('Không thể xóa địa chỉ. Vui lòng thử lại.'); // Thông báo lỗi cho người dùng
            }
        }
    };

    // Xử lý gửi form (thêm mới hoặc cập nhật địa chỉ)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        const newAddress = {
            ...formData,
            idCustomer,
            isDefault: formData.isDefault ? 1 : 0
        }; // Only pass idCustomer once, not in isDefault

        const addressId = selectedAddress ? selectedAddress.id : null;

        if (addressId) {
            // Update the current address (PUT request)
            try {
                const response = await fetch(`http://localhost:8081/api/addressBook/${addressId}/${idCustomer}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newAddress),
                });

                const result = await response.json();
                if (response.ok) {
                    setAddressBook(prevState => prevState.map(address =>
                        address.id === addressId ? result.data : address
                    ));
                    toggleModal(); // Close the modal after successful update
                    console.log('Handlesubmit', result.data);
                } else {
                    console.error('Error:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // Add new address (POST request)
            try {
                const response = await fetch('http://localhost:8081/api/addressBook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newAddress),
                });

                const result = await response.json();
                if (response.ok) {
                    setAddressBook(prevState => [...prevState, result.data]); // Add the new address to the list
                    toggleModal(); // Close modal after adding
                    window.location.reload(); // Refresh the page
                } else {
                    console.error('Error:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };


    // Đặt lại dữ liệu form khi thêm địa chỉ mới
    const handleAddClick = () => {
        setSelectedAddress(null); // Xóa địa chỉ đã chọn (nếu có)
        setFormData({
            phone: '',
            city: '',
            district: '',
            ward: '',
            street: '',
            isDefault: 0
        });
        toggleModal(); // Mở modal để thêm mới địa chỉ
    };


    return (
        <>

            <div className='container-fluid'>
                <div className='row ms-4'>
                    <ProfileSidebar />
                    <div className="form-container col-md-8 col-lg-6 me-auto py-4 mt-4 shadow-sm rounded">
                        <div className="profile-address mb-3 d-flex justify-content-between align-items-center">
                            <h1 className="mb-1 fs-4">Địa chỉ của tôi</h1>
                            <button className="btn btn-primary" onClick={handleAddClick}>Thêm địa chỉ mới</button>
                        </div>

                        <div className="container mt-4 border border-dark rounded p-3">
                            <h5 className="fw-bold mb-2">Địa chỉ</h5>
                            {addressBook.length > 0 ? addressBook.map((address, index) => (
                                <AddressItems addressBook={address}
                                    onUpdateClick={handleUpdateClick}
                                    handleDeleteClick={handleDeleteClick}
                                    isStatus={isStatus} key={index} />
                            )) : <p>Ko có địa chỉ.</p>}
                        </div>
                    </div>
                </div>

                {/* Popup thêm mới địa chỉ */}
                {showModal && (
                    <PopupAddress
                        showModal={showModal}
                        toggleModal={toggleModal}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        customerAddresses={addressBook}
                        selectedAddress={selectedAddress}
                    />
                )}
            </div>
        </>

    );
};

export default AddressPage;
