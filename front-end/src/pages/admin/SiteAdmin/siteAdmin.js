import AreaDashboard from "../../../component/admin/Site-admin/Dashboard/areaDashboard";
import AreaInfoWeb from "../../../component/admin/Site-admin/InfoWebsite/areaInfoWeb";
import NavTabInfoWeb from "../../../component/admin/Site-admin/navTabInfoWeb";

export default function SiteAdmin() {
    return (
        <>
            <NavTabInfoWeb />
            <div class="tab-content" id="pills-tabContent">
                <AreaDashboard />
                <AreaInfoWeb />
            </div>
        </>
    )
}