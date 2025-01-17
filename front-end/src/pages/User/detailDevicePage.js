import { useEffect, useRef, useState } from "react";
import AreaTabOfDevice from "../../component/user/detailDevice/areaDetailInfo/areaTabOfDevice";
import AreaImage from "../../component/user/detailDevice/Info/areaImage";
import InfoDevice from "../../component/user/detailDevice/Info/infoDevice";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailDevicePage() {
    const [device, setDevice] = useState(null);
    const { slug } = useParams();
    const isViewIncreased = useRef(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/device/detail/${slug}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setDevice(result.data);
            console.log(result.data);

            if (!isViewIncreased.current) {
                await axios.put(`http://localhost:8081/api/device/views/${result.data.idDevice}`);
                isViewIncreased.current = true;
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    useEffect(() => {
        if (device?.name) {
            document.title = `${device.name} | INQ`;
        }
        if (device?.idCategory) {
            // Gọi hàm fetchData liên quan ở đây (nếu cần)
        }
    }, [device]);

    if (!device) {
        return <div>Đang tải thông tin sản phẩm...</div>;
    }

    return (
        <div className="container-fluid faq-section bg-light py-5">
            <div className="container py-5">
                <div className="row col-xl-12 g-5">
                    <AreaImage image={device.image} />
                    <InfoDevice device={device} />
                </div>
                <AreaTabOfDevice device={device} />
            </div>
        </div>
    );
}