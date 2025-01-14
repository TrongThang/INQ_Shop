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
    const [searchTerm, setSearchTerm] = useState("");
    const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

    
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
           useEffect(() => {
            if (showToast) {
              const timer = setTimeout(() => {
                setShowToast(false);
              }, 2000); 
        
              return () => clearTimeout(timer); 
            }
          }, [showToast]);
        

           const handleDeleteContact = async (id) => {
            try {
                const response = await fetch(`http://localhost:8081/api/contact/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                  setToastMessage('Xóa contact thành công.');
        setShowToast(true);

                    setContact(contact.filter((item) => item.id !== id));
                    
                } else {
                    const result = await response.json();
                    alert(`Error: ${result.message}`);
                }
            } catch (err) {
                console.error("Error deleting contact:", err);
            }
        };       
        const handleSearchChange = (value) => {
          setSearchTerm(value);
      };
  
      const filteredContacts = contact.filter(contact =>
          contact.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
    return (
   
      <>
     
        {formState === 2 && <UpdateContact onback={handleBackClick} contactId={selectedContactId}/>} 
        {formState === 0 && (
        <div className="main-content-inner">
          <div className="container-fluid py-4">
            <SearchContact   contacts={contact}  onExport={handleExport} onSearchChange={handleSearchChange}  />
            <ContactTable contacts={filteredContacts}  onEdit={handleFormUpdateClick} onDelete={handleDeleteContact}   />
          </div>
        </div>
        )}
              {/* Toast Notification */}
      {showToast && (
        <div className="toast-container position-fixed top-0 end-70 p-3">
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-primary text-white">
              <strong className="me-auto">Thông báo</strong>
              {/* <button 
                type="button" 
                className="btn-close btn-close-white" 
                aria-label="Close" 
                onClick={() => setShowToast(false)}
              >
              </button> */}
            </div>
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      )}

      </>
        
    );
};
export default ManaContact;