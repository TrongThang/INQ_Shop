import React, { useState, useEffect } from "react";
import UpdateContactForm from "../../../component/admin/CRUD_contact/update_contactForm";

function UpdateContact({ onback, contactId }) {
  
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
                alert("Cập nhật Contact thành công!");
                onback();
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <UpdateContactForm contact={contact} onSubmit={handleSubmit} />
        </div>
    );
}

export default UpdateContact;