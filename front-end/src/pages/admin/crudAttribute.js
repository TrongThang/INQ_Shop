import React from "react";
import AttributeForm from "../../component/admin/CRUD_attribute/attributeForm";

function crudAttribute() {
    const data = {
        id: "TT001",
        creator: "Nhân",
        createdDate: "2024-11-15",
        updatedDate: "2024-11-15",
        name: "Độ phân giải",
        group: "technical",
        category: "camera",
        dataType: "select",
        required: "yes",
        status: "Hoạt động",
    };

    return (
        <div className="main-content-inner">
            <div className="my-3">
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <AttributeForm data={data} />
        </div>
    );
}

export default crudAttribute;
