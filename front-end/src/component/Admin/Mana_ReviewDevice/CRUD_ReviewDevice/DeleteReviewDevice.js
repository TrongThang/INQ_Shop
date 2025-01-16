import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DeleteReviewDevice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [note, setNote] = useState("");
    const [error, setError] = useState("");

    const handleConfirmDelete = async () => {
        if (!note.trim()) {
            setError("Vui lòng nhập lý do xóa.");
            return;
        }
        if (note.length > 500) {
            setError("Lý do xóa không được vượt quá 500 ký tự.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/device/reviews_admin/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    note: note,
                    status: 0,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setToastMessage('Đã xóa review thành công.');
                setShowToast(true);
                setShowPopup(false);
                setTimeout(() => {
                    navigate('/admin/review-device');
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

    const handleCancelDelete = () => {
        setShowPopup(false);
        setError("");
        navigate('/admin/review-device');
    };

    return (
        <div className="main-content-inner">
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
                                        setError("");
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