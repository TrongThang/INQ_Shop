import React, { useState, useEffect } from "react";

import AddGroupAttrForm from "../../../component/admin/CRUD_group_attr/add_groupAttrForm";

function AddGroupAttr({onback}) {
  

     const [GroupAttr, setGroupAttr] = useState([]);

  



    
    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
            <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <AddGroupAttrForm GroupAttrs={GroupAttr} />
        </div>
    );
}
export default AddGroupAttr;
