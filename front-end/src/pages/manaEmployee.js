import React, { useState } from "react";
import Header from "./../component/Mana_customer/header";
import SearchFilter from "./../component/Mana_employee/searchEmployee";
import Table from "./../component/Mana_employee/employeeList";

const App = () => {
    const [data, setData] = useState([
        {
            id: "NV001",
            username: "tuantu4139",
            lastName: "Trần",
            firstName: "Tuấn",
            cccd: "077123456789",
            email: "trantuan@gmail.com",
            phone: "01234567890",
            gender: "Nam",
            birthDate: "07/10/2004",
            createdDate: "10/12/2024",
            status: "Hoạt động",
        },
        {
            id: "NV002",
            username: "nguyenan",
            lastName: "Nguyễn",
            firstName: "Anh Quân",
            cccd: "077987654321",
            email: "nguyenan@gmail.com",
            phone: "09876543210",
            gender: "Nam",
            birthDate: "15/08/1995",
            createdDate: "05/11/2023",
            status: "Ngừng hoạt động",
        },
    ]);

    const handleAdd = () => {
        alert("Thêm nhân viên!");
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

export default App;