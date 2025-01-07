import React, {useEffect, useState} from 'react';
import ProfileSidebar from '../../../component/user/Profile/navCustomer/profileSidebar';
import AddressItems from '../../../component/user/Profile/addressItems';

const AddressPage = () => {
    const [address, setAddress] = useState([]);
    const fetchDataCategories = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/addressBook?id=1');
            const result = await response.json();

            setAddress(result.data);
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    useEffect(() => {
        fetchDataCategories()
    }, []);
    return (
        <div className='container-fluid'>
            <div className='row ms-4'>
                <ProfileSidebar />
                <div className="form-container col-md-8 col-lg-6 me-auto py-4 mt-4 shadow-sm rounded">
                    <div className="profile-address mb-3 d-flex justify-content-between align-items-center">
                        <h1 className="mb-1 fs-4">Địa chỉ của tôi</h1>
                        <button className="btn btn-primary">Thêm địa chỉ mới</button>
                    </div>
                    <div className="container mt-4 border border-dark rounded p-3">
                        <h5 className="fw-bold">Địa chỉ</h5>
                        <AddressItems />
                        <AddressItems />
                        <AddressItems />
                    </div>

                </div>

            </div>
        </div>
    )
};
export default AddressPage;