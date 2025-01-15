export default function RowAddress({ addressBook, choiceAddress, handleSetChoiceAddress }) {
    return (
        <div className="d-flex justify-content-between align-items-start border-bottom border-primary pb-3 mb-3">
            <div>
                <p className="mb-1">
                    <strong>{`${addressBook?.customer?.surname} ${addressBook?.customer?.lastName}` || 'Phan Trọng Thắng'}</strong> |
                    <span>(+84) {addressBook?.customer?.phone || '113212323'}</span>
                </p>
                {addressBook?.isDefault && <span className="badge bg-primary">Mặc định</span>}
                <p className="mb-1 w-75">
                    {addressBook?.street}, {addressBook?.ward}, {addressBook?.district}, {addressBook?.city}
                </p>
                {/* Hiển thị badge nếu isDefault là true */}
                
                {addressBook?.id === choiceAddress.id && <span className="badge bg-success">Chọn</span>}
            </div>
            <div className="text-end">
                {/* Nút "Thiết lập mặc định" chỉ kích hoạt khi địa chỉ chưa phải mặc định */}
                <button className="btn btn-outline-success btn-sm mt-3" disabled={addressBook?.id === choiceAddress.id}
                    onClick={() => {
                        // isStatus(addressBook?.id, addressBook?.idCustomer, !addressBook?.isDefault)
                        handleSetChoiceAddress(addressBook)
                    }}
                >
                    <i class="fa-solid fa-check"></i>
                </button>
            </div>
        </div>
    )
}