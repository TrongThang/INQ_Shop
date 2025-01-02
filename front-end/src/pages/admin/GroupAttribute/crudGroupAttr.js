import React from "react";
import GroupAttrForm from "../../component/admin/CRUD_group_attr/groupAttrForm";

const CRUDGroupAttr = () => {
    const data = {
        id: "GA001",
        name: "Điện năng",
        status: "Hoạt động",
    };

    return (
        <div className="main-content-inner">
            <div className="my-3">
                <a href="#" ><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <GroupAttrForm data={data} />
        </div>
    );
};

export default CRUDGroupAttr;
