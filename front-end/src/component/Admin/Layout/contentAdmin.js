import FooterAdmin from "./Footer/footer";
import HeaderAdmin from "./Header/headerAdmin";
import SiteAdmin from "../../../pages/admin/SiteAdmin/siteAdmin";
import ManaSlideshow from "../../../pages/admin/manaSlideshow";
import ManaAttribute from "../../../pages/admin/Attribute/manaAttribute";


export default function ContentAdmin() {
    return (
        <div class="main-content">
            <HeaderAdmin />
            {/* <SiteAdmin /> */}
            {/* <ManaSlideshow /> */}
            <ManaAttribute />
            <FooterAdmin />
        </div>
    )
}