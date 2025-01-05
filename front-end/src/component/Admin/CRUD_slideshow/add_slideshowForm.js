import React, { useState, useEffect } from "react";
import AreaUploadImage from "../../Shared/areaUploadImage";
const AddSlideshowForm = ({ employees }) => {

    const [loading, setLoading] = useState(false);
    const [createdAt, setCreatedAt] = useState([]);
    const [updatedAt, setUpdatedAt] = useState([]);
    const [idEmployee, setIdEmployee] = useState([]);
    const [textButton, setTextButton] = useState([]);
    const [link, setLink] = useState([]);
    const [image, setImage] = useState([]);
    const [status, setStatus] = useState(1);
    useEffect(() => {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        setCreatedAt(formattedDate);
        setUpdatedAt(formattedDate);
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Bắt đầu loading
        const data = {
            idEmployee,
            textButton,
            link,
            image,
            createdAt,
            updatedAt,
            status,
          
        };
        console.log("data: ",data);
        try {
            const response = await fetch("http://localhost:8081/api/slideshow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                console.log("Form submitted successfully:", result);
                alert("Cập nhật slideshow thành công!");
                
            } else {
                console.error("Form submission error:", result);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }finally {
        setLoading(false); // Dừng loading
    }
    };


    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thêm mới Slideshow</h5>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Ngày tạo */}
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
                    {/* Ngày sửa */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="updated-date" className="form-label">Ngày sửa:</label>
                        <input
                            type="date"
                            id="updated-date"
                            className="form-control"
                            value={updatedAt}
                            onChange={(e) => setUpdatedAt(e.target.value)}
                            readOnly
                        />
                    </div>
                
                    {/* ID Employee */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="idEmployee" className="form-label">Tên Nhân viên:</label>
                        <select id="idEmployee" className="form-select" value={idEmployee} onChange={(e) => setIdEmployee(e.target.value)}>
                        <option value="" disabled hidden>Chọn NV</option>
                            {employees.map((item, index) => (
                                <option key={index.id} value={item.id}>
                                    {item.surname} {item.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                 
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
                {/* <AreaUploadImage image={data.image} onChange={onChange} /> */}
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
            </form>
        </div>
    );
};

export default AddSlideshowForm;