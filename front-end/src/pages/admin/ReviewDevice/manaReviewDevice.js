import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import SearchInfoWeb from "../../../component/admin/Mana_ReviewDevice/headeReviewDevice"; // Đổi tên import
import ReviewList from "../../../component/admin/Mana_ReviewDevice/ReviewDeviceList";
import UpdateReview from "../../../component/admin/Mana_ReviewDevice/CRUD_ReviewDevice/UpdateReviewDevice";
import DeleteReviewDevice from "../../../component/admin/Mana_ReviewDevice/CRUD_ReviewDevice/DeleteReviewDevice";

const ManaReviewDevice = () => {
    const [ReviewDevice, setReviewDevice] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Hàm loại bỏ dấu tiếng Việt
    const removeAccents = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const handleFormUpdateClick = (id) => {
        setFormState(2);
        setSelectedReviewId(id);
    };

    const handleDeleteClick = (id) => {
        setSelectedReviewId(id);
        setShowDeleteModal(true);
    };

    const handleBackClick = () => {
        setFormState(0);
        setSelectedReviewId(null);
        setShowDeleteModal(false);
    };

    const fetchDataReviews = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/device/reviews_admin');
            const result = await response.json();
            setReviewDevice(result.data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    useEffect(() => {
        fetchDataReviews();
    }, []);

    const filteredReviews = ReviewDevice.filter((item) => {
        const normalizedSearchTerm = removeAccents(searchTerm);
        const fullName = `${item.customerReview.surname} ${item.customerReview.lastName}`;
        const normalizedComment = removeAccents(item.comment);
        const normalizedFullName = removeAccents(fullName);
        const normalizedDeviceName = removeAccents(item.device.name);

        const matchesSearchTerm =
            normalizedComment.includes(normalizedSearchTerm) ||
            normalizedFullName.includes(normalizedSearchTerm) ||
            normalizedDeviceName.includes(normalizedSearchTerm);

        const matchesStatusFilter =
            statusFilter === "all" || item.status === (statusFilter === "active" ? 1 : 0);

        return matchesSearchTerm && matchesStatusFilter;
    });

    // Hàm xuất file Excel
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredReviews);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ReviewDevice");
        XLSX.writeFile(workbook, "ReviewDevice_data.xlsx");
    };

    return (
        <>
            {formState === 2 && <UpdateReview onBack={handleBackClick} IdReview={selectedReviewId} />}
            {showDeleteModal && <DeleteReviewDevice IdReview={selectedReviewId} onBack={handleBackClick} />}
            {formState === 0 && (
                <div className="main-content-inner">
                    <div className="container-fluid py-4">
                        {/* Truyền các props cần thiết vào SearchInfoWeb */}
                        <SearchInfoWeb
                            ReviewDevice={ReviewDevice}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            handleExport={handleExport}
                        />
                        <ReviewList
                            ReviewDevice={filteredReviews}
                            onUpdate={handleFormUpdateClick}
                            onDelete={handleDeleteClick}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ManaReviewDevice;