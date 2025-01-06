import React, { useState, useEffect } from "react";
import UpdateGroupAttrForm from "../../../component/admin/CRUD_group_attr/update_groupAttrForm";

function UpdateGroupAttr({ onback, attributeGroupId }) {
    const [groupAttr, setGroupAttr] = useState({});

    const fetchDataGroupAttr = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/attributeGroup/${attributeGroupId}`);
            const result = await response.json();
            setGroupAttr(result.data);
        } catch (err) {
            console.error("Error fetching attributeGroup:", err);
        }
    };

    useEffect(() => {
        fetchDataGroupAttr();
    }, [attributeGroupId]);

    const handleSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:8081/api/attributeGroup/${attributeGroupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                alert("Cập nhật nhóm thuộc tính thành công!");
                onback();
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } catch (error) {
            console.error("Error updating attribute group:", error);
        }
    };

    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <UpdateGroupAttrForm groupAttr={groupAttr} onSubmit={handleSubmit} />
        </div>
    );
}

export default UpdateGroupAttr;