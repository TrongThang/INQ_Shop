import React, { useState, useEffect } from "react";

const UpdateSlideshowForm = ({ employees, slideshow, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [createdAt, setCreatedAt] = useState(slideshow.createdAt || "");
    const [updatedAt, setUpdatedAt] = useState(slideshow.updatedAt || "");
    const [idEmployee, setIdEmployee] = useState(slideshow.idEmployee || "");
    const [textButton, setTextButton] = useState(slideshow.textButton || "");
    const [link, setLink] = useState(slideshow.link || "");
    const [image, setImage] = useState(slideshow.image || "");
    const [status, setStatus] = useState(slideshow.status || 1);

    useEffect(() => {
        if (slideshow) {
            setCreatedAt(slideshow.createdAt);
            setUpdatedAt(slideshow.updatedAt);
            setIdEmployee(slideshow.idEmployee);
            setTextButton(slideshow.textButton);
            setLink(slideshow.link);
            setImage(slideshow.image);
            setStatus(slideshow.status);
        }
        setLoading(false);
    }, [slideshow]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = {
            idEmployee,
            textButton,
            link,
            image,
            createdAt,
            updatedAt: new Date().toISOString().split("T")[0], // Cập nhật ngày hiện tại
            status,
        };
        try {
            await onSubmit(data);
        } catch (error) {
            console.error("Error during form submission:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin Chi tiết Slideshow</h5>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="created-date" className="form-label">Ngày tạo:</label>
                        <input
                            type="date"
                            id="created-date"
                            className="form-control"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="updated-date" className="form-label">Ngày sửa:</label>
                        <input
                            type="date"
                            id="updated-date"
                            className="form-control"
                            value={updatedAt}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="idEmployee" className="form-label">Tên Nhân viên:</label>
                        <select id="idEmployee" className="form-select" value={idEmployee} onChange={(e) => setIdEmployee(e.target.value)}>
                            <option value="" disabled hidden>Chọn NV</option>
                            {employees.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.surname} {item.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="textButton" className="form-label">Nút bấm:</label>
                        <input type="text" id="textButton" className="form-control" value={textButton} onChange={(e) => setTextButton(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">Liên kết:</label>
                        <input type="text" id="link" className="form-control" value={link} onChange={(e) => setLink(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Hình ảnh:</label>
                        <input type="text" id="image" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Trạng thái:</label>
                        <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="1">Hiển thị</option>
                            <option value="0">Ẩn</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn btn-info text-white px-4" disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateSlideshowForm;