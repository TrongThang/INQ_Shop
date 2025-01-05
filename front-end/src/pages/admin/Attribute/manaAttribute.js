import React, { useState, useEffect } from "react";

import SearchAttribute from "../../../component/admin/Mana_attribute/searchAttribute";
import AttributeList from "../../../component/admin/Mana_attribute/attributeList";
import AddAtribute from "./addAttribute";
import UpdateAtribute from "./updateAttribute";

const ManaAttribute = () => {
    const [attribute, setAttribute] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedAttributeId, setSelectedAttributeId] = useState([]);

    const handleFormAddClick = () => {
        setFormState(1); // Hiển thị form "Thêm"
    };

    const handleFormUpdateClick = (id) => {
        setFormState(2); // Hiển thị form "Cập nhật"
        setSelectedAttributeId(id);
    };

    const handleBackClick = () => {
        setFormState(0); // Quay lại trang chính
    };

    const fetchDataAtrribute = async () => {
        try {
            // Gửi yêu cầu lấy dữ liệu đến API
            const response = await fetch(`http://localhost:8081/api/attribute`);
            const result = await response.json();
            setAttribute(result.data);
        } catch (err) {
          console.error(err);
        }
    };
    useEffect(() => {
        fetchDataAtrribute();
      }, []);
    return (
        <>
            {formState === 1 && <AddAtribute onback={handleBackClick} />} {/* Form Thêm */}
            {formState === 2 && <UpdateAtribute onback={handleBackClick} attributeId={selectedAttributeId}/>} {/* Form Cập nhật */}
            
            {formState === 0 && (
                <div className="main-content-inner">
                    <div className="container-fluid py-4">
                        <SearchAttribute onback={handleFormAddClick} />
                        <AttributeList attributes={attribute} onEdit={handleFormUpdateClick}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManaAttribute;
