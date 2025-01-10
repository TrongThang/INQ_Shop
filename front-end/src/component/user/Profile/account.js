import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const AccountCustomer = () => {
    const [idCustomer, setIdCustomer] = useState(null);
    const [infoCustomer, setInfoCustomer] = useState({
        surname: "",
        lastName: "",
        email: "",
        phone: "",
        gender: 1,
        birthdate: "",
    });

    const updateInfoCustomer = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/api/customer/${idCustomer}`, infoCustomer);
            console.log(response);
            if (response.status === 200) {
                toast.success("Cập nhật thông tin thành công!");
            } else {
                toast.error("Cập nhật thất bại. Vui lòng thử lại.");
            }
        }
        catch (err) {
            toast.error("Đã xảy ra lỗi khi cập nhật thông tin.");
            console.error(err);
        }
    }

    const getInfoCustomer = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/customer/${idCustomer}`);
            setInfoCustomer(response.data.data);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token); // Decode the JWT token
            setIdCustomer(decoded.idPerson); // Set idCustomer from decoded token
        }
    }, []);

    useEffect(() => {
        if (idCustomer) {
            getInfoCustomer();
        }
    }, [idCustomer]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfoCustomer((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGenderChange = (event) => {
        const selectedGender = event.target.value === 'male' ? true : false;
        setInfoCustomer((prevState) => ({
            ...prevState,
            gender: selectedGender,
        }));
    };

    return (
        <>
            
            <div className="container-form col-md-8 col-lg-6 me-auto py-4 mt-4 shadow-sm rounded">
                <div className="profile-h1 mb-3">
                    <h1 className="mb-1 fs-4">Hồ Sơ của tôi</h1>
                    <p className="mb-2 fs-6 text-muted">Chỉnh sửa thông tin tài khoản</p>
                </div>
                <div className="avatar-container mb-4">
                    {/* Image upload */}
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="mb-3 col-6">
                            <div className="upload-area">
                                <i className="bi bi-cloud-arrow-up upload-icon"></i>
                                <div>Upload ảnh</div>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                    <p className="mt-2 text-dark small">Dung lượng ảnh tối đa 1MB</p>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên đăng nhập</label>
                            <input
                                type="text"
                                className="form-control"
                                value={infoCustomer.account?.username || ""}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Họ và Tên đệm</label>
                            <input
                                type="text"
                                className="form-control"
                                name="surname"
                                value={infoCustomer.surname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={infoCustomer.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={infoCustomer.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">SĐT</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={infoCustomer.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giới tính</label>
                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    checked={infoCustomer.gender == 1}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="male" className="form-check-label">Nam</label>

                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    checked={infoCustomer.gender == 0}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="female" className="form-check-label">Nữ</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ngày sinh</label>
                            <input
                                type="date"
                                name='birthdate'
                                className="form-control"
                                value={infoCustomer.birthdate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3" onClick={updateInfoCustomer}>
                        Cập nhật thông tin
                    </button>
                </form>
            </div>
        </>
    );
};

export default AccountCustomer;
