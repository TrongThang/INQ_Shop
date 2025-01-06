import React, { useState, useEffect } from "react";

const AddGroupAttrForm = ({ GroupAttrs }) => {
    const [loading, setLoading] = useState(false);
   
    const [nameAttributeGroup, setNameAttributeGroup] = useState(GroupAttrs.nameAttributeGroup || "");
    const [status, setStatus] = useState(nameAttributeGroup.status || "1");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Bắt đầu loading
        const formData = {
            
            nameAttributeGroup,
            status,
        };
        console.log("formData: ", formData);
        try {
            const response = await fetch("http://localhost:8081/api/attributeGroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                console.log("Form submitted successfully:", result);
                alert("Thêm nhóm thuộc tính thành công!");
            } else {
                console.error("Form submission error:", result);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        } finally {
            setLoading(false); // Dừng loading
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin Chi tiết Nhóm Thuộc tính</h5>
            <form onSubmit={handleSubmit}>
                

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên nhóm thuộc tính:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={nameAttributeGroup}
                        onChange={(e) => setNameAttributeGroup(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Trạng thái:</label>
                    <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                     
                        <option value="1">Hoạt động</option>
                        <option value="0">Ngừng hoạt động</option>
                        
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

export default AddGroupAttrForm;