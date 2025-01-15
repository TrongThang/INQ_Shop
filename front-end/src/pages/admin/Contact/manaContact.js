import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ContactTable from "../../../component/admin/Mana_Contact/contactList";
import SearchContact from "../../../component/admin/Mana_Contact/searchContact";
import UpdateContact from "./updateContact";

const ManaContact = () => {
    const [contact, setContact] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedContactId, setSelectedContactId] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State để hiển thị modal xóa
    const [contactToDelete, setContactToDelete] = useState(null); // Lưu thông tin contact cần xóa

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

    // Hàm hiển thị modal xóa và lưu thông tin contact cần xóa
    const handleDeleteClick = (contact) => {
        setContactToDelete(contact); // Lưu thông tin contact cần xóa
        setShowDeleteModal(true); // Hiển thị modal
    };

    // Hàm xác nhận xóa
    const handleDeleteConfirm = async () => {
        if (!contactToDelete) return;

        try {
            const response = await fetch(`http://localhost:8081/api/contact/${contactToDelete.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setToastMessage('Xóa contact thành công.');
                setShowToast(true);
                setContact(prevContacts => prevContacts.filter((item) => item.id !== contactToDelete.id));
            } else {
                const result = await response.json();
                alert(`Error: ${result.message}`);
            }
        } catch (err) {
            console.error("Error deleting contact:", err);
        } finally {
            setShowDeleteModal(false); // Đóng modal
            setContactToDelete(null); // Reset thông tin contact
        }
    };

    // Hàm hủy xóa
    const handleDeleteCancel = () => {
        setShowDeleteModal(false); // Đóng modal
        setContactToDelete(null); // Reset thông tin contact
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const filteredContacts = contact.filter(contact =>
        contact.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {formState === 2 && <UpdateContact onback={handleBackClick} contactId={selectedContactId} />}
            {formState === 0 && (
                <div className="main-content-inner">
                    <div className="container-fluid py-4">
                        <SearchContact contacts={contact} onExport={handleExport} onSearchChange={handleSearchChange} />
                        <ContactTable contacts={filteredContacts} onEdit={handleFormUpdateClick} onDelete={handleDeleteClick} />
                    </div>
                </div>
            )}
            {/* Toast Notification */}
            {showToast && (
                <div className="toast-container position-fixed top-0 end-70 p-3">
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header bg-primary text-white">
                            <strong className="me-auto">Thông báo</strong>
                        </div>
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                    </div>
                </div>
            )}
            {/* Modal xác nhận xóa */}
            {showDeleteModal && contactToDelete && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa</h5>
                                <button type="button" className="btn-close" onClick={handleDeleteCancel} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa contact này không?</p>
                              <div className="overflow-auto" style={{ maxHeight: '200px' }}>
                                <div>
                                    <strong>Họ và tên:</strong> {contactToDelete.fullname}
                                </div>
                                <div>
                                    <strong>Email:</strong> {contactToDelete.email}
                                </div>
                                <div>
                                    <strong>Tiêu đề:</strong> {contactToDelete.title}
                                </div>
                                <div >
                                    <strong>Nội dung:</strong> {contactToDelete.content}
                                </div>
                              </div>  
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleDeleteCancel}>Hủy</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManaContact;