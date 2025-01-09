import { useEffect, useState } from "react";
import AreaTabOfDevice from "../../component/user/detailDevice/areaDetailInfo/areaTabOfDevice";
import AreaImage from "../../component/user/detailDevice/Info/areaImage";
import InfoDevice from "../../component/user/detailDevice/Info/infoDevice";
import { useParams } from "react-router-dom";

export default function DetailDevicePage() {
    const [device, setDevice] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/device/detail/${slug}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setDevice(result.data);

            } catch (error) {
                console.error('Lỗi:', error);
            }
        };
        
        fetchData();
        console.log('Tên sản phẩm: ', device)

    }, [slug]);

    useEffect(() => {
        document.title = `${device.name} | INQ` 
    }, [])
    return (
        <div className="container-fluid faq-section bg-light py-5">
            <div className="container py-5">
                <div class="row col-xl-12 g-5">
                    <AreaImage />
                    <InfoDevice device={device} />
                </div>
                <AreaTabOfDevice device={device}/>
            </div>
        </div>
    );
}