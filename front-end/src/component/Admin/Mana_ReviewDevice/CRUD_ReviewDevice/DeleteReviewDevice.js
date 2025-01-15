import React, { useState } from "react";

function DeleteReviewDevice({ IdReview, onBack }) {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showPopup, setShowPopup] = useState(true); // Hiển thị popup
    const [note, setNote] = useState(""); // Lưu giá trị note từ popup
    const [error, setError] = useState(""); // Lưu thông báo lỗi

    // Xử lý khi người dùng ấn Xác nhận trong popup
    const handleConfirmDelete = async () => {
        // Kiểm tra validation
        if (!note.trim()) {
            setError("Vui lòng nhập lý do xóa.");
            return;
        }
        if (note.length > 500) {
            setError("Lý do xóa không được vượt quá 500 ký tự.");
            return;
        }

        try {
            // Gửi yêu cầu PUT để cập nhật note và status
            const response = await fetch(`http://localhost:8081/api/device/reviews_admin/${IdReview}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    note: note,
                    status: 0, // Đổi status thành 0
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setToastMessage('Đã xóa review thành công.');
                setShowToast(true);

                // Đóng popup sau khi xóa thành công
                setShowPopup(false);

                // Làm mới trang sau 1 giây
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                console.error("Error deleting review:", result);
                setToastMessage(result.msg || 'Xóa review thất bại.');
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            setToastMessage('Có lỗi xảy ra trong quá trình xóa review.');
            setShowToast(true);
        }
    };

    // Xử lý khi người dùng ấn Hủy trong popup
    const handleCancelDelete = () => {
        setShowPopup(false); // Đóng popup
        setError(""); // Xóa thông báo lỗi
        onBack(); // Quay lại trang trước
    };

    return (
        <div className="main-content-inner">
            {/* Popup nhập note */}
            {showPopup && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xóa Review</h5>
                                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label">Nhập lý do xóa:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={note}
                                    onChange={(e) => {
                                        setNote(e.target.value);
                                        setError(""); // Xóa thông báo lỗi khi người dùng nhập
                                    }}
                                    required
                                />
                                {error && <div className="text-danger mt-2">{error}</div>}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancelDelete}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleConfirmDelete}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast message */}
            {showToast && (
                <div className="toast-container position-fixed top-0 end-70 p-3">
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header bg-primary text-white">
                            <strong className="me-auto">Thông báo</strong>
                        </div>
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteReviewDevice;