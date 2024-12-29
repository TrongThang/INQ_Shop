import { useEffect, useState } from "react";

export default function DeviceCard() {
    const data = {
        image: 'https://placehold.co/200x100',
        name: 'Đèn thông minh',
        sellingPrice: '500,000 VNĐ',
        description: 'Kiểm soát ánh sáng linh hoạt, phù hợp với nhu cầu sử dụng và tiết kiệm năng lượng cho gia đình bạn.',
        starRating: 4.5,
    }
    const [device, setDevice] = useState(data);
    const [loadingDevice, setLoadingDevice] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoadingDevice(true); // Bắt đầu tải dữ liệu
    //             const response = await fetch('https://api.example.com/v1/api/getDeivceById/id');
    //             const result = await response.json();
    //             setDevice(result); // Cập nhật state với dữ liệu API
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoadingDevice(false); // Dừng trạng thái tải
    //         }
    //     };

    //     if (loadingDevice) {
    //         fetchData();
    //     }
    // }, [loadingDevice]); // Chỉ chạy khi `loadingDevice` thay đổi

    // const handleLoadDevice = () => {
    //     setLoadingDevice(true); // Kích hoạt tải dữ liệu
    // };

    return (
        <div className="col-xl-3 col-lg-3 product-items wow fadeInUp" data-wow-delay="0.2s">
            <div className="service-item ">
            <div className="service-img">
                <div className="img-change">
                <img src={device.image} className="img-fluid rounded-top w-100" alt=""/>
                {/* device.image thay vào nội dung của */}
                </div>
            </div>
            <div className="service-content p-4">
                <div className="service-content-inner">
                    <a href="#" className="d-inline-block h4 mb-2 ">{ device.name }</a> 
                    <p className="mb-2 text-primary fw-bold">{ device.sellingPrice }</p>
                    <p className="mb-2">⭐⭐⭐⭐⭐ ({ device.starRating }/5)</p>
                    <p className="mb-4 line-clamp-p">
                        { device.description}
                    </p>
                    <a className="btn btn-primary rounded-pill py-2 px-4" href="#">Chi tiết</a>
                </div>
            </div>
            </div>
        </div>
    )
}  