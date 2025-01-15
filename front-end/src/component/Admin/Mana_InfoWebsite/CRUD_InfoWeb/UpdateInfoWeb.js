import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateInfoWeb() {
    const { keyName } = useParams();
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [InfoWeb, setInfoWeb] = useState({
        VALUE: "",
        STATUS: "",
    });

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/api/setting-web", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(InfoWeb),
            });
            const result = await response.json();
            if (response.ok) {
                setToastMessage('Đã chỉnh sửa thông tin thành công.');
                setShowToast(true);
                setTimeout(() => {
                    navigate("/admin/info-web");
                }, 1000);
            } else {
                console.error("Form submission error:", result);
                setToastMessage('Đã chỉnh sửa thông tin thất bại.');
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error submitting InfoWeb:", error);
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
            <div className="my-3" onClick={() => navigate("/admin/info-web")}>
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

export default UpdateInfoWeb;