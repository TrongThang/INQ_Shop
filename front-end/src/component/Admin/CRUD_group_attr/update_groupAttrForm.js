import React, { useState, useEffect } from "react";

const UpdateGroupAttrForm = ({ groupAttr, onSubmit }) => {
    const [loading, setLoading] = useState(false);

    const [nameAttributeGroup, setNameAttributeGroup] = useState(groupAttr.nameAttributeGroup || "");
    const [status, setStatus] = useState(groupAttr.status || 1);

    useEffect(() => {
        if (groupAttr) {
          
            setNameAttributeGroup(groupAttr.nameAttributeGroup );
            setStatus(groupAttr.status);
        }
        setLoading(false);
    }, [groupAttr]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {
          
            nameAttributeGroup,
            status,
        };
        try {
            await onSubmit(formData);
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

export default UpdateGroupAttrForm;