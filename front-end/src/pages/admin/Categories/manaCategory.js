import React, { useState } from "react";
import Header from "../../../component/Shared/headerManage";

import SearchCategory from '../../../component/admin/Mana_category/SearchCategory';
import CategoryList from "../../../component/admin/Mana_category/categoryList";
const ManaCategory = () => {
    const [data, setData] = useState([
        {
            category: "Đèn thông minh",
            image: "https://placehold.co/100x100",
            parentCategory: "Đèn ngoài trời",
            createdDate: "20/11/2023",
            modifiedDate: "20/11/2023",
            status: "Hoạt động",
        },
        {
            category: "Cửa tự động",
            image: "https://placehold.co/100x100",
            parentCategory: "Nhà cửa",
            createdDate: "07/10/2022",
            modifiedDate: "07/10/2022",
            status: "Đang cập nhật",
        },
    ]);
    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <Header/>
                <SearchCategory />
                <CategoryList data={data} />
            </div>
        </div>
    );
};

export default ManaCategory;