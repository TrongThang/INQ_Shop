import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ContactTable from "../../../component/admin/Mana_Contact/contactList";
import SearchContact from "../../../component/admin/Mana_Contact/searchContact";
import UpdateContact from "./updateContact";
// import HeaderManage from "../../component/Shared/headerManage";

const ManaContact = () => {

    const [contact, setContact] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedContactId, setSelectedContactId] = useState([]);
    
    const handleFormUpdateClick = (id) => {

        setFormState(2);
        setSelectedContactId(id);
        
        
        };   
    const handleBackClick = () => {
        setFormState(0);    
        }; 
        const handleExport = () => {
          const worksheet = XLSX.utils.json_to_sheet(contact);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Contact");
          XLSX.writeFile(workbook, "contact_data.xlsx");
      };
    const fetchDataContact = async () => {
            try {
             const response = await fetch('http://localhost:8081/api/contact');
                const result = await response.json();
                 setContact(result.data);
             } catch (err) {
                console.error("Error fetching slideshows:", err);
             }
           };
             
          useEffect(() => {
            fetchDataContact();
           }, []);   

    return (
   
      <>
     
        {formState === 2 && <UpdateContact onback={handleBackClick} contactId={selectedContactId}/>} 
        {formState === 0 && (
        <div className="main-content-inner">
          <div className="container-fluid py-4">
            <SearchContact   contacts={contact}  onExport={handleExport}  />
            <ContactTable contacts={contact}  onEdit={handleFormUpdateClick}   />
          </div>
        </div>
        )}
      </>
        
    );
};
export default ManaContact;