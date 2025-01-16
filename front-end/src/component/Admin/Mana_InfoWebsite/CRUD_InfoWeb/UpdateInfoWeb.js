import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

function UpdateInfoWeb() {
    const { keyName } = useParams();
    const navigate = useNavigate();
    const [InfoWeb, setInfoWeb] = useState({
        VALUE: "",
        STATUS: "",
    });
    const [error, setError] = useState(""); // Thêm state để lưu trữ thông báo lỗi

    const fetchDataInfoWeb = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/setting-web/${keyName}`);
            const result = await response.json();
            setInfoWeb(result.data);
        } catch (err) {
            console.error("Error fetching InfoWeb:", err);
        }
    };

    useEffect(() => {
        fetchDataInfoWeb();
    }, [keyName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfoWeb((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setError(""); // Xóa thông báo lỗi khi người dùng thay đổi giá trị
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra trường VALUE
        if (!InfoWeb.VALUE.trim()) {
            setError("Vui lòng nhập giá trị.");
            return;
        }
        if (InfoWeb.VALUE.length > 500) {
            setError("Giá trị không được vượt quá 500 ký tự.");
            return;
        }

        // Hiển thị hộp thoại xác nhận chỉnh sửa
        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn có chắc muốn cập nhật thông tin này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        // Nếu người dùng xác nhận
        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch("http://localhost:8081/api/setting-web", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(InfoWeb),
                });
                const result = await response.json();

                if (response.ok) {
                    // Thông báo thành công
                    await Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã chỉnh sửa thông tin thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    navigate("/admin/dashboard/info-web");
                } else {
                    // Thông báo lỗi
                    await Swal.fire({
                        title: 'Lỗi!',
                        text: result.msg || 'Đã chỉnh sửa thông tin thất bại.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Error submitting InfoWeb:", error);
                // Thông báo lỗi
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
            <div className="my-3" onClick={() => navigate("/admin/dashboard/info-web")}>
                <a href="#">
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </a>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Chỉnh sửa chi tiết thông tin Website</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">KEY_NAME</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="KEY_NAME"
                                    value={InfoWeb.KEY_NAME}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giá trị</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="VALUE"
                                    value={InfoWeb.VALUE}
                                    onChange={handleChange}
                                    required
                                />
                                {error && <div className="text-danger mt-2">{error}</div>} {/* Hiển thị thông báo lỗi */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Trạng thái:</label>
                                <select
                                    className="form-select"
                                    name="STATUS"
                                    value={InfoWeb.STATUS}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="1">Hoạt động</option>
                                    <option value="0">Ngừng hoạt động</option>
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

export default UpdateInfoWeb;