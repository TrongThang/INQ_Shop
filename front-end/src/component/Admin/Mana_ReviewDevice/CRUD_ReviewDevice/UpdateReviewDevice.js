import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

function UpdateReviewDevice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ReviewDevice, setReviewDevice] = useState({
        note: "",
        status: "",
        created_at: "",
        updated_at: "",
    });
    const [error, setError] = useState("");

    const fetchDataReview = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/device/reviews_admin/${id}`);
            const result = await response.json();
            if (result.errorCode === 0 && result.data) {
                setReviewDevice(result.data);
            } else {
                console.error("Không tìm thấy review hoặc có lỗi từ API:", result.msg);
            }
        } catch (err) {
            console.error("Error fetching review:", err);
        }
    };

    useEffect(() => {
        fetchDataReview();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewDevice((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra trường note
        if (!ReviewDevice.note.trim()) {
            setError("Vui lòng nhập ghi chú.");
            return;
        }
        if (ReviewDevice.note.length > 500) {
            setError("Ghi chú không được vượt quá 500 ký tự.");
            return;
        }

        // Hiển thị hộp thoại xác nhận chỉnh sửa
        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn có chắc muốn cập nhật thông tin đánh giá này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        // Nếu người dùng xác nhận
        if (confirmResult.isConfirmed) {
            try {
                const updatedReviewDevice = {
                    ...ReviewDevice,
                    updated_at: new Date().toISOString(),
                };

                const response = await fetch(`http://localhost:8081/api/device/reviews_admin/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedReviewDevice),
                });
                const result = await response.json();

                if (response.ok) {
                    // Thông báo thành công (không tự động đóng)
                    await Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã chỉnh sửa thông tin thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    navigate('/admin/review-device');
                } else {
                    // Thông báo lỗi (không tự động đóng)
                    await Swal.fire({
                        title: 'Lỗi!',
                        text: result.msg || 'Đã chỉnh sửa thông tin thất bại.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Error submitting review:", error);
                // Thông báo lỗi (không tự động đóng)
                await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra trong quá trình cập nhật.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={() => navigate('/admin/review-device')}>
                <a href="#">
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Chỉnh sửa chi tiết thông tin Đánh giá Thiết bị</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">Tên khách hàng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customer"
                                    value={ReviewDevice.customerReview ? ReviewDevice.customerReview?.surname + " " + ReviewDevice.customerReview?.lastName : "Không có thông tin"}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên thiết bị</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={ReviewDevice.device?.name || "Không có thông tin"}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comment - Đánh giá</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="comment"
                                    value={ReviewDevice.comment}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Rating - Số sao</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rating"
                                    value={ReviewDevice.rating}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày tạo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="created_at"
                                    value={new Date(ReviewDevice.created_at).toLocaleString() || "Không có thông tin"}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày cập nhật</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="updated_at"
                                    value={new Date(ReviewDevice.updated_at).toLocaleString() || "Không có thông tin"}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ghi chú</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    value={ReviewDevice.note}
                                    onChange={handleChange}
                                    required
                                />
                                {error && <div className="text-danger mt-2">{error}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Trạng thái:</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    value={ReviewDevice.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="1">Hiển thị</option>
                                    <option value="0">Ẩn</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-info text-white">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateReviewDevice;