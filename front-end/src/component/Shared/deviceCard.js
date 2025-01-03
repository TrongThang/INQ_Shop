import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DeviceCard = ({device}) => {

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8080/api/device/${idDevice}`);
    //             const result = await response.json();
    //             setDevice(result); // Cập nhật state với dữ liệu API
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //         }
    //     };
    //     fetchData();
    // }, [idDevice]); // Chỉ chạy khi `loadingDevice` thay đổi


    return (
        <div className="col-xl-2 col-lg-2 product-items wow fadeInUp me-3" data-wow-delay="0.2s" style={{ padding: "0px"}}>
            <div className="service-item" >
                <div className="service-img">
                <div className="img-change">
                <img src="https://placehold.co/200x100" className="img-fluid rounded-top w-100" alt="Smart Lighting"/>
                {/* device.image thay vào nội dung của */}
                </div>
            </div>
            <div className="service-content p-4">
                <div className="service-content-inner">
                    <Link
                        to="/details"
                        className="line-clamp-title-device h4 mb-2 text-decoration-none"
                        style={{ maxWidth: "200px", maxHeight: "55px", minWidth: "200px", minHeight: "55px" }}
                    >{device.name}</Link>
                    <p className="mb-2 text-primary fw-bold">
                        {Number(device.sellingPrice).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                    <p className="mb-2">
                        {"⭐".repeat(Math.round(device.reviews[0]?.averageRating || 5))}{" "}
                        ({parseFloat(device.reviews[0]?.averageRating || 5).toFixed(1)}/5)
                    </p>
                    <p className="mb-4 line-clamp-p">
                        {device.descriptionNormal}
                    </p>
                    <Link to="/details" className="btn btn-primary rounded-pill py-2 px-4">Chi tiết</Link>
                </div>
            </div>
            </div>
        </div>
    )
}  
export default DeviceCard;