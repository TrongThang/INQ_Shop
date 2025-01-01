import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import ManaProduct from '../../../pages/admin/manaProduct';
import SiteAdmin from "../../../pages/admin/siteAdmin";

export default function ContentAdmin() {
    return (
        <div class="main-content">
            <HeaderAdmin />
            <SiteAdmin />
            <FooterAdmin />
        </div>
    )
}