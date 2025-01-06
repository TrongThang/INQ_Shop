import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import SearchAttribute from "../../../component/admin/Mana_attribute/searchAttribute";
import AttributeList from "../../../component/admin/Mana_attribute/attributeList";
import AddAtribute from "./addAttribute";
import UpdateAtribute from "./updateAttribute";

const ManaAttribute = () => {
    const [attribute, setAttribute] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedAttributeId, setSelectedAttributeId] = useState([]);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(attribute);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attribute");
        XLSX.writeFile(workbook, "attribute_data.xlsx");
      };

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
                        <SearchAttribute onback={handleFormAddClick} onExport={handleExport} attributes={attribute}   />
                        <AttributeList attributes={attribute} onEdit={handleFormUpdateClick} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ManaAttribute;
