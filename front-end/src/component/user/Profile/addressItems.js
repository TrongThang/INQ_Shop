import { Link } from "react-router-dom";

const AddressItems = ({ addressBook, isStatus, onUpdateClick, handleDeleteClick }) => {
    
    return (
        <div className="d-flex justify-content-between align-items-start border-bottom border-primary pb-3 mb-3">
            <div>
                <p className="mb-1">
                    <strong>{addressBook?.nameReceive || ''}</strong> |
                    <span>(+84) {addressBook?.phone || ''}</span>
                </p>
                <p className="mb-1 w-75">
                    {addressBook?.street}, {addressBook?.ward}, {addressBook?.district}, {addressBook?.city}
                </p>
                {/* Hiển thị badge nếu isDefault là true */}
                {addressBook?.isDefault && <span className="badge bg-success">Mặc định</span>}
            </div>
            <div className="text-end">
                <Link to="" className="text-decoration-none me-2" onClick={() => onUpdateClick(addressBook)}>
                    Cập nhật
                </Link>
                <span className="icon-line-right"></span>
                <Link to="" className="text-decoration-none" onClick={() => handleDeleteClick(addressBook?.id, addressBook?.idCustomer)}>
                    Xóa
                </Link>
                <br />
                {/* Nút "Thiết lập mặc định" chỉ kích hoạt khi địa chỉ chưa phải mặc định */}
                <button className="btn btn-outline-danger btn-sm mt-3" disabled={addressBook?.isDefault} 
                onClick={() => isStatus(addressBook?.id, addressBook?.idCustomer, !addressBook?.isDefault)}>
                    Thiết lập mặc định
                </button>
            </div>
        </div>
    );
};

export default AddressItems;
