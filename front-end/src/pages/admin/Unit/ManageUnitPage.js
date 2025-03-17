import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import HeaderUnit from '../../../component/admin/Mana_Unit/headerUnit';
import UnitList from '../../../component/admin/Mana_Unit/UnitList';

const ManageUnitPage = () => {
    const [units, setUnits] = useState([]);
    const [filteredUnits, setFilteredUnits] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchDataUnits = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/unit');
            const result = await response.json();
            setUnits(result.data || []);
            setFilteredUnits(result.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDataUnits();
    }, []);

    const removeAccents = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const filterUnits = () => {
        if (!units || units.length === 0) {
            setFilteredUnits([]);
            return;
        }

        const normalizedSearchTerm = removeAccents(searchTerm);

        const filtered = units.filter((unit) => {
            if (!unit || !unit.name) {
                return false;
            }

            const normalizedName = removeAccents(unit.name || '');

            return normalizedName.includes(normalizedSearchTerm);
        });

        setFilteredUnits(filtered);
    };

    useEffect(() => {
        filterUnits();
    }, [searchTerm, units]);

    const handleFormAddClick = () => {
        navigate('/admin/unit/add');
    };

    const handleFormUpdateClick = (id) => {
        navigate(`/admin/unit/update/${id}`);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn có chắc muốn xóa đơn vị này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8081/api/unit/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    await Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã xóa đơn vị thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    fetchDataUnits(); // Refresh the list of units
                } else {
                    await Swal.fire({
                        title: 'Lỗi!',
                        text: result.msg || 'Đã xóa đơn vị thất bại.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Lỗi trong quá trình xóa:", error);
                await Swal.fire({
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra trong quá trình xóa đơn vị.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <HeaderUnit
                    onAdd={handleFormAddClick}
                    onSearchChange={handleSearchChange}
                />
                <UnitList units={filteredUnits} onEdit={handleFormUpdateClick} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default ManageUnitPage;