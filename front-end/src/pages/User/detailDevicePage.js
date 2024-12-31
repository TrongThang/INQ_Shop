import AreaTabOfDevice from "../../component/user/detailDevice/areaDetailInfo/areaTabOfDevice";
import AreaImage from "../../component/user/detailDevice/Info/areaImage";
import InfoDevice from "../../component/user/detailDevice/Info/infoDevice";


export default function DetailDevicePage() {
    return (
        <div className="container-fluid faq-section bg-light py-5">
            <div className="container py-5">
                <div class="row col-xl-12 g-5">
                    <AreaImage />
                    <InfoDevice customerLiked={true} />
                </div>
                <AreaTabOfDevice />
            </div>
        </div>
    );
}