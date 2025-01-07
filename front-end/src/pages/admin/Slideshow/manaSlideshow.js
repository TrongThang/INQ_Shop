import React, { useState, useEffect } from "react";

import * as XLSX from "xlsx";
import SearchSlideshow from "../../../component/admin/Mana_slideshow/searchSlideshow";
import SlideshowList from "../../../component/admin/Mana_slideshow/slideshowList";
import AddSlideshow from "./addSlideshow";
import UpdateSlideshow from "./updateSlideshow";


const ManaSlideshow = () => {
    

    const [slideshow, setSlideshow] = useState([]);
    const [formState, setFormState] = useState(0);
    const [selectedSlideshowId, setSelectedSlideshowId] = useState([]);

    const handleFormAddClick = () => {
            setFormState(1);
         };

    const handleFormUpdateClick = (id) => {
        setFormState(2);
        setSelectedSlideshowId(id);
        
        };    

    const handleBackClick = () => {
           setFormState(0);
           
         };
         const handleExport = () => {
          const worksheet = XLSX.utils.json_to_sheet(slideshow);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Slideshow");
          XLSX.writeFile(workbook, "slideshow_data.xlsx");
      };
  
         const handleDeleteClick = async (id) => {
          try {
              const response = await fetch(`http://localhost:8081/api/slideshow/status/${id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ status: 0 })
              });
              const result = await response.json();
              if (response.ok) {
                  alert("Xóa slideshow thành công!");
                  fetchDataSlideshow();
              } else {
                  alert(`Lỗi: ${result.message}`);
              }
          } catch (error) {
              console.error("Error deleting slideshow:", error);
          }
      };
  
     const fetchDataSlideshow = async () => {
       try {
        const response = await fetch('http://localhost:8081/api/slideshow');
           const result = await response.json();
            setSlideshow(result.data);
        } catch (err) {
           console.error("Error fetching slideshows:", err);
        }
      };
        
     useEffect(() => {
        fetchDataSlideshow();
      }, []);    
      
      return (

      <>
        {formState === 1 && <AddSlideshow onback={handleBackClick} />} {/* Form Thêm */}
        {formState === 2 && <UpdateSlideshow onback={handleBackClick} slideshowId={selectedSlideshowId}/>} {/* Form Sửa */}
        {formState === 0 && (
        <div className="main-content-inner">
          <div className="container-fluid py-4">
            <SearchSlideshow onback={handleFormAddClick} onExport={handleExport} slideshows={slideshow}   />
            <SlideshowList slideshows={slideshow} onEdit={handleFormUpdateClick} onDelete={handleDeleteClick} />
          </div>
        </div>
        )}
      </>
      );
      };
export default ManaSlideshow;