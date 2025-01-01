
import React, { useState } from "react";
import Header from "../../component/Shared/headerManage";
import SearchFilter from "../../component/Admin/Mana_customer/searchCustomer";
import CustomerList from "../../component/Admin/Mana_customer/customerList";


const ManaCustomer = () => {
  const [data, setData] = useState([
    {
      id: "KH-01",
      lastName: "Nguyễn",
      firstName: "Anh Quân",
      email: "anhquan@gmail.com",
      phone: "+84123456789",
      username: "anhquan@gmail.com",
      address: "TP.HCM",
      createdDate: "20/11/2023",
      status: "Hoạt động",
    },
    {
      id: "KH-02",
      lastName: "Phan",
      firstName: "Trọng Thắng",
      email: "tthang@gmail.com",
      phone: "+84123456678",
      username: "tthang@gmail.com",
      address: "TP.HCM",
      createdDate: "29/10/2024",
      status: "Hoạt động",
    },
    {
      id: "KH-03",
      lastName: "Trần",
      firstName: "Lê Nhân",
      email: "nlnhan@gmail.com",
      phone: "+84123456678",
      username: "nlnhan@gmail.com",
      address: "TP.HCM",
      createdDate: "19/09/2022",
      status: "Hoạt động",
    },
    {
      id: "KH-04",
      lastName: "Trần",
      firstName: "Văn Tuấn",
      email: "tvtuan@gmail.com",
      phone: "+84123456678",
      username: "tvtuan@gmail.com",
      address: "TP.HCM",
      createdDate: "07/10/2022",
      status: "Hoạt động",
    },
  ]);

  const handleAdd = () => {
    alert("Thêm bài viết!");
  };

  const handleExport = () => {
    alert("Xuất file!");
  };

  return (
    <div className="main-content-inner">
      <div className="container-fluid py-4">
        <Header onAdd={handleAdd} onExport={handleExport} />
        <SearchFilter />
        <CustomerList data={data} />
      </div>
    </div>
  );
};

export default ManaCustomer;
