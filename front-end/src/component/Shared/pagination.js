import React, { useState } from "react";
import PropTypes from "prop-types";

const Pagination = ({ itemsPerPage, totalItems, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        handlePageChange(currentPage - 1);
        }
    };

    return (
        <nav className="pagination">
        <button
            className="prev-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
        >
            &laquo; Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
            <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            >
            {index + 1}
            </button>
        ))}
        <button
            className="next-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
        >
            Next &raquo;
        </button>
        </nav>
    );
};

Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
