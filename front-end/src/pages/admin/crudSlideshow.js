import React from "react";
import SlideshowForm from "../../component/admin/CRUD_slideshow/slideshowForm";

const CRUDSlideshow = () => {
    const data = {
        id: 1,
        idEmployee: "EMP001",
        textButton: "Mua ngay",
        link: "https://example.com/product",
        image: "https://example.com/image.jpg",
        status: 1,
    };

    return (
        <div className="main-content-inner">
            <div className="my-3">
                <a href="#"><i className="bi bi-arrow-left pe-2"></i>Trở về</a>
            </div>
            <SlideshowForm data={data} />
        </div>
    );
};

export default CRUDSlideshow;
