import AreaMetricCard from "./areaMetricCard";
import AreaSEO from "./areaSEO";

export default function AreaDashboard() {
    return (
        <div 
            className="tab-pane fade show active" 
            id="pills-dashboard" 
            role="tabpanel" 
            aria-labelledby="pills-dashboard-tab"
        >
            <div className="main-content-inner">
                <div className="main-content-inner">
                    <AreaMetricCard />

                    <AreaSEO />
                </div>
            </div>
        </div>
    )
}