
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import SearchFilter from "../../../component/admin/Mana_customer/searchCustomer";
import CustomerList from "../../../component/admin/Mana_customer/customerList";
import AddCustomer from "./addCustomer";
import UpdateCustomer from "./updateCustomer";

const ManaCustomer = () => {
    const [Customer, setCustomer] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedCustomerId, setSelectedCustomerId] = useState([]);

const handleFormAddClick = () => {
setFormState(1);
};

const handleFormUpdateClick = (id) => {
setFormState(2);
setSelectedCustomerId(id);

};

const handleBackClick = () => {
setFormState(0);

};
  const handleExport = () => {
      const worksheet = XLSX.utils.json_to_sheet(Customer);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customer");
      XLSX.writeFile(workbook, "Customer_data.xlsx");
  };
   const fetchDataCustomer = async () => {
           try {
            const response = await fetch('http://localhost:8081/api/customer');
               const result = await response.json();
                setCustomer(result.data);
            } catch (err) {
               console.error("Error fetching customer:", err);
            }
          };
            
         useEffect(() => {
            fetchDataCustomer();
          }, []); 
  return (
    <>
    {formState === 1 && <AddCustomer onback={handleBackClick} />} {/* Form Thêm */}
    {formState === 2 && <UpdateCustomer onback={handleBackClick} />} {/* Form Sửa */}
    {formState === 0 && (
    <div className="main-content-inner">
      <div className="container-fluid py-4">
        <SearchFilter onback={handleFormAddClick} Customers={Customer}   />
        <CustomerList Customers={Customer}     />
      </div>
    </div>
    )}
  </>
  );
};

export default ManaCustomer;
