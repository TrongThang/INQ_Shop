import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import ManageBlogItems from "../../../component/admin/Mana_blog/manageBlogItems";
import HeaderBlog from "../../../component/admin/Mana_blog/headerBlog";

function ManageBlogPage() {
    const [blog, setBlog] = useState([]);
    const [filteredBlog, setFilteredBlog] = useState([]); // Dữ liệu đã lọc
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredBlog);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Blog");
        XLSX.writeFile(workbook, "Blog_data.xlsx");
    };

    const fetchDataBlog = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/blog/admin`);
            const result = await response.json();
            setBlog(result.data || []);
            setFilteredBlog(result.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDataBlog();
    }, []);

    const removeAccents = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const filterBlogs = () => {
        if (!blog || blog.length === 0) {
            setFilteredBlog([]);
            return;
        }

        const normalizedSearchTerm = removeAccents(searchTerm);

        const filtered = blog.filter((blog) => {
            if (!blog || !blog.title || !blog.content) {
                return false;
            }

            const normalizedTitle = removeAccents(blog.title || '');
            // const normalizedContent = removeAccents(blog.content || '');

            const matchesSearchTerm =
                normalizedTitle.includes(normalizedSearchTerm) 
                //|| normalizedContent.includes(normalizedSearchTerm);

            const matchesStatusFilter =
                statusFilter === "all" || (blog.status.toString() === statusFilter);

            return matchesSearchTerm && matchesStatusFilter;
        });

        setFilteredBlog(filtered);
    };

    useEffect(() => {
        filterBlogs();
    }, [searchTerm, statusFilter, blog]);

    const handleFormAddClick = () => {
        navigate(`/admin/blog/add`);
    };

    const handleFormUpdateClick = (id) => {
        navigate(`/admin/blog/update/${id}`);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    return (
        <div className="main-content-inner">
            <div className="container-fluid py-4">
                <HeaderBlog
                    onExport={handleExport}
                    onAdd={handleFormAddClick}
                    onSearchChange={handleSearchChange}
                    onStatusFilterChange={handleStatusFilterChange}
                />
                {filteredBlog.length === 0 ? (
                    <div className="text py-5">
                        <h4>Không có Blog nào</h4>
                    </div>
                ) : (
                    <ManageBlogItems onUpdate={handleFormUpdateClick} blogs={filteredBlog} />
                )}
            </div>
        </div>
    );
}

export default ManageBlogPage;