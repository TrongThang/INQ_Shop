import RowAddress from "./rowAddress";

export default function ModalAddress({ listAddress, choiceAddress, handleSetChoiceAddress}) {
    return (
        <div
            className="modal fade" id="modalAddress" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Danh sách địa chỉ</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            listAddress.map((addressBook, key) =>
                                <RowAddress
                                    addressBook={addressBook}
                                    choiceAddress={choiceAddress}
                                    handleSetChoiceAddress={handleSetChoiceAddress}
                                />)
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}