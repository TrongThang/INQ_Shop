import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateContactForm from "../../../component/admin/CRUD_contact/update_contactForm";
import Swal from 'sweetalert2';

function UpdateContact() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({});

    const fetchDataContact = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/contact/${id}`);
            const result = await response.json();
            setContact(result.data);
        } catch (err) {
            console.error("Error fetching contact:", err);
        }
    };

    useEffect(() => {
        fetchDataContact();
    }, [id]);

    const handleSubmit = async (data) => {
        // Hiển thị hộp thoại xác nhận
        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn có chắc muốn cập nhật thông tin liên hệ này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        // Nếu người dùng xác nhận
        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8081/api/contact/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (response.ok) {
                    await Swal.fire({
                        title: 'Thành công!',
                        text: 'Cập nhật Contact thành công!',
                        icon: 'success',
                    });
                    navigate('/admin/contacts');
                } else {
                    await Swal.fire({
                        title: 'Lỗi!',
                        text: result.message || 'Có lỗi xảy ra khi cập nhật Contact!',
                        icon: 'error',
                    });
                }
            } catch (error) {
                console.error("Error updating contact:", error);
                await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra khi cập nhật Contact!',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <main>
            <div className="main-content-inner">
                <div className="my-3" onClick={() => navigate('/contacts')}>
                    <a href="/admin/contacts"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
                </div>
                <UpdateContactForm contact={contact} onSubmit={handleSubmit} />
            </div>
        </main>
    );
}

export default UpdateContact;