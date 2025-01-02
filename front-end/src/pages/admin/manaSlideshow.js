import React, { useState } from "react";
import Header from "../../component/Shared/headerManage";
import SearchFilter from "../../component/admin/Mana_slideshow/searchSlideshow";
import Table from "../../component/admin/Mana_slideshow/slideshowList";


const ManaProduct = () => {
    const [data, setData] = useState([
        {
            idSlideshow: "SS1",
            nameSlideshow: "Giam giá 50% các sản phẩm",
            image: "https://placehold.co/100x100",
            link:"https://www.google.com",
            status: "Hiển thị",
        },
        {
            idSlideshow: "SS2",
            nameSlideshow: "Sự kiện ra mắt sản phẩm mới",
            image: "https://placehold.co/100x100",
            link:"https://www.google.com",
            status: "Ẩn",
        },
    ]);

    const handleAdd = () => {
        alert("Thêm sản phẩm!");
    };

    const handleExport = () => {
        alert("Xuất file!");
    };

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <Header onAdd={handleAdd} onExport={handleExport} />
                <SearchFilter />
                <Table data={data} />
              
                
            </div>
        </div>
    );
};

export default ManaProduct;