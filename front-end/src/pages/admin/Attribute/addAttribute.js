import React from "react";
import { useState, useEffect } from "react";
import AddAttributeForm from "../../../component/admin/CRUD_attribute/addAttributeForm";

function AddAttribute({ onback}) {
    const [category, setCategory] = useState([]);
    const [groupAttr, setGroupAttr] = useState([]);
        const fetchDataCategory = async () => {
            try {
                // Gửi yêu cầu lấy dữ liệu đến API
                const response = await fetch(`http://localhost:8081/api/category`);
                const result = await response.json();
                setCategory(result.data);
            } catch (err) {
              console.error(err);
            }
        };
        const fetchDataGroupAttr = async () => {
            try {
                // Gửi yêu cầu lấy dữ liệu đến API
                const response = await fetch(`http://localhost:8081/api/attribute/groupAttr`);
                const result = await response.json();
                setGroupAttr(result.data);
            } catch (err) {
              console.error(err);
            }
        };
        useEffect(() => {
            fetchDataCategory();
            fetchDataGroupAttr();
          }, []);
    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <AddAttributeForm categories={category} groupAtrrs={groupAttr} />
        </div>
    );
}

export default AddAttribute;
