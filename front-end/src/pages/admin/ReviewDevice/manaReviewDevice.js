import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchInfoWeb from "../../../component/admin/Mana_ReviewDevice/headeReviewDevice";
import ReviewList from "../../../component/admin/Mana_ReviewDevice/ReviewDeviceList";

const ManaReviewDevice = () => {
    const [ReviewDevice, setReviewDevice] = useState([]); // Dữ liệu gốc từ API
    const [filteredReviews, setFilteredReviews] = useState([]); // Dữ liệu đã lọc
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    const handleFormUpdateClick = (id) => {
        navigate(`/admin/review-device/update/${id}`);
    };

    const handleDeleteClick = (id) => {
        navigate(`/admin/review-device/delete/${id}`);
    };

    // Hàm fetch dữ liệu từ API
    const fetchDataReviews = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/device/reviews_admin');
            const result = await response.json();
            setReviewDevice(result.data); // Lưu dữ liệu gốc vào state
            setFilteredReviews(result.data); // Ban đầu, filteredReviews sẽ bằng dữ liệu gốc
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

 

// Hàm loại bỏ dấu tiếng Việt
const removeAccents = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

const filterReviews = () => {
    // Kiểm tra nếu ReviewDevice không tồn tại hoặc là mảng rỗng
    if (!ReviewDevice || ReviewDevice.length === 0) {
        setFilteredReviews([]); // Đặt filteredReviews thành mảng rỗng
        return;
    }

    const normalizedSearchTerm = removeAccents(searchTerm);

    const filtered = ReviewDevice.filter((item) => {
        // Kiểm tra nếu item hoặc các thuộc tính cần thiết không tồn tại
        if (!item || !item.customerReview || !item.device || !item.comment||!item.customerReview.surname||!item.customerReview.lastName) {
            return false; // Bỏ qua item này
        }

        // Tạo fullName từ surname và lastName
        const fullName = `${item.customerReview.surname || ''} ${item.customerReview.lastName || ''}`;
        const normalizedComment = removeAccents(item.comment || '');
        const normalizedFullName = removeAccents(fullName);
        const normalizedDeviceName = removeAccents(item.device.name || '');

        // Kiểm tra từ khóa tìm kiếm
        const matchesSearchTerm =
            normalizedComment.includes(normalizedSearchTerm) ||
            normalizedFullName.includes(normalizedSearchTerm) ||
            normalizedDeviceName.includes(normalizedSearchTerm);

        // Kiểm tra trạng thái
        const matchesStatusFilter =
            statusFilter === "all" || item.status === (statusFilter === "active" ? 1 : 0);

        return matchesSearchTerm && matchesStatusFilter;
    });

    setFilteredReviews(filtered); // Cập nhật dữ liệu đã lọc vào state
};
    // Gọi API lần đầu khi component được mount
    useEffect(() => {
        fetchDataReviews();
    }, []);

    // Lọc dữ liệu mỗi khi searchTerm hoặc statusFilter thay đổi
    useEffect(() => {
        filterReviews();
    }, [searchTerm, statusFilter, ReviewDevice]);

    // Hàm xuất file Excel
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredReviews);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ReviewDevice");
        XLSX.writeFile(workbook, "ReviewDevice_data.xlsx");
    };

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <SearchInfoWeb
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
    );
};

export default ManaReviewDevice;