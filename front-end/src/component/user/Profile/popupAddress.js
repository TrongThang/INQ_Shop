const PopupAddress = ({ showModal, toggleModal, formData, handleInputChange, handleSubmit, customerAddresses, selectedAddress }) => {
    // Determine if we are editing an existing address or adding a new one
    const isEditing = selectedAddress != null;
    // Check if the address limit has been reached (only for adding new addresses)
    const isLimitReached = customerAddresses.length >= 3;

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
                                    <label htmlFor="name" className="form-label">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={formData?.name || ''}  // Optional chaining
                                        placeholder="Nhập họ và tên"
                                        disabled={isEditing}  // Disable the name field if editing
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
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="city">Thành Phố</label>
                                        <select
                                            className="form-select"
                                            id="city"
                                            value={formData.city || ''}  // Provide default value
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Thành Phố</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                            <option value="Đà Nẵng">Đà Nẵng</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="district">Huyện/Quận</label>
                                        <select
                                            className="form-select"
                                            id="district"
                                            value={formData.district || ''}  // Provide default value
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Huyện/Quận</option>
                                            <option value="Đống Đa">Đống Đa</option>
                                            <option value="Tân Bình">Tân Bình</option>
                                            <option value="Hoàng Mai">Hoàng Mai</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="ward">Xã/Phường</label>
                                        <select
                                            className="form-select"
                                            id="ward"
                                            value={formData.ward || ''}  // Provide default value
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Xã/Phường</option>
                                            <option value="Khương Trầm">Khương Trầm</option>
                                            <option value="Phú Nhuận">Phú Nhuận</option>
                                            <option value="Đống Đa">Đống Đa</option>
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

                                {/* Submit button logic */}
                                {isEditing || !isLimitReached ? (
                                    <button type="submit" className="btn btn-primary">
                                        {isEditing ? 'Cập nhật' : 'Lưu'}
                                    </button>
                                ) : (
                                    <p className="text-danger">Số lượng địa chỉ tối đa là 3</p>
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
