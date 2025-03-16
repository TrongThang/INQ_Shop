import axios from "axios";
import { useEffect, useState } from "react";

const PopupAddress = ({ showModal, toggleModal, formData, setFormData, handleInputChange, handleSubmit, customerAddresses, selectedAddress, provincesVietNam }) => {
    // Determine if we are editing an existing address or adding a new one
    const isEditing = selectedAddress != null;
    // Check if the address limit has been reached (only for adding new addresses)
    const isLimitReached = customerAddresses.length >= 5;
    const [districts, setDistricts] = useState([]); 
    const [wards, setWards] = useState([]);
    const [cityPrev, setCityPrev] = useState(formData.city);

    useEffect(() => {
        console.log(selectedAddress);
    }, [showModal])

    useEffect(() => {
        handleProvincesChange();
        if (cityPrev != formData.city) {
            setWards([]);
            setCityPrev(formData.city);
        }
    }, [formData.city, formData.district, provincesVietNam])
    
    const handleProvincesChange = () => {        
        //Tìm danh sách quận/huyện theo code Thành phố
        const province = provincesVietNam.find(c => c.code == formData.city);
        console.log('formData - find provinces:', province)

        if (!province) {
            console.error("Không tìm thấy tỉnh/thành phố phù hợp!", formData.city);
            return;
        }
        
        // Lấy danh sách quận/huyện
        const districts = province.districts || [];
        setDistricts(districts);

        // Tìm quận/huyện theo `code`
        const district = districts.find(d => d.code == formData.district);
        
        if (!district) {
            console.error("Không tìm thấy quận/huyện phù hợp!", formData.district);
            return;
        }

        // Lấy danh sách xã/phường
        setWards(district.wards || []);
    };
    
    if (!provincesVietNam) {
        return
    }
    
    return (
        showModal && (
            <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Title changes based on whether we are adding or editing */}
                            <h5 className="modal-title">{isEditing ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</h5>
                            <button type="button" className="btn-close" onClick={toggleModal}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nameReceive" className="form-label">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nameReceive"
                                        value={formData?.nameReceive || ''}
                                        onChange={handleInputChange}
                                        placeholder="Nhập họ và tên người nhận"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={formData.phone || ''}  // Provide default value if undefined
                                        onChange={handleInputChange}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>

                                {/* Thành phố, huyện/quận, xã trên cùng một hàng */}
                                <div className="row">
                                    <div className="col-md-9 mb-3">
                                        <label htmlFor="city">Tỉnh/Thành Phố Trung ương</label>
                                        <select
                                            className="form-select"
                                            id="city"
                                            value={formData.city || ''}  // Provide default value
                                            onChange={(e) => {
                                                handleInputChange(e)
                                                handleProvincesChange()
                                            }}
                                        >
                                            <option value=""> - Chọn Thành Phố - </option>
                                            {provincesVietNam.map((item) => {
                                                return (
                                                    <option value={item.code}>{ item.name }</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="district">TP/Huyện/Quận</label>
                                        <select
                                            className="form-select"
                                            id="district"
                                            value={formData.district || ''}  // Provide default value
                                            onChange={(e) => {
                                                handleInputChange(e)
                                                handleProvincesChange()
                                            }}
                                        >
                                            <option value=""> - Chọn Huyện/Quận - </option>
                                            {districts.map((item) => {
                                                return (
                                                    <option value={item.code}>{ item.name }</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="ward">Xã/Phường</label>
                                        <select
                                            className="form-select"
                                            id="ward"
                                            value={formData.ward || ''}  // Provide default value
                                            onChange={handleInputChange}
                                        >
                                            <option value=""> - Chọn Xã/Phường - </option>
                                            {wards.map((item) => {
                                                return (
                                                    <option value={item.code}>{ item.name }</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                {/* Địa chỉ cụ thể */}
                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label">Địa chỉ cụ thể</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="street"
                                        value={formData.street || ''}  // Provide default value
                                        onChange={handleInputChange}
                                        placeholder="Nhập địa chỉ cụ thể"
                                    />
                                </div>

                                {isEditing || !isLimitReached ? (
                                    <button type="submit" className="btn btn-primary">
                                        {isEditing ? 'Cập nhật' : 'Lưu'}
                                    </button>
                                ) : (
                                    <p className="text-danger">Số lượng địa chỉ tối đa là 5</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default PopupAddress;
