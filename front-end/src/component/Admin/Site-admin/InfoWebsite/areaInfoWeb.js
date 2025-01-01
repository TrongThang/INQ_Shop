import HeaderInfoWeb from "../../../Shared/headerManage";
import InfoWebTable from "./InfoWebTable";

export default function AreaInfoWeb() {
    return (
        <div className="tab-pane fade" id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab">
            <div className="container-fluid py-4">
                <HeaderInfoWeb />
                <InfoWebTable />
            </div>
        </div>
    )
}