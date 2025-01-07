import React, { useState, useEffect } from "react";
import UpdateSlideshowForm from "../../../component/admin/CRUD_slideshow/update_slideshowForm";

function UpdateSlideshow({ onback, slideshowId }) {
    const [employees, setEmployees] = useState([]);
    const [slideshow, setSlideshow] = useState({});

    const fetchDataSlideshow = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/slideshow/${slideshowId}`);
            const result = await response.json();
            setSlideshow(result.data);
        } catch (err) {
            console.error("Error fetching slideshow:", err);
        }
    };

    const fetchDataEmployees = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/employee');
            const result = await response.json();
            setEmployees(result.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    useEffect(() => {
        fetchDataEmployees();
        fetchDataSlideshow();
    }, [slideshowId]);

    const handleSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:8081/api/slideshow/${slideshowId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                alert("Cập nhật slideshow thành công!");
                onback();
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } catch (error) {
            console.error("Error updating slideshow:", error);
        }
    };

    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <UpdateSlideshowForm employees={employees} slideshow={slideshow} onSubmit={handleSubmit} />
        </div>
    );
}

export default UpdateSlideshow;