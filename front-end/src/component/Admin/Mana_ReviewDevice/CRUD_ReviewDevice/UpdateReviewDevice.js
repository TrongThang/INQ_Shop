import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateReviewDevice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [ReviewDevice, setReviewDevice] = useState({
        note: "",
        status: "",
        created_at: "",
        updated_at: "",
    });

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
                setToastMessage('Đã chỉnh sửa thông tin thành công.');
                setShowToast(true);
                setTimeout(() => {
                    navigate('/admin/review-device');
                }, 1000);
            } else {
                console.error("Form submission error:", result);
                setToastMessage('Đã chỉnh sửa thông tin thất bại.');
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setToastMessage('Đã chỉnh sửa thông tin thất bại.');
            setShowToast(true);
        }
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

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
                                <label className="form-label">Customer</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customer"
                                    value={ReviewDevice.customerReview ? ReviewDevice.customerReview.surname + " " + ReviewDevice.customerReview.lastName : "Không có thông tin"}
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
                                <label className="form-label">Comment - Bình luận</label>
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
                </form>
            </div>
        </div>
    );
}

export default UpdateReviewDevice;