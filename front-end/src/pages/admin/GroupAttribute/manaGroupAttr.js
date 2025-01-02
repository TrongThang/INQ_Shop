import React, { useState } from "react";
import Header from "../../component/Shared/headerManage";
import SearchGroupAttr from "../../component/admin/Mana_groupAttr/searchGroupAttr";
import GroupAttrList from "../../component/admin/Mana_groupAttr/groupAttrList";

const ManaGroupAttr = () => {
    const [data, setData] = useState([
        {
            id: "1",
            name: "Điện năng",
            status: "Hoạt động",
        },
        {
            id: "2",
            name: "Dung tích",
            status: "Ngừng hoạt động",
        },
    ]);

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <Header />
                <SearchGroupAttr />
                <GroupAttrList data={data} />
            </div>
        </div>
    );
};

export default ManaGroupAttr;
