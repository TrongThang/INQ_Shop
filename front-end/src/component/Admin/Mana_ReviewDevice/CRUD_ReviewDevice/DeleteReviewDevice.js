import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function DeleteReviewDevice() {
    const { id } = useParams();
    const navigate = useNavigate();
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

        // Hiển thị hộp thoại xác nhận
        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn có chắc muốn xóa đánh giá này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        // Nếu người dùng xác nhận
        if (confirmResult.isConfirmed) {
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
                    await Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã xóa review thành công.',
                        icon: 'success',
                    });
                    navigate('/admin/review-device');
                } else {
                    await Swal.fire({
                        title: 'Lỗi!',
                        text: result.msg || 'Xóa review thất bại.',
                        icon: 'error',
                    });
                }
            } catch (error) {
                console.error("Error deleting review:", error);
                await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra trong quá trình xóa review.',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <div className="main-content-inner">
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xóa Review</h5>
                            <button type="button" className="btn-close" onClick={() => navigate('/admin/review-device')}></button>
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
                                onClick={() => navigate('/admin/review-device')}
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
        </div>
    );
}

export default DeleteReviewDevice;