import React, { useState } from "react";
import Header from "../../../component/Shared/headerManage";
import SearchFilter from "../../../component/admin/Mana_product/searchProduct";
import Table from "../../../component/admin/Mana_product/productList";
import AddOrEditProduct from "../../../component/admin/Mana_product/addOrEditProduct";
import { ToastContainer } from "react-toastify";

const ManaProduct = () => {
    const [data, setData] = useState([
        {
            id: "SP001",
            productName: "Tivi thông minh",
            image: "https://placehold.co/100x100",
            costPrice: "5.000.000",
            salePrice: "15.000.000",
            stock: 50,
            creator: "Trần Văn Tuấn",
            createdDate: "20/11/2023",
            modifiedDate: "20/11/2023",
            status: "Hoạt động",
        },
        {
            id: "SP002",
            productName: "Đèn thông minh",
            image: "https://placehold.co/100x100",
            costPrice: "5.000.000",
            salePrice: "15.000.000",
            stock: 50,
            creator: "Trần Văn Tuấn",
            createdDate: "29/10/2024",
            modifiedDate: "29/10/2024",
            status: "Ngừng hoạt động",
        },
    ]);

    const handleAdd = () => {
        alert("Thêm sản phẩm!");
    };

    const handleExport = () => {
        alert("Xuất file!");
    };

    return (
        <>
        <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <Header onAdd={handleAdd} onExport={handleExport} />
                <SearchFilter />
                <Table data={data} />
    
            </div>
        </div>
        
        </>
    );
};

export default ManaProduct;