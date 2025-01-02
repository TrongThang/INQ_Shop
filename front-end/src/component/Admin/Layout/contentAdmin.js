import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import SiteAdmin from "../../../pages/admin/SiteAdmin/siteAdmin";

export default function ContentAdmin() {
    return (
        <div class="main-content">
            <HeaderAdmin />
            <SiteAdmin />
            <FooterAdmin />
        </div>
    )
}