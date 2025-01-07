import { useEffect, useState } from "react";
import AreaTabOfDevice from "../../component/user/detailDevice/areaDetailInfo/areaTabOfDevice";
import AreaImage from "../../component/user/detailDevice/Info/areaImage";
import InfoDevice from "../../component/user/detailDevice/Info/infoDevice";
import { useParams } from "react-router-dom";

export default function DetailDevicePage() {
    const [device, setDevice] = useState([]);
    const { slug } = useParams();

    console.log('Slug value:', slug);
    console.log(`Fetching: http://localhost:8081/api/device/detail/${slug}`);

    useEffect(() => {
        console.log('Slug value - useEffect:', slug);
        
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
        
        console.log('Lấy data Detail: ', device);

    }, [slug]);

    
    return (
        <div className="container-fluid faq-section bg-light py-5">
            <div className="container py-5">
                <div class="row col-xl-12 g-5">
                    <AreaImage />
                    <InfoDevice device={device} customerLiked={true} />
                </div>
                <AreaTabOfDevice device={device}/>
            </div>
        </div>
    );
}