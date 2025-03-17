import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddUnitForm = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/api/unit/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            const result = await response.json();
            if (response.ok) {
                Swal.fire('Thành công!', 'Đã thêm đơn vị thành công.', 'success');
                navigate('/admin/unit');
            } else {
                Swal.fire('Lỗi!', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra trong quá trình thêm đơn vị.', 'error');
        }
    };

    return (
        <div className="main-content-inner">
            <div className="my-3">
                <button className="btn btn-secondary" onClick={() => navigate('/admin/unit')}>
                    <i className="bi bi-arrow-left pe-2"></i>Trở về
                </button>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-4">Thêm đơn vị tính</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Tên đơn vị tính:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </form>
            </div>
        </div>
    );
};

export default AddUnitForm;