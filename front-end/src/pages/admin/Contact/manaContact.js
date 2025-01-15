import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import ContactTable from "../../../component/admin/Mana_Contact/contactList";
import SearchContact from "../../../component/admin/Mana_Contact/searchContact";

const ManaContact = () => {
    const [contact, setContact] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const navigate = useNavigate();

    const handleFormUpdateClick = (id) => {
        navigate(`/admin/contacts/update/${id}`);
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
            console.error("Error fetching contacts:", err);
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

    const handleDeleteClick = (contact) => {
        setContactToDelete(contact);
        setShowDeleteModal(true);
    };

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
            setShowDeleteModal(false);
            setContactToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setContactToDelete(null);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const filteredContacts = contact.filter((contact) => {
        const matchesSearchTerm =
            contact.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatusFilter =
            statusFilter === "all" || contact.status.toString() === statusFilter;

        return matchesSearchTerm && matchesStatusFilter;
    });

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <SearchContact
                    onExport={handleExport}
                    contacts={contact}
                    onSearchChange={handleSearchChange}
                    onStatusFilterChange={handleStatusFilterChange}
                />
                <ContactTable
                    contacts={filteredContacts}
                    onEdit={handleFormUpdateClick}
                    onDelete={handleDeleteClick}
                />
            </div>
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
                                    <div>
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
        </div>
    );
};

export default ManaContact;