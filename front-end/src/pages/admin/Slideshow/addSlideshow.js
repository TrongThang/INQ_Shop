import React, { useState, useEffect } from "react";

import AddSlideshowForm from "../../../component/admin/CRUD_slideshow/add_slideshowForm";


function AddSlideshow({onback}) {
  

    const [employee, setEmployee] = useState([]);

    const fetchDataEmployees = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/employee');
            const result = await response.json();
            setEmployee(result.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    useEffect(() => {
        fetchDataEmployees();
    }, []);



    
    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
            <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <AddSlideshowForm employees={employee} />
        </div>
    );
}
export default AddSlideshow;
