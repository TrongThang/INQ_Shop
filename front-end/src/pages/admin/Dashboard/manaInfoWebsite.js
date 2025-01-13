import React, { useState, useEffect } from "react";

import * as XLSX from "xlsx";
import SearchInfoWeb from "../../../component/admin/Mana_InfoWebsite/searchInfoWeb";
import InfoWebList from "../../../component/admin/Mana_InfoWebsite/InfoWebList";

import UpdateInfoWeb from "../../../component/admin/Mana_InfoWebsite/CRUD_InfoWeb/UpdateInfoWeb";
import AddInfoWeb from "../../../component/admin/Mana_InfoWebsite/CRUD_InfoWeb/AddInfoWeb";

const ManaInfoWeb = () => {

    const [InfoWeb, setInfoWeb] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedInfoWeb, setSelectedInfoWeb] = useState([]);

    const handleFormAddClick = () => {
        setFormState(1);
     };

    const handleFormUpdateClick = (KEY_NAME) => {
    setFormState(2);
    setSelectedInfoWeb(KEY_NAME);
    
    };    

    const handleBackClick = () => {
       setFormState(0);
       
     };
     const handleExport = () => {
      const worksheet = XLSX.utils.json_to_sheet(InfoWeb);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "InfoWeb");
      XLSX.writeFile(workbook, "InfoWeb_data.xlsx");
  };

 
  const fetchDataInfoWeb = async () => {
    try {
        // Gọi API để lấy dữ liệu
        const response = await fetch('http://localhost:8081/api/setting-web/admin');
        
        // Kiểm tra phản hồi từ API
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Chuyển đổi phản hồi thành JSON
        const result = await response.json();

        // Kiểm tra xem result.data có tồn tại và là một mảng không
        if (!result.data || !Array.isArray(result.data)) {
            throw new Error("Invalid data format from API");
        }

        // Cập nhật state với dữ liệu từ API
        setInfoWeb(result.data);
    } catch (err) {
        console.error("Error fetching InfoWeb:", err);
    }
};

useEffect(() => {
    fetchDataInfoWeb();
}, []);

          
    return (
        
      <>
      {formState === 1 && <AddInfoWeb onBack={handleBackClick} InfoWebs={InfoWeb} />} {/* Form Thêm */}
      {formState === 2 && <UpdateInfoWeb onBack={handleBackClick} InfoWebKey={selectedInfoWeb}/>}
      {formState === 0 && (
      <div className="main-content-inner">
        <div className="container-fluid py-4">
          <SearchInfoWeb InfoWebs={InfoWeb} onAdd={handleFormAddClick}  />
          <InfoWebList InfoWebs={InfoWeb} onUpdate={handleFormUpdateClick}/>
        </div>
      </div>
      )}
    </>
    );
};

export default ManaInfoWeb;
