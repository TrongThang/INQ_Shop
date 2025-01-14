import React, { useState, useEffect } from "react";
import UpdateContactForm from "../../../component/admin/CRUD_contact/update_contactForm";

function UpdateContact({ onback, contactId }) {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
  
    const [contact, setContact] = useState({});

    const fetchDataContact = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/contact/${contactId}`);
            const result = await response.json();
            setContact(result.data);
        } catch (err) {
            console.error("Error fetching contact:", err);
        }
    };

 

    useEffect(() => {
        
        fetchDataContact();
    }, [contactId]);

    useEffect(() => {
        if (showToast) {
          const timer = setTimeout(() => {
            setShowToast(false);
          }, 2000); 
    
          return () => clearTimeout(timer); 
        }
      }, [showToast]);
    
    const handleSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:8081/api/contact/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                
                setToastMessage('Cập nhật Contact thành công!');
        setShowToast(true);

              
        setTimeout(() => {
            window.location.reload(); // Làm mới trang
        }, 1000);
       
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    return (
        <main>
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <UpdateContactForm contact={contact} onSubmit={handleSubmit} />
            
        </div>
         
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
    
        </main>

    );
}

export default UpdateContact;