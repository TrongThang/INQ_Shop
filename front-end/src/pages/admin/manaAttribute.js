import React, { useState } from "react";
import Header from "../../component/Shared/headerManage";

import SearchAttribute from "../../component/admin/Mana_attribute/searchAttribute";
import AttributeList from "../../component/admin/Mana_attribute/attributeList";

const ManaAttribute = () => {
    const [data, setData] = useState([
        {
            id: "TT001",
            name: "Công suất",
            dataType: "Number",
            required: "Có",
            groupCode: "NTT001",
            categoryCode: "Thông số kĩ thuật",
            creator: "Trần Văn Tuấn",
            createdAt: "20/11/2023",
            updatedAt: "20/11/2023",
            status: "Hoạt động",
        },
        {
            id: "TT002",
            name: "Điện áp",
            dataType: "String",
            required: "Không",
            groupCode: "NTT002",
            categoryCode: "Thông số kĩ thuật",
            creator: "Nguyễn Văn A",
            createdAt: "12/11/2023",
            updatedAt: "13/11/2023",
            status: "Đang cập nhật",
        },
        {
            id: "TT003",
            name: "Màu sắc",
            dataType: "String",
            required: "Có",
            groupCode: "NTT003",
            categoryCode: "Màu sắc sản phẩm",
            creator: "Lê Thị Bích",
            createdAt: "05/12/2023",
            updatedAt: "05/12/2023",
            status: "Hoạt động",
        },
        {
            id: "TT004",
            name: "Kích thước",
            dataType: "Number",
            required: "Có",
            groupCode: "NTT004",
            categoryCode: "Thông số kĩ thuật",
            creator: "Phan Minh T",
            createdAt: "01/12/2023",
            updatedAt: "02/12/2023",
            status: "Ngừng hoạt động",
        },
    ]);

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <Header />
                <SearchAttribute />
                <AttributeList data={data} />
            </div>
        </div>
    );
};

export default ManaAttribute;
