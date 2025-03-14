import React, { useState, useEffect } from "react";

const AddAttributeForm = ({ categories, groupAtrrs }) => {
    const [loading, setLoading] = useState(false);
    const [createdAt, setCreatedAt] = useState([]);
    const [updatedAt, setUpdatedAt] = useState([]);
    const [nameAttribute, setNameAttribute] = useState([]);
    const [idGroupAttribute, setIdGroupAttribute] = useState([]);
    const [idCategory, setIdCategory] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [required, setRequired] = useState([]);
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
            nameAttribute,
            dataType,
            required,
            idGroupAttribute,
            idCategory,
            status,
            createdAt,
            updatedAt,
        };
        console.log("data: ",data);

        try {
            const response = await fetch("http://localhost:8081/api/attribute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Form submitted successfully:", result);
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
            <h5 className="mb-4">Thông tin Chi tiết thuộc tính</h5>
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
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên thuộc tính:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={nameAttribute}
                        onChange={(e) => setNameAttribute(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="group" className="form-label">Nhóm thuộc tính:</label>
                    <select
                        id="group"
                        className="form-select"
                        value={idGroupAttribute}
                        onChange={(e) => setIdGroupAttribute(e.target.value)}
                    >
                        <option value="" disabled hidden>Chọn nhóm thuộc tính</option>
                        {groupAtrrs.map((item, index) => (
                            <option key={item.id} value={item.id}>{item.nameAttributeGroup}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Danh mục thuộc tính:</label>
                    <select
                        id="category"
                        className="form-select"
                        value={idCategory}
                        onChange={(e) => setIdCategory(e.target.value)}
                    >
                        <option value="" disabled hidden>Chọn danh mục</option>
                        {categories.map((item, index) => (
                            <option key={item.id} value={item.id}>{item.nameCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="data-type" className="form-label">Kiểu dữ liệu:</label>
                    <select
                        id="data-type"
                        className="form-select"
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                    >
                        <option value="" disabled hidden>Chọn kiểu dữ liệu</option>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="required" className="form-label">Bắt buộc nhập:</label>
                    <select
                        id="required"
                        className="form-select"
                        value={required}
                        onChange={(e) => setRequired(e.target.value)}
                    >
                        <option value="" disabled hidden>Chọn bắt buộc</option>
                        <option value="1">Có</option>
                        <option value="0">Không</option>
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

export default AddAttributeForm;
