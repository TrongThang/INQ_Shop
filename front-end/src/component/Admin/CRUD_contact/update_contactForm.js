import React, { useState, useEffect } from "react";

const UpdateContactForm = ({ contact, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(contact.id || "");
    const [fullname, setFullname] = useState(contact.fullname || "");
    const [email, setEmail] = useState(contact.email || "");
    const [title, setTitle] = useState(contact.title || "");
    const [content, setContent] = useState(contact.content || "");
    const [createdAt, setCreatedAt] = useState(contact.createdAt || "");
    const [updatedAt, setUpdatedAt] = useState(contact.updatedAt || "");
    const [status, setStatus] = useState(contact.status || "1");

    useEffect(() => {
        if (contact) {
            setId(contact.id);
            setFullname(contact.fullname);
            setEmail(contact.email);
            setTitle(contact.title);
            setContent(contact.content);
            setCreatedAt(contact.createdAt);
            setUpdatedAt(contact.updatedAt);
            setStatus(contact.status);
        }
    }, [contact]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = {
            id,
            fullname,
            email,
            title,
            content,
            createdAt,
            updatedAt: new Date().toISOString().split("T")[0], // Cập nhật ngày hiện tại
            status,
        };
        try {
            await onSubmit(data);
        } catch (error) {
            console.error("Error during form submission:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4">Thông tin Chi tiết Liên hệ</h5>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="fullname" className="form-label">Họ và Tên:</label>
                        <input type="text" id="fullname" className="form-control" value={fullname} onChange={(e) => setFullname(e.target.value)} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="form-label">Tiêu đề:</label>
                        <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="content" className="form-label">Nội dung:</label>
                        <textarea id="content" className="form-control" rows="4" value={content} onChange={(e) => setContent(e.target.value)} readOnly></textarea>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="created-date" className="form-label">Ngày tạo:</label>
                        <input type="date" id="created-date" className="form-control" value={createdAt} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="updated-date" className="form-label">Ngày cập nhật:</label>
                        <input type="date" id="updated-date" className="form-control" value={updatedAt} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">Trạng thái:</label>
                        <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="1">Đang xử lý</option>
                            <option value="2">Đã giải quyết</option>
                            <option value="0">Đã đóng</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn btn-info text-white px-4" disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateContactForm;