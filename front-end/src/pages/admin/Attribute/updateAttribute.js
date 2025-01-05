import React from "react";
import { useState, useEffect } from "react";
import UpdateAttributeForm from "../../../component/admin/CRUD_attribute/updateAttributeForm";

function CRUDAttribute({ onback, attributeId}) {
    const [category, setCategory] = useState([]);
    const [groupAttr, setGroupAttr] = useState([]);
    const [attribute, setAttribute] = useState([]);
    const fetchDataAtrribute = async () => {
        try {
            // Gửi yêu cầu lấy dữ liệu đến API
            const response = await fetch(`http://localhost:8081/api/attribute/${attributeId}`);
            const result = await response.json();
            setAttribute(result.data);
        } catch (err) {
          console.error(err);
        }
    };
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
            fetchDataAtrribute();
          }, []);
    return (
        <div className="main-content-inner">
            <div className="my-3" onClick={onback}>
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <UpdateAttributeForm categories={category} groupAtrrs={groupAttr} attribute={attribute}/>
        </div>
    );
}

export default CRUDAttribute;
