import React, { useState, useEffect } from "react";

import * as XLSX from "xlsx";
import SearchGroupAttr from "../../../component/admin/Mana_groupAttr/searchGroupAttr";
import GroupAttrList from "../../../component/admin/Mana_groupAttr/groupAttrList";

import AddGroupAttr from "./addGroupAttr";
import UpdateGroupAttr from "./updateGroupAttr";

const ManaGroupAttr = () => {

    const [GroupAttr, setGroupAttr] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedGroupAttrId, setSelectedGroupAttrId] = useState([]);

    const handleFormAddClick = () => {
        setFormState(1);
     };

    const handleFormUpdateClick = (id) => {
    setFormState(2);
    setSelectedGroupAttrId(id);
    
    };    

    const handleBackClick = () => {
       setFormState(0);
       
     };
     const handleExport = () => {
      const worksheet = XLSX.utils.json_to_sheet(GroupAttr);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "GroupAttr");
      XLSX.writeFile(workbook, "GroupAttr_data.xlsx");
  };

  const handleDeleteClick = async (id) => {
    try {
        const response = await fetch(`http://localhost:8081/api/attributeGroup/status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 0 })
        });
        const result = await response.json();
        if (response.ok) {
            alert("Xóa nhóm thuộc tính thành công!");
            fetchDataGroupAttr();
        } else {
            alert(`Lỗi: ${result.message}`);
        }
    } catch (error) {
        console.error("Error deleting attributeGroup:", error);
    }
};
 
     const fetchDataGroupAttr = async () => {
           try {
            const response = await fetch('http://localhost:8081/api/attributeGroup');
               const result = await response.json();
                setGroupAttr(result.data);
            } catch (err) {
               console.error("Error fetching attributeGroup:", err);
            }
          };
            
         useEffect(() => {
            fetchDataGroupAttr();
          }, []);  

          
    return (
        
      <>
      {formState === 1 && <AddGroupAttr onback={handleBackClick} />} {/* Form Thêm */}
      {formState === 2 && <UpdateGroupAttr onback={handleBackClick} attributeGroupId={selectedGroupAttrId}/>} {/* Form Sửa */}
      {formState === 0 && (
      <div className="main-content-inner">
        <div className="container-fluid py-4">
          <SearchGroupAttr onback={handleFormAddClick} GroupAttrs={GroupAttr}   />
          <GroupAttrList GroupAttrs={GroupAttr} onEdit={handleFormUpdateClick} onDelete={handleDeleteClick} />
        </div>
      </div>
      )}
    </>
    );
};

export default ManaGroupAttr;
