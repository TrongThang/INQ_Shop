import { useState, useEffect } from "react";

function UpdateReviewDevice({ onBack, IdReview }) {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const [ReviewDevice, setReviewDevice] = useState({
        note: "",
        status: "",
        created_at: "", // Thêm trường ngày tạo
        updated_at: "", // Thêm trường ngày cập nhật
    });

    // Fetch bài viết từ API để gán vào form
    const fetchDataReview = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/device/reviews_admin/${IdReview}`);
            const result = await response.json();

            if (result.errorCode === 0 && result.data) {
                console.log("Data from API:", result.data);
                setReviewDevice((prevData) => ({
                    ...prevData,
                    ...result.data, // Cập nhật dữ liệu từ API vào state
                }));
            } else {
                console.error("Không tìm thấy review hoặc có lỗi từ API:", result.msg);
            }
        } catch (err) {
            console.error("Error fetching review:", err);
        }
    };

    // Cập nhật dữ liệu form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewDevice((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gửi dữ liệu bài viết để cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cập nhật trường updated_at với thời gian hiện tại
            const updatedReviewDevice = {
                ...ReviewDevice,
                updated_at: new Date().toISOString(), // Cập nhật ngày cập nhật
            };

            const response = await fetch(`http://localhost:8081/api/device/reviews_admin/${IdReview}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedReviewDevice), // Gửi dữ liệu đã cập nhật
            });
            const result = await response.json();

            if (response.ok) {
                setToastMessage('Đã chỉnh sửa thông tin thành công.');
                setShowToast(true);

                setTimeout(() => {
                    window.location.reload(); // Làm mới trang
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
        fetchDataReview();
    }, []);

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
            {/* Back button */}
            <div className="my-3" onClick={onBack}>
                <a href="#">
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            {/* Main form */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Chỉnh sửa chi tiết thông tin Đánh giá Thiết bị</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            {/* Customer */}
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
                            {/* Device Name */}
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
                            {/* Comment */}
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
                            {/* Rating */}
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
                            {/* Ngày tạo */}
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
                            {/* Ngày cập nhật */}
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
                            {/* Note */}
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
                            {/* Status */}
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

                    {/* Submit button */}
                    <div className="text-right">
                        <button type="submit" className="btn btn-info text-white">
                            Lưu
                        </button>
                    </div>

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
                </form>
            </div>
        </div>
    );
}

export default UpdateReviewDevice;