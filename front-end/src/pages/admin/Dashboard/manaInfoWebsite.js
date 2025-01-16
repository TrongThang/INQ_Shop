import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchInfoWeb from "../../../component/admin/Mana_InfoWebsite/searchInfoWeb";
import InfoWebList from "../../../component/admin/Mana_InfoWebsite/InfoWebList";

const ManaInfoWeb = () => {
    const [InfoWeb, setInfoWeb] = useState([]); // Dữ liệu gốc từ API
    const [filteredInfoWeb, setFilteredInfoWeb] = useState([]); // Dữ liệu đã lọc
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // Thêm state cho bộ lọc trạng thái
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    // const handleFormAddClick = () => {
    //     navigate("/admin/info-web/add");
    // };

    const handleFormUpdateClick = (KEY_NAME) => {
        navigate(`/admin/dashboard/info-web/update/${KEY_NAME}`);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredInfoWeb);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "InfoWeb");
        XLSX.writeFile(workbook, "InfoWeb_data.xlsx");
    };

    const fetchDataInfoWeb = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/setting-web/admin');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log(result);
            if (!result.data || !Array.isArray(result.data)) {
                throw new Error("Invalid data format from API");
            }
            setInfoWeb(result.data);
            setFilteredInfoWeb(result.data); // Ban đầu, filteredInfoWeb sẽ bằng dữ liệu gốc
        } catch (err) {
            console.error("Error fetching InfoWeb:", err);
        }
    };

    useEffect(() => {
        fetchDataInfoWeb();
    }, []);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);
    const removeAccents = (str) => {
      return str
          .normalize("NFD") // Chuẩn hóa Unicode (tách dấu ra khỏi ký tự)
          .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
          .toLowerCase(); // Chuyển đổi thành chữ thường
  };
  const filterInfoWeb = () => {
    // Kiểm tra nếu InfoWeb không tồn tại hoặc là mảng rỗng
    if (!InfoWeb || InfoWeb.length === 0) {
        setFilteredInfoWeb([]); // Đặt filteredInfoWeb thành mảng rỗng
        return;
    }

    // Chuẩn hóa từ khóa tìm kiếm
    const normalizedSearchTerm = removeAccents(searchTerm);

    const filtered = InfoWeb.filter((item) => {
        // Kiểm tra nếu item không tồn tại hoặc thiếu các thuộc tính cần thiết
        if (!item || !item.KEY_NAME || !item.VALUE) {
            return false; // Bỏ qua item này
        }

        // Chuẩn hóa KEY_NAME và VALUE
        const normalizedKeyName = removeAccents(item.KEY_NAME || '');
        const normalizedValue = removeAccents(item.VALUE || '');

        // So sánh từ khóa với KEY_NAME và VALUE (không phân biệt dấu và hoa thường)
        const matchesSearchTerm =
            normalizedKeyName.includes(normalizedSearchTerm) ||
            normalizedValue.includes(normalizedSearchTerm);

        // Kiểm tra nếu STATUS là null hoặc undefined
        const itemStatus = item.STATUS !== null && item.STATUS !== undefined ? item.STATUS.toString() : "";

        // Lọc theo trạng thái
        const matchesStatusFilter =
            statusFilter === "all" || itemStatus === statusFilter;

        return matchesSearchTerm && matchesStatusFilter;
    });

    setFilteredInfoWeb(filtered); // Cập nhật dữ liệu đã lọc vào state
};
    // Lọc dữ liệu mỗi khi searchTerm hoặc statusFilter thay đổi
    useEffect(() => {
        filterInfoWeb();
    }, [searchTerm, statusFilter, InfoWeb]);

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <SearchInfoWeb
                    onExport={handleExport}
                    // onAdd={handleFormAddClick}
                    onSearchChange={(value) => setSearchTerm(value)}
                    onStatusFilterChange={(value) => setStatusFilter(value)}
                />
                <InfoWebList
                    InfoWebs={filteredInfoWeb}
                    onUpdate={handleFormUpdateClick}
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
        </div>
    );
};

export default ManaInfoWeb;